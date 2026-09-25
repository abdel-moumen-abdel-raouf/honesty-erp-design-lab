import {Component, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';
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

describe('ErpOverlayManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('applies the exact immutable modal defaults', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {label: '  Account  '});

    expect(ref.config).toEqual({
      kind: 'modal',
      position: 'center',
      size: 'md',
      label: 'Account',
      dismissOnEscape: true,
      dismissOnBackdrop: true,
      blur: 'medium',
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
        label: `${position} drawer`,
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
    expect(() => manager.open(TestOverlayContent, {label: '   '})).toThrowError(
      TypeError,
    );
  });

  it('keeps leaving content mounted and resolves once after exit completion', async () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open<TestOverlayContent, undefined, string>(
      TestOverlayContent,
      {
        label: 'Lifecycle',
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
    const first = manager.open(TestOverlayContent, {label: 'First'});
    manager.completeTransition(first.id, 'entering');
    const second = manager.open(TestOverlayContent, {label: 'Second'});
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

  it('honors disabled Escape and backdrop dismissal policies', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {
      label: 'Persistent',
      dismissOnBackdrop: false,
      dismissOnEscape: false,
    });

    manager.dismissFromBackdrop(ref.id);
    manager.dismissTopFromEscape();

    expect(manager.entries()[0]).toMatchObject({
      phase: 'entering',
      ref,
    });
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
    const animations: readonly ErpOverlayAnimation[] = [
      'fade',
      'scale',
      'fade-scale',
      'slide-up',
      'slide-down',
      'slide-start',
      'slide-end',
    ];

    for (let index = 0; index < animations.length; index += 1) {
      const blur = blurs[index % blurs.length];
      const backdropTone = tones[index % tones.length];
      const animation = animations[index];
      const ref = manager.open(TestOverlayContent, {
        label: `Config ${index}`,
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
