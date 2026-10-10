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
  it('repositions against fresh anchor geometry after scroll', () => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      setTimeout(() => callback(0), 0),
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));

    const anchor = document.createElement('button');
    const surface = document.createElement('span');
    Object.assign(surface, {showPopover: vi.fn(), hidePopover: vi.fn()});
    vi.spyOn(surface, 'matches').mockReturnValue(true);

    let anchorTop = 40;
    vi.spyOn(anchor, 'getBoundingClientRect').mockImplementation(() =>
      ({
        left: 100, top: anchorTop, right: 140, bottom: anchorTop + 40,
        width: 40, height: 40, x: 100, y: anchorTop, toJSON: () => ({}),
      }) as DOMRect,
    );
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 80, bottom: 40, width: 80, height: 40,
      x: 0, y: 0, toJSON: () => ({}),
    } as DOMRect);

    const applied: {x: number; y: number}[] = [];
    const controller = new AnchoredOverlayController({
      anchor,
      surface,
      readGeometryInput: () => ({
        preferredPlacement: 'bottom', direction: 'ltr', anchorGap: 4,
        viewportInset: 8, showArrow: true, arrowWidth: 16,
        arrowHeight: 8, arrowSafeInset: 8,
      }),
      applyGeometry: (result) => applied.push({x: result.x, y: result.y}),
    });

    expect(controller.show()).toBe(true);
    vi.runAllTimers();
    expect(applied).toHaveLength(1);
    const firstY = applied[0].y;

    anchorTop = 140;
    window.dispatchEvent(new Event('scroll'));
    vi.runAllTimers();

    expect(applied).toHaveLength(2);
    expect(applied[1].y).not.toBe(firstY);

    controller.destroy();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('prepares consumer-specific geometry before measuring the surface', () => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      setTimeout(() => callback(0), 0),
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
    Object.defineProperty(window, 'visualViewport', {configurable: true, value: null});

    const anchor = document.createElement('button');
    const surface = document.createElement('span');
    Object.assign(surface, {showPopover: vi.fn(), hidePopover: vi.fn()});
    vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({
      left: 100, top: 200, right: 140, bottom: 240,
      width: 40, height: 40, x: 100, y: 200, toJSON: () => ({}),
    } as DOMRect);
    vi.spyOn(surface, 'getBoundingClientRect').mockImplementation(() => ({
      left: 0, top: 0, right: 80,
      bottom: Number.parseFloat(surface.style.maxBlockSize),
      width: 80, height: Number.parseFloat(surface.style.maxBlockSize),
      x: 0, y: 0,
      toJSON: () => ({}),
    } as DOMRect));
    const applyGeometry = vi.fn();
    const controller = new AnchoredOverlayController({
      anchor,
      surface,
      prepareGeometry: () => {
        surface.style.maxBlockSize = '120px';
      },
      readGeometryInput: () => ({
        preferredPlacement: 'bottom', direction: 'ltr', anchorGap: 0,
        viewportInset: 0, showArrow: false, arrowWidth: 0,
        arrowHeight: 0, arrowSafeInset: 0,
      }),
      applyGeometry,
    });

    expect(controller.show()).toBe(true);
    vi.runAllTimers();

    expect(surface.style.maxBlockSize).toBe('120px');
    expect(applyGeometry).toHaveBeenCalledOnce();

    controller.destroy();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('allows a consumer to position from an untransformed layout measurement', () => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      setTimeout(() => callback(0), 0),
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
    Object.defineProperty(window, 'visualViewport', {configurable: true, value: null});

    const anchor = document.createElement('button');
    const surface = document.createElement('span');
    Object.assign(surface, {showPopover: vi.fn(), hidePopover: vi.fn()});
    vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({
      left: 100, top: 100, right: 340, bottom: 138,
      width: 240, height: 38, x: 100, y: 100, toJSON: () => ({}),
    } as DOMRect);
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 232.8, bottom: 145.5,
      width: 232.8, height: 145.5, x: 0, y: 0, toJSON: () => ({}),
    } as DOMRect);
    const applyGeometry = vi.fn();
    const controller = new AnchoredOverlayController({
      anchor,
      surface,
      measureSurface: () => ({width: 240, height: 150}),
      readGeometryInput: () => ({
        preferredPlacement: 'bottom', direction: 'ltr', anchorGap: 8,
        viewportInset: 12, showArrow: false, arrowWidth: 0,
        arrowHeight: 0, arrowSafeInset: 0, allowedPlacements: ['bottom', 'top'],
      }),
      applyGeometry,
    });

    expect(controller.show()).toBe(true);
    vi.runAllTimers();
    expect(applyGeometry).toHaveBeenCalledWith(expect.objectContaining({x: 100, y: 146}));

    controller.destroy();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });


  it('attempts native Popover teardown even when pseudo-state matching is unavailable', () => {
    const anchor = document.createElement('button');
    const surface = document.createElement('span');
    const hidePopover = vi.fn();
    Object.assign(surface, {
      showPopover: vi.fn(),
      hidePopover,
    });
    vi.spyOn(surface, 'matches').mockImplementation(() => {
      throw new DOMException('unsupported pseudo-state');
    });

    const controller = new AnchoredOverlayController({
      anchor,
      surface,
      readGeometryInput: () => ({
        preferredPlacement: 'bottom',
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

    expect(controller.show()).toBe(true);
    controller.hide();

    expect(hidePopover).toHaveBeenCalledOnce();
  });

});
