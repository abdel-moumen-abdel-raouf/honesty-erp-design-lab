import {Component, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayHost} from './overlay-host';
import {ErpOverlayManager} from './overlay-manager';
import {ERP_OVERLAY_REF} from './overlay-tokens';

@Component({
  template: '<button id="first">First</button><button id="last">Last</button>',
})
class TestOverlayContent {
  readonly ref = inject(ERP_OVERLAY_REF);
}

@Component({
  imports: [ErpOverlayHost],
  template: '<button id="background">Background</button><erp-overlay-host />',
})
class TestOverlayShell {}

describe('ErpOverlayHost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [TestOverlayShell]});
  });

  it('renders dialog semantics, locks scroll, and makes shell background inert', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    manager.open(TestOverlayContent, {label: 'Proof dialog'});
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const surface = root.querySelector('[role="dialog"]');
    const background = root.querySelector('#background') as HTMLElement;

    expect(surface?.getAttribute('aria-label')).toBe('Proof dialog');
    expect(surface?.getAttribute('aria-modal')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(background.inert).toBe(true);
    expect(background.getAttribute('aria-hidden')).toBe('true');
  });

  it('traps focus and restores document state after closing', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {label: 'Focus proof'});
    fixture.detectChanges();
    await Promise.resolve();

    const root = fixture.nativeElement as HTMLElement;
    const first = root.querySelector('#first') as HTMLButtonElement;
    const last = root.querySelector('#last') as HTMLButtonElement;
    const background = root.querySelector('#background') as HTMLElement;

    expect(document.activeElement).toBe(first);
    last.focus();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Tab', bubbles: true}),
    );
    expect(document.activeElement).toBe(first);

    ref.close();
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('');
    expect(background.inert).toBe(false);
    expect(background.hasAttribute('aria-hidden')).toBe(false);
  });

  it('uses logical start/end evidence and top-only Escape dismissal', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const first = manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'start',
      label: 'Start drawer',
    });
    const second = manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'end',
      label: 'End drawer',
    });
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(
      root.querySelectorAll('[data-overlay-position="start"]').length,
    ).toBe(1);
    expect(
      root.querySelectorAll('[data-overlay-position="end"]').length,
    ).toBe(1);
    expect(
      root
        .querySelector('[data-overlay-position="start"]')
        ?.hasAttribute('inert'),
    ).toBe(true);
    expect(
      root
        .querySelector('[data-overlay-position="start"] [role="dialog"]')
        ?.getAttribute('aria-hidden'),
    ).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(manager.entries().map((entry) => entry.ref.id)).toEqual([first.id]);
    expect(manager.entries().some((entry) => entry.ref.id === second.id)).toBe(
      false,
    );
  });

  it('restores focus to the captured origin after close', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    fixture.detectChanges();
    const manager = TestBed.inject(ErpOverlayManager);
    const origin = (fixture.nativeElement as HTMLElement).querySelector(
      '#background',
    ) as HTMLButtonElement;
    origin.focus();

    const ref = manager.open(TestOverlayContent, {label: 'Restore proof'});
    fixture.detectChanges();
    await Promise.resolve();
    expect(document.activeElement).not.toBe(origin);

    ref.close();
    fixture.detectChanges();
    await Promise.resolve();
    expect(document.activeElement).toBe(origin);
  });
});
