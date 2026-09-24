import {ErpOverlayConfig} from './overlay-contracts';
import {ErpOverlayRef} from './overlay-ref';

const CONFIG: Readonly<ErpOverlayConfig> = Object.freeze({
  kind: 'modal',
  position: 'center',
  size: 'md',
  label: 'Proof',
  dismissOnEscape: true,
  dismissOnBackdrop: true,
  restoreFocus: true,
  trapFocus: true,
  blocking: true,
  initialFocus: null,
  data: undefined,
});

describe('ErpOverlayRef', () => {
  it('exposes immutable identity/config and resolves close once', async () => {
    const finalize = vi.fn();
    const ref = new ErpOverlayRef<string>('overlay-1', CONFIG, finalize);

    ref.close('saved');
    ref.dismiss('late');

    expect(ref.id).toBe('overlay-1');
    expect(Object.isFrozen(ref.config)).toBe(true);
    expect(finalize).toHaveBeenCalledOnce();
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: 'saved',
    });
  });

  it('preserves a deterministic dismissal reason', async () => {
    const ref = new ErpOverlayRef('overlay-2', CONFIG, () => undefined);
    ref.dismiss('escape');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'escape',
    });
  });
});
