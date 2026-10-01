import {Component, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ERP_MOTION_PRESETS} from '../../foundation/motion/motion-contracts';
import {
  ErpOverlayAnimation,
  ErpOverlayBackdropTone,
  ErpOverlayBlur,
} from './overlay-contracts';
import {ErpOverlayManager} from './overlay-manager';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from './overlay-tokens';

@Component({template: ''})
class TestOverlayContent {
  readonly ref = inject(ERP_OVERLAY_REF);
  readonly data = inject(ERP_OVERLAY_DATA);
}

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

describe('ErpOverlayManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('applies the exact immutable modal defaults', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {frame: frame('  Account  ')});

    expect(ref.config).toEqual({
      kind: 'modal',
      position: 'center',
      size: 'md',
      frame: {
        header: {
          title: 'Account',
          subtitle: 'Supporting text',
          icon: 'info',
          closeLabel: 'إغلاق',
        },
        footer: {
          actions: [
            {id: 'cancel', label: 'Cancel', icon: null, presentation: 'button', role: 'secondary', placement: 'end', disabled: false, loading: false},
            {id: 'confirm', label: 'Confirm', icon: null, presentation: 'button', role: 'primary', placement: 'end', disabled: false, loading: false},
          ],
        },
      },
      legacyCompactMenuLabel: null,
      dismissOnEscape: false,
      dismissOnBackdrop: false,
      blur: 'low',
      backdropTone: 'default',
      enterAnimation: 'fade-scale',
      exitAnimation: 'fade-scale',
      restoreFocus: true,
      trapFocus: true,
      blocking: true,
      initialFocus: null,
      data: undefined,
    });
    expect(Object.isFrozen(ref.config)).toBe(true);
    expect(manager.entries()[0]).toMatchObject({
      phase: 'entering',
      animation: 'fade-scale',
    });
  });

  it('preserves semantic icon-button action presentation through normalization', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const base = frame('Clear presentation');
    const ref = manager.open(TestOverlayContent, {
      frame: {
        ...base,
        footer: {
          actions: [
            {
              id: 'clear',
              label: 'مسح',
              icon: 'delete',
              presentation: 'icon-button',
              role: 'utility',
              placement: 'start',
            },
            ...base.footer.actions,
          ],
        },
      },
    });

    expect(ref.config.frame?.footer.actions[0]).toEqual({
      id: 'clear',
      label: 'مسح',
      icon: 'delete',
      presentation: 'icon-button',
      role: 'utility',
      placement: 'start',
      disabled: false,
      loading: false,
    });
  });

  it('applies exact logical drawer animation defaults', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const cases = [
      ['start', 'slide-start', 'slide-start'],
      ['end', 'slide-end', 'slide-end'],
      ['bottom', 'slide-up', 'slide-down'],
    ] as const;

    for (const [position, enterAnimation, exitAnimation] of cases) {
      const ref = manager.open(TestOverlayContent, {
        kind: 'drawer',
        position,
        frame: frame(`${position} drawer`),
      });

      expect(ref.config.enterAnimation).toBe(enterAnimation);
      expect(ref.config.exitAnimation).toBe(exitAnimation);
      manager.completeTransition(ref.id, 'entering');
      ref.close();
      manager.completeTransition(ref.id, 'leaving');
    }
  });

  it('rejects a missing accessible name', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    expect(() => manager.open(TestOverlayContent, {frame: frame('   ')})).toThrowError(
      TypeError,
    );
  });

  it('rejects missing frame subtitle and semantic icon', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    expect(() => manager.open(TestOverlayContent, {
      frame: {...frame(), header: {...frame().header, subtitle: '   '}},
    })).toThrowError(TypeError);
    expect(() => manager.open(TestOverlayContent, {
      frame: {...frame(), header: {...frame().header, icon: 'missing' as never}},
    })).toThrowError(TypeError);
  });

  it('keeps leaving content mounted and resolves once after exit completion', async () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open<TestOverlayContent, undefined, string>(
      TestOverlayContent,
      {
        frame: frame('Lifecycle'),
      },
    );
    let settled = false;
    void ref.afterClosed.then(() => {
      settled = true;
    });

    expect(manager.entries()[0].phase).toBe('entering');
    manager.completeTransition(ref.id, 'entering');
    expect(manager.entries()[0].phase).toBe('open');

    ref.close('saved');
    ref.dismiss('late');

    expect(manager.entries()).toHaveLength(1);
    expect(manager.entries()[0]).toMatchObject({
      phase: 'leaving',
      animation: 'fade-scale',
    });
    await Promise.resolve();
    expect(settled).toBe(false);

    manager.completeTransition(ref.id, 'leaving');
    expect(manager.entries()).toEqual([]);
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: 'saved',
    });
  });

  it('keeps a stack and dismisses only its top entry without replaying the underlying entry', async () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const first = manager.open(TestOverlayContent, {
      frame: frame('First'),
      dismissOnEscape: true,
    });
    manager.completeTransition(first.id, 'entering');
    const second = manager.open(TestOverlayContent, {
      frame: frame('Second'),
      dismissOnBackdrop: true,
    });
    manager.completeTransition(second.id, 'entering');

    manager.dismissFromBackdrop(first.id);
    expect(manager.entries().map((entry) => entry.ref.id)).toEqual([
      first.id,
      second.id,
    ]);

    manager.dismissFromBackdrop(second.id);
    expect(manager.entries().at(-1)?.phase).toBe('leaving');
    manager.completeTransition(second.id, 'leaving');
    expect(manager.entries()).toHaveLength(1);
    expect(manager.entries()[0]).toMatchObject({
      phase: 'open',
      animation: 'fade-scale',
    });
    await expect(second.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'backdrop',
    });

    manager.dismissTopFromEscape();
    expect(manager.entries()[0].phase).toBe('leaving');
    manager.completeTransition(first.id, 'leaving');
    await expect(first.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'escape',
    });
  });

  it('ignores dismissal by default and enables backdrop and Escape independently', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {frame: frame('Persistent')});

    manager.dismissFromBackdrop(ref.id);
    manager.dismissTopFromEscape();

    expect(manager.entries()[0]).toMatchObject({
      phase: 'entering',
      ref,
    });

    manager.completeTransition(ref.id, 'entering');
    ref.close();
    manager.completeTransition(ref.id, 'leaving');

    const backdrop = manager.open(TestOverlayContent, {
      frame: frame('Backdrop'),
      dismissOnBackdrop: true,
    });
    manager.dismissFromBackdrop(backdrop.id);
    expect(manager.entries().at(-1)?.phase).toBe('leaving');
    manager.completeTransition(backdrop.id, 'leaving');

    const escape = manager.open(TestOverlayContent, {
      frame: frame('Escape'),
      dismissOnEscape: true,
    });
    manager.dismissTopFromEscape();
    expect(manager.entries().at(-1)?.phase).toBe('leaving');
    manager.completeTransition(escape.id, 'leaving');
  });

  it('retains every configured blur, tone, and animation preset per entry', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const blurs: readonly ErpOverlayBlur[] = ['low', 'medium', 'high'];
    const tones: readonly ErpOverlayBackdropTone[] = [
      'default',
      'neutral',
      'primary',
      'secondary',
      'accent',
    ];
    const animations: readonly ErpOverlayAnimation[] = ERP_MOTION_PRESETS;

    for (let index = 0; index < animations.length; index += 1) {
      const blur = blurs[index % blurs.length];
      const backdropTone = tones[index % tones.length];
      const animation = animations[index];
      const ref = manager.open(TestOverlayContent, {
        frame: frame(`Config ${index}`),
        blur,
        backdropTone,
        enterAnimation: animation,
        exitAnimation: animation,
      });

      expect(ref.config).toMatchObject({
        blur,
        backdropTone,
        enterAnimation: animation,
        exitAnimation: animation,
      });
      expect(manager.entries().at(-1)).toMatchObject({
        phase: 'entering',
        animation,
      });
      manager.completeTransition(ref.id, 'entering');
      ref.close();
      expect(manager.entries().at(-1)).toMatchObject({
        phase: 'leaving',
        animation,
      });
      manager.completeTransition(ref.id, 'leaving');
    }
  });
});
