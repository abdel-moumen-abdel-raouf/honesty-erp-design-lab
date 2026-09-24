import {Component, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from './overlay-manager';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from './overlay-tokens';

@Component({template: ''})
class TestOverlayContent {
  readonly ref = inject(ERP_OVERLAY_REF);
  readonly data = inject(ERP_OVERLAY_DATA);
}

describe('ErpOverlayManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('applies the exact defaults and immutable accessible config', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open(TestOverlayContent, {label: '  Account  '});

    expect(ref.config).toEqual({
      kind: 'modal',
      position: 'center',
      size: 'md',
      label: 'Account',
      dismissOnEscape: true,
      dismissOnBackdrop: true,
      restoreFocus: true,
      trapFocus: true,
      blocking: true,
      initialFocus: null,
      data: undefined,
    });
    expect(Object.isFrozen(ref.config)).toBe(true);
    expect(manager.entries().length).toBe(1);
  });

  it('rejects a missing accessible name', () => {
    const manager = TestBed.inject(ErpOverlayManager);
    expect(() => manager.open(TestOverlayContent, {label: '   '})).toThrowError(
      TypeError,
    );
  });

  it('keeps a stack and dismisses only its top entry', async () => {
    const manager = TestBed.inject(ErpOverlayManager);
    const first = manager.open(TestOverlayContent, {label: 'First'});
    const second = manager.open(TestOverlayContent, {label: 'Second'});

    manager.dismissFromBackdrop(first.id);
    expect(manager.entries().length).toBe(2);

    manager.dismissFromBackdrop(second.id);
    expect(manager.entries().map((entry) => entry.ref.id)).toEqual([first.id]);
    await expect(second.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'backdrop',
    });

    manager.dismissTopFromEscape();
    expect(manager.entries()).toEqual([]);
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

    expect(manager.entries().map((entry) => entry.ref.id)).toEqual([ref.id]);
  });
});
