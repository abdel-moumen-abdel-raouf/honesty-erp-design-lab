import {ErpOverlayConfig} from './overlay-contracts';
import {ErpOverlayRef} from './overlay-ref';

const CONFIG: Readonly<ErpOverlayConfig> = Object.freeze({
  kind: 'modal',
  position: 'center',
  size: 'md',
  label: 'Proof',
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

describe('ErpOverlayRef', () => {
  it('exposes immutable identity/config and resolves close once', async () => {
    const requestClose = vi.fn(() => true);
    const ref = new ErpOverlayRef<string>('overlay-1', CONFIG, requestClose);

    ref.close('saved');
    ref.dismiss('late');

    expect(ref.id).toBe('overlay-1');
    expect(Object.isFrozen(ref.config)).toBe(true);
    expect(requestClose).toHaveBeenCalledOnce();
    ref.completeTransition();
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: 'saved',
    });
  });

  it('preserves a deterministic dismissal reason', async () => {
    const ref = new ErpOverlayRef('overlay-2', CONFIG, () => true);
    ref.dismiss('escape');
    ref.completeTransition();
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'escape',
    });
  });

  it('does not settle when the manager rejects a non-top close request', async () => {
    const requestClose = vi.fn(() => false);
    const ref = new ErpOverlayRef('overlay-3', CONFIG, requestClose);
    let settled = false;
    void ref.afterClosed.then(() => {
      settled = true;
    });

    ref.close();
    ref.completeTransition();
    await Promise.resolve();

    expect(requestClose).toHaveBeenCalledOnce();
    expect(settled).toBe(false);
  });
});
