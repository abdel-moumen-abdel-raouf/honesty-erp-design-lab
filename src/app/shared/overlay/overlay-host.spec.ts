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

  it('owns the complete visual viewport and keeps drawer geometry application-wide', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'start',
      label: 'Start drawer',
    });
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'end',
      label: 'End drawer',
    });
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'bottom',
      label: 'Bottom drawer',
    });
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const host = root.querySelector('erp-overlay-host') as HTMLElement;
    const layer = root.querySelector('.erp-ol') as HTMLElement;
    const startSurface = root.querySelector(
      '[data-overlay-position="start"] .erp-os',
    ) as HTMLElement;
    const endSurface = root.querySelector(
      '[data-overlay-position="end"] .erp-os',
    ) as HTMLElement;
    const bottomSurface = root.querySelector(
      '[data-overlay-position="bottom"] .erp-os',
    ) as HTMLElement;
    const hostStyle = getComputedStyle(host);
    const layerStyle = getComputedStyle(layer);

    expect(hostStyle.position).toBe('fixed');
    expect(hostStyle.top).toBe('0px');
    expect(hostStyle.right).toBe('0px');
    expect(hostStyle.bottom).toBe('0px');
    expect(hostStyle.left).toBe('0px');
    expect(hostStyle.inlineSize).toBe('100vw');
    expect(hostStyle.blockSize).toBe('100dvh');
    expect(layerStyle.inlineSize).toBe('100vw');
    expect(layerStyle.blockSize).toBe('100dvh');
    expect(getComputedStyle(startSurface).blockSize).toBe('100dvh');
    expect(getComputedStyle(endSurface).blockSize).toBe('100dvh');
    expect(getComputedStyle(bottomSurface).inlineSize).toBe('100%');
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
    expect(
      root.querySelector('[data-overlay-phase="entering"]'),
    ).toBeTruthy();
    expect(
      root.querySelector('[data-overlay-blur="low"]'),
    ).toBeTruthy();
    expect(
      root.querySelector('[data-overlay-backdrop-tone="default"]'),
    ).toBeTruthy();
    expect(
      root.querySelector('[data-overlay-animation="fade-scale"]'),
    ).toBeTruthy();
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

    manager.completeTransition(ref.id, 'entering');
    ref.close();
    fixture.detectChanges();
    expect(manager.entries()[0].phase).toBe('leaving');
    expect(document.body.style.overflow).toBe('hidden');
    expect(background.inert).toBe(true);

    manager.completeTransition(ref.id, 'leaving');
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
      dismissOnEscape: true,
    });
    const second = manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'end',
      label: 'End drawer',
      dismissOnEscape: true,
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
    expect(manager.entries().at(-1)).toMatchObject({
      ref: second,
      phase: 'leaving',
    });
    manager.completeTransition(second.id, 'leaving');
    expect(manager.entries().map((entry) => entry.ref.id)).toEqual([first.id]);
  });

  it('reverses logical start and end motion between LTR and RTL', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'start',
      label: 'Logical motion',
    });
    fixture.detectChanges();

    const layer = (fixture.nativeElement as HTMLElement).querySelector(
      '.erp-ol',
    ) as HTMLElement;
    const originalDirection = document.documentElement.getAttribute('dir');

    try {
      document.documentElement.setAttribute('dir', 'ltr');
      expect(
        getComputedStyle(layer).getPropertyValue(
          '--honesty-overlay-motion-transform',
        ),
      ).toContain('calc(-1 *');

      document.documentElement.setAttribute('dir', 'rtl');
      expect(
        getComputedStyle(layer).getPropertyValue(
          '--honesty-overlay-motion-transform',
        ),
      ).toBe('translateX(var(--honesty-overlay-motion-slide-distance))');

      manager.completeTransition(manager.entries()[0].ref.id, 'entering');
      manager.entries()[0].ref.close();
      fixture.detectChanges();
      expect(
        getComputedStyle(layer).getPropertyValue(
          '--honesty-overlay-motion-transform',
        ),
      ).toContain('calc(-1 *');
    } finally {
      if (originalDirection === null) {
        document.documentElement.removeAttribute('dir');
      } else {
        document.documentElement.setAttribute('dir', originalDirection);
      }
    }
  });

  it('emits the exact tuned fade and fade-scale durations and transforms', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const fade = manager.open(TestOverlayContent, {
      label: 'Fade',
      enterAnimation: 'fade',
      exitAnimation: 'fade',
    });
    fixture.detectChanges();
    const layer = (fixture.nativeElement as HTMLElement).querySelector(
      '.erp-ol',
    ) as HTMLElement;
    let style = getComputedStyle(layer);

    expect(style.getPropertyValue('--honesty-overlay-enter-duration')).toBe(
      '220ms',
    );
    expect(style.getPropertyValue('--honesty-overlay-exit-duration')).toBe(
      '160ms',
    );
    expect(style.getPropertyValue('--honesty-overlay-motion-transform')).toBe(
      'none',
    );

    manager.completeTransition(fade.id, 'entering');
    fade.close();
    manager.completeTransition(fade.id, 'leaving');

    manager.open(TestOverlayContent, {label: 'Fade scale'});
    fixture.detectChanges();
    const host = (fixture.nativeElement as HTMLElement).querySelector(
      'erp-overlay-host',
    ) as HTMLElement;
    style = getComputedStyle(host);
    expect(style.getPropertyValue('--honesty-overlay-enter-duration')).toBe(
      '240ms',
    );
    expect(style.getPropertyValue('--honesty-overlay-exit-duration')).toBe(
      '180ms',
    );
    expect(style.getPropertyValue('--honesty-overlay-motion-transform')).toBe(
      'scale(0.90)',
    );
    expect(
      style.getPropertyValue('--honesty-overlay-motion-slide-distance'),
    ).toBe('1.5rem');
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

    manager.completeTransition(ref.id, 'entering');
    ref.close();
    fixture.detectChanges();
    await Promise.resolve();
    expect(document.activeElement).not.toBe(origin);

    manager.completeTransition(ref.id, 'leaving');
    fixture.detectChanges();
    await Promise.resolve();
    expect(document.activeElement).toBe(origin);
  });

  it('completes entering and leaving only from matching backdrop animation events', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const host = fixture.debugElement.children.find(
      (child) => child.componentInstance instanceof ErpOverlayHost,
    )?.componentInstance as ErpOverlayHost;
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {label: 'Animation proof'});
    fixture.detectChanges();
    const layer = (fixture.nativeElement as HTMLElement).querySelector(
      '.erp-ol',
    ) as HTMLElement;

    host.handleAnimationEnd(
      {
        target: layer,
        currentTarget: layer,
        animationName: 'overlay-backdrop-enter',
      } as unknown as AnimationEvent,
      ref.id,
    );
    expect(manager.entries()[0].phase).toBe('open');

    ref.close();
    host.handleAnimationEnd(
      {
        target: layer,
        currentTarget: layer,
        animationName: 'overlay-backdrop-exit',
      } as unknown as AnimationEvent,
      ref.id,
    );
    expect(manager.entries()).toEqual([]);
  });

  it('uses a deterministic reduced-motion completion path', async () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({matches: true})),
    });

    try {
      const fixture = TestBed.createComponent(TestOverlayShell);
      const manager = TestBed.inject(ErpOverlayManager);
      const ref = manager.open(TestOverlayContent, {label: 'Reduced motion'});
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();
      expect(manager.entries()[0].phase).toBe('open');

      ref.close();
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();
      expect(manager.entries()).toEqual([]);
    } finally {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: originalMatchMedia,
      });
    }
  });

  it('removes its listener and restores document state when destroyed', () => {
    const addListener = vi.spyOn(document, 'addEventListener');
    const removeListener = vi.spyOn(document, 'removeEventListener');
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    manager.open(TestOverlayContent, {label: 'Destroy cleanup'});
    fixture.detectChanges();

    const background = (fixture.nativeElement as HTMLElement).querySelector(
      '#background',
    ) as HTMLElement;
    const keydownRegistration = addListener.mock.calls.find(
      ([type]) => type === 'keydown',
    );

    expect(keydownRegistration).toBeDefined();
    expect(document.body.style.overflow).toBe('hidden');
    expect(background.inert).toBe(true);

    fixture.destroy();

    expect(removeListener).toHaveBeenCalledWith(
      'keydown',
      keydownRegistration?.[1],
    );
    expect(document.body.style.overflow).toBe('');
    expect(background.inert).toBe(false);
    expect(background.hasAttribute('aria-hidden')).toBe(false);
  });
});
