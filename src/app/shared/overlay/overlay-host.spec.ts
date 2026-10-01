import {Component, inject} from '@angular/core';
import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import {ERP_MOTION_PRESETS} from '../../foundation/motion/motion-contracts';
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

function frame(title = 'Proof') {
  return {
    header: {title, subtitle: 'Supporting text', icon: 'info' as const},
    footer: {
      actions: [
        {id: 'cancel', label: 'Cancel', role: 'secondary' as const, placement: 'end' as const},
        {id: 'confirm', label: 'Confirm', role: 'primary' as const, placement: 'end' as const},
      ],
    },
  };
}

describe('ErpOverlayHost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestOverlayShell],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    });
  });

  it('owns the complete visual viewport and keeps drawer geometry application-wide', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'start',
      frame: frame('Start drawer'),
    });
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'end',
      frame: frame('End drawer'),
    });
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'top',
      frame: frame('Top drawer'),
    });
    manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'bottom',
      frame: frame('Bottom drawer'),
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
    const topSurface = root.querySelector(
      '[data-overlay-position="top"] .erp-os',
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
    expect(getComputedStyle(topSurface).inlineSize).toBe('100%');
    expect(getComputedStyle(bottomSurface).inlineSize).toBe('100%');
  });

  it('renders dialog semantics, locks scroll, and makes shell background inert', () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    manager.open(TestOverlayContent, {frame: frame('Proof dialog')});
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const surface = root.querySelector('[role="dialog"]');
    const background = root.querySelector('#background') as HTMLElement;

    expect(surface?.getAttribute('aria-labelledby')).toContain('-title');
    expect(surface?.getAttribute('aria-describedby')).toContain('-subtitle');
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
      root.querySelector('[data-overlay-animation="flip-x"]'),
    ).toBeTruthy();
  });

  it('traps focus and restores document state after closing', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {frame: frame('Focus proof')});
    fixture.detectChanges();
    const [frameBlock] = await fixture.getDeferBlocks();
    await frameBlock.render(DeferBlockState.Complete);
    fixture.detectChanges();
    await Promise.resolve();

    const root = fixture.nativeElement as HTMLElement;
    const focusable = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[role="dialog"] button'),
    );
    const first = focusable[0];
    const firstBodyControl = root.querySelector('#first') as HTMLButtonElement;
    const last = focusable.at(-1) as HTMLButtonElement;
    const background = root.querySelector('#background') as HTMLElement;

    expect(document.activeElement).toBe(firstBodyControl);
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
      frame: frame('Start drawer'),
      dismissOnEscape: true,
    });
    const second = manager.open(TestOverlayContent, {
      kind: 'drawer',
      position: 'end',
      frame: frame('End drawer'),
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

  it('reverses logical start motion between LTR and RTL through the adapter', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const originalDirection = document.documentElement.getAttribute('dir');

    try {
      for (const [direction, enterClass, exitClass] of [
        ['ltr', 'animate__slideInLeft', 'animate__slideOutLeft'],
        ['rtl', 'animate__slideInRight', 'animate__slideOutRight'],
      ] as const) {
        document.documentElement.setAttribute('dir', direction);
        (fixture.nativeElement as HTMLElement).setAttribute('dir', direction);
        const ref = manager.open(TestOverlayContent, {
          kind: 'drawer',
          position: 'start',
          frame: frame('Logical motion'),
          enterAnimation: 'slide-start',
          exitAnimation: 'slide-start',
        });
        fixture.detectChanges();
        await Promise.resolve();

        const surface = (fixture.nativeElement as HTMLElement).querySelector(
          `[data-overlay-id="${ref.id}"]`,
        ) as HTMLElement;
        expect(surface.classList.contains(enterClass)).toBe(true);
        surface.dispatchEvent(new Event('animationend'));

        ref.close();
        fixture.detectChanges();
        await Promise.resolve();
        expect(surface.classList.contains(exitClass)).toBe(true);
        surface.dispatchEvent(new Event('animationend'));
        fixture.detectChanges();
        expect(manager.entries()).toEqual([]);
      }
    } finally {
      if (originalDirection === null) {
        document.documentElement.removeAttribute('dir');
      } else {
        document.documentElement.setAttribute('dir', originalDirection);
      }
    }
  });

  it('accepts every system motion preset with fixed Overlay durations', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);

    for (const preset of ERP_MOTION_PRESETS) {
      const ref = manager.open(TestOverlayContent, {
        frame: frame(preset),
        enterAnimation: preset,
        exitAnimation: preset,
      });
      fixture.detectChanges();
      await Promise.resolve();

      const surface = (fixture.nativeElement as HTMLElement).querySelector(
        `[data-overlay-id="${ref.id}"]`,
      ) as HTMLElement;
      expect(surface.classList.contains('animate__animated')).toBe(true);
      expect(surface.style.getPropertyValue('--animate-duration')).toBe('360ms');
      surface.dispatchEvent(new Event('animationend'));
      expect(manager.entries()[0].phase).toBe('open');

      ref.close();
      fixture.detectChanges();
      await Promise.resolve();
      expect(surface.classList.contains('animate__animated')).toBe(true);
      expect(surface.style.getPropertyValue('--animate-duration')).toBe('260ms');
      surface.dispatchEvent(new Event('animationend'));
      fixture.detectChanges();
      expect(manager.entries()).toEqual([]);
    }
  });

  it('restores focus to the captured origin after close', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    fixture.detectChanges();
    const manager = TestBed.inject(ErpOverlayManager);
    const origin = (fixture.nativeElement as HTMLElement).querySelector(
      '#background',
    ) as HTMLButtonElement;
    origin.focus();

    const ref = manager.open(TestOverlayContent, {frame: frame('Restore proof')});
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

  it('completes entering and leaving only from surface animation events', async () => {
    const fixture = TestBed.createComponent(TestOverlayShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {frame: frame('Animation proof')});
    fixture.detectChanges();
    await Promise.resolve();
    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-overlay-id="${ref.id}"]`,
    ) as HTMLElement;

    surface.dispatchEvent(new Event('animationend'));
    expect(manager.entries()[0].phase).toBe('open');

    ref.close();
    fixture.detectChanges();
    await Promise.resolve();
    surface.dispatchEvent(new Event('animationend'));
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
      const ref = manager.open(TestOverlayContent, {frame: frame('Reduced motion')});
      fixture.detectChanges();
      await Promise.resolve();
      await Promise.resolve();
      fixture.detectChanges();
      expect(manager.entries()[0].phase).toBe('open');

      ref.close();
      fixture.detectChanges();
      await Promise.resolve();
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
    manager.open(TestOverlayContent, {frame: frame('Destroy cleanup')});
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
