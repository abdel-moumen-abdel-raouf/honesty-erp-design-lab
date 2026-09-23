import {AnchoredOverlayController} from './anchored-overlay-controller';

describe('AnchoredOverlayController', () => {
  it('refuses to open when the native Popover API is unavailable', () => {
    const anchor = document.createElement('button');
    const surface = document.createElement('span');

    Object.defineProperty(surface, 'showPopover', {
      configurable: true,
      value: undefined,
    });

    const controller = new AnchoredOverlayController({
      anchor,
      surface,
      readGeometryInput: () => ({
        preferredPlacement: 'top',
        direction: 'ltr',
        anchorGap: 0,
        viewportInset: 0,
        showArrow: false,
        arrowWidth: 0,
        arrowHeight: 0,
        arrowSafeInset: 0,
      }),
      applyGeometry: () => undefined,
    });

    expect(controller.show()).toBe(false);
  });

  it('returns false without leaking state when native showPopover throws', () => {
    const anchor = document.createElement('button');
    const surface = document.createElement('span');
    Object.assign(surface, {showPopover: vi.fn(() => { throw new DOMException('blocked'); })});
    const controller = new AnchoredOverlayController({
      anchor,
      surface,
      readGeometryInput: () => ({
        preferredPlacement: 'top',
        direction: 'ltr',
        anchorGap: 0,
        viewportInset: 0,
        showArrow: false,
        arrowWidth: 0,
        arrowHeight: 0,
        arrowSafeInset: 0,
      }),
      applyGeometry: () => undefined,
    });

    expect(controller.show()).toBe(false);
    controller.destroy();
  });

  it('uses native showPopover, coalesces positioning, observes both elements, and cleans up', () => {
    vi.useFakeTimers();
    const callbacks: ResizeObserverCallback[] = [];
    const observe = vi.fn(); const disconnect = vi.fn();
    vi.stubGlobal('ResizeObserver', class { constructor(callback: ResizeObserverCallback) { callbacks.push(callback); } observe = observe; disconnect = disconnect; });
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => setTimeout(() => callback(0), 0));
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
    const viewport = {
      offsetLeft: 2, offsetTop: 3, width: 300, height: 200,
      addEventListener: vi.fn(), removeEventListener: vi.fn(),
    };
    Object.defineProperty(window, 'visualViewport', {configurable: true, value: viewport});
    const addWindowListener = vi.spyOn(window, 'addEventListener');
    const removeWindowListener = vi.spyOn(window, 'removeEventListener');
    const polling = vi.spyOn(globalThis, 'setInterval');
    const anchor = document.createElement('button');
    const surface = document.createElement('span');
    Object.assign(surface, {showPopover: vi.fn(), hidePopover: vi.fn()});
    vi.spyOn(surface, 'matches').mockReturnValue(true);
    vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({left: 10, top: 10, right: 30, bottom: 30, width: 20, height: 20, x: 10, y: 10, toJSON: () => ({})});
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({left: 0, top: 0, right: 40, bottom: 20, width: 40, height: 20, x: 0, y: 0, toJSON: () => ({})});
    const applyGeometry = vi.fn();
    const controller = new AnchoredOverlayController({anchor, surface, readGeometryInput: () => ({preferredPlacement: 'bottom', direction: 'ltr', anchorGap: 0, viewportInset: 0, showArrow: false, arrowWidth: 0, arrowHeight: 0, arrowSafeInset: 0}), applyGeometry});
    expect(controller.show()).toBe(true);
    controller.requestPosition();
    controller.requestPosition();
    vi.runAllTimers();
    expect(surface.showPopover).toHaveBeenCalledOnce();
    expect(applyGeometry).toHaveBeenCalledOnce();
    expect(observe).toHaveBeenCalledTimes(2);
    expect(addWindowListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(addWindowListener).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    expect(viewport.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(viewport.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(polling).not.toHaveBeenCalled();
    callbacks[0]([], {} as ResizeObserver);
    vi.runAllTimers();
    expect(applyGeometry).toHaveBeenCalledTimes(2);
    controller.destroy();
    expect(surface.hidePopover).toHaveBeenCalledOnce();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeWindowListener).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    expect(viewport.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(viewport.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    vi.unstubAllGlobals(); vi.useRealTimers();
  });
});
