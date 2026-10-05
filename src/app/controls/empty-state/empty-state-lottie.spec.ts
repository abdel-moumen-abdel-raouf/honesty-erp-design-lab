import {ErrorHandler} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import type {
  AnimationEventName,
  AnimationEvents,
  AnimationItem,
  LottiePlayer,
} from 'lottie-web';
import {
  EMPTY_STATE_LOTTIE_ASSET_LOADER,
  EMPTY_STATE_LOTTIE_LOADER,
  ErpEmptyStateLottie,
  loadEmptyStateLottieAsset,
} from './empty-state-lottie';

type LottieListener = () => void;

describe('ErpEmptyStateLottie', () => {
  let animation: AnimationItem;
  let player: LottiePlayer;
  let assetLoader: ReturnType<typeof vi.fn>;
  let errorHandler: {handleError: ReturnType<typeof vi.fn>};
  let mediaQuery: MediaQueryList;
  let mediaListeners: Set<(event: MediaQueryListEvent) => void>;
  let animationListeners: Map<AnimationEventName, Set<LottieListener>>;

  function createAnimation(isLoaded = false): AnimationItem {
    animationListeners = new Map();

    return {
      addEventListener: vi.fn(
        <T extends AnimationEventName>(
          name: T,
          listener: (event: AnimationEvents[T]) => void,
        ) => {
          const listeners = animationListeners.get(name) ?? new Set();
          listeners.add(listener as LottieListener);
          animationListeners.set(name, listeners);
          return () => listeners.delete(listener as LottieListener);
        },
      ),
      destroy: vi.fn(),
      goToAndPlay: vi.fn(),
      goToAndStop: vi.fn(),
      isLoaded,
      play: vi.fn(),
      setSpeed: vi.fn(),
    } as unknown as AnimationItem;
  }

  beforeEach(() => {
    mediaListeners = new Set();
    mediaQuery = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(
        (_type: string, listener: EventListenerOrEventListenerObject) => {
          mediaListeners.add(
            listener as (event: MediaQueryListEvent) => void,
          );
        },
      ),
      removeEventListener: vi.fn(
        (_type: string, listener: EventListenerOrEventListenerObject) => {
          mediaListeners.delete(
            listener as (event: MediaQueryListEvent) => void,
          );
        },
      ),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    } as unknown as MediaQueryList;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => mediaQuery),
    });

    animation = createAnimation();
    player = {
      loadAnimation: vi.fn(() => animation),
    } as unknown as LottiePlayer;
    assetLoader = vi.fn(async () => ({v: '5.13.0'}));
    errorHandler = {handleError: vi.fn()};

    TestBed.configureTestingModule({
      imports: [ErpEmptyStateLottie],
      providers: [
        {
          provide: EMPTY_STATE_LOTTIE_LOADER,
          useValue: async () => player,
        },
        {
          provide: EMPTY_STATE_LOTTIE_ASSET_LOADER,
          useValue: assetLoader,
        },
        {provide: ErrorHandler, useValue: errorHandler},
      ],
    });
  });

  function create(assetPath = '/lottie/empty-state/no-data.json') {
    const fixture = TestBed.createComponent(ErpEmptyStateLottie);
    fixture.componentRef.setInput('assetPath', assetPath);
    fixture.detectChanges();
    return fixture;
  }

  async function waitForLoad(expectedCount = 1): Promise<void> {
    await vi.waitFor(() => {
      expect(player.loadAnimation).toHaveBeenCalledTimes(expectedCount);
    });
  }

  function emitAnimationEvent(name: AnimationEventName): void {
    for (const listener of animationListeners.get(name) ?? []) {
      listener();
    }
  }

  function appendGeneratedSvg(host: HTMLElement): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    host.querySelector('.empty-state-lottie__canvas')?.append(svg);
    return svg;
  }

  function setReducedMotion(matches: boolean): void {
    Object.defineProperty(mediaQuery, 'matches', {
      configurable: true,
      value: matches,
    });
    const event = {matches} as MediaQueryListEvent;
    for (const listener of mediaListeners) {
      listener(event);
    }
  }

  it('fetches animation data and remains loading until DOMLoaded injects an SVG', async () => {
    const fixture = create();
    await waitForLoad();
    const host = fixture.nativeElement as HTMLElement;

    expect(assetLoader).toHaveBeenCalledWith(
      '/lottie/empty-state/no-data.json',
    );
    expect(player.loadAnimation).toHaveBeenCalledWith(
      expect.objectContaining({
        animationData: {v: '5.13.0'},
        autoplay: false,
        container: host.querySelector('.empty-state-lottie__canvas'),
        loop: true,
        renderer: 'svg',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      }),
    );
    expect(host.getAttribute('data-empty-state-lottie-state')).toBe('loading');
    expect(host.getAttribute('data-empty-state-lottie-playing')).toBe('false');

    const svg = appendGeneratedSvg(host);
    emitAnimationEvent('DOMLoaded');
    fixture.detectChanges();

    expect(host.querySelector('.empty-state-lottie__canvas svg')).toBe(svg);
    expect(host.getAttribute('data-empty-state-lottie-state')).toBe('ready');
    expect(host.getAttribute('data-empty-state-lottie-playing')).toBe('true');
    expect(animation.setSpeed).toHaveBeenLastCalledWith(1);
    expect(animation.play).toHaveBeenCalledOnce();
  });

  it('treats DOMLoaded without generated SVG output as a visible runtime error state', async () => {
    const fixture = create();
    await waitForLoad();

    emitAnimationEvent('DOMLoaded');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.getAttribute('data-empty-state-lottie-state'),
    ).toBe('error');
    expect(animation.destroy).toHaveBeenCalledOnce();
    expect(errorHandler.handleError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Lottie DOMLoaded completed without a generated SVG.',
      }),
    );
  });

  it('destroys the previous animation before loading a changed asset', async () => {
    const firstAnimation = animation;
    const secondAnimation = createAnimation();
    vi.mocked(player.loadAnimation)
      .mockReturnValueOnce(firstAnimation)
      .mockReturnValueOnce(secondAnimation);

    const fixture = create();
    await waitForLoad();

    fixture.componentRef.setInput(
      'assetPath',
      '/lottie/empty-state/error.json',
    );
    fixture.detectChanges();
    await waitForLoad(2);

    expect(firstAnimation.destroy).toHaveBeenCalledOnce();
    expect(assetLoader).toHaveBeenLastCalledWith(
      '/lottie/empty-state/error.json',
    );
  });

  it.each([0.5, 1, 1.5] as const)(
    'applies motion speed %s only after the Lottie DOM is ready',
    async (speed) => {
      const fixture = create();
      fixture.componentRef.setInput('speed', speed);
      fixture.detectChanges();
      await waitForLoad();

      expect(animation.setSpeed).not.toHaveBeenCalled();

      appendGeneratedSvg(fixture.nativeElement);
      emitAnimationEvent('DOMLoaded');
      fixture.detectChanges();

      expect(animation.setSpeed).toHaveBeenLastCalledWith(speed);
    },
  );

  it('shows a generated first frame when animated is false', async () => {
    const fixture = create();
    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();
    await waitForLoad();
    appendGeneratedSvg(fixture.nativeElement);
    emitAnimationEvent('DOMLoaded');
    fixture.detectChanges();

    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
    expect(
      fixture.nativeElement.getAttribute('data-empty-state-lottie-state'),
    ).toBe('static');
    expect(
      fixture.nativeElement.querySelector('.empty-state-lottie__canvas svg'),
    ).not.toBeNull();
  });

  it('shows the generated first frame when illustration motion is none', async () => {
    const fixture = create();
    fixture.componentRef.setInput('motion', 'none');
    fixture.detectChanges();
    await waitForLoad();
    appendGeneratedSvg(fixture.nativeElement);
    emitAnimationEvent('DOMLoaded');
    fixture.detectChanges();

    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
    expect(
      fixture.nativeElement.getAttribute('data-empty-state-lottie-state'),
    ).toBe('static');
  });

  it('replays from the first frame only after runtime output is ready', async () => {
    const fixture = create();
    await waitForLoad();

    fixture.componentInstance.replay();
    expect(animation.goToAndPlay).not.toHaveBeenCalled();

    appendGeneratedSvg(fixture.nativeElement);
    emitAnimationEvent('DOMLoaded');
    fixture.componentInstance.replay();

    expect(animation.goToAndPlay).toHaveBeenCalledWith(0, true);
  });

  it('keeps a generated static frame visible during reduced motion', async () => {
    const fixture = create();
    setReducedMotion(true);
    fixture.detectChanges();
    await waitForLoad();
    appendGeneratedSvg(fixture.nativeElement);
    emitAnimationEvent('DOMLoaded');
    fixture.detectChanges();

    expect(animation.play).not.toHaveBeenCalled();
    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
    expect(
      fixture.nativeElement.getAttribute('data-empty-state-lottie-state'),
    ).toBe('static');
    expect(
      fixture.nativeElement.querySelector('.empty-state-lottie__canvas svg'),
    ).not.toBeNull();
  });

  it('responds to reduced-motion changes after readiness without hiding SVG output', async () => {
    const fixture = create();
    await waitForLoad();
    appendGeneratedSvg(fixture.nativeElement);
    emitAnimationEvent('DOMLoaded');
    fixture.detectChanges();

    setReducedMotion(true);
    fixture.detectChanges();

    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
    expect(
      fixture.nativeElement.querySelector('.empty-state-lottie__canvas svg'),
    ).not.toBeNull();
  });

  it.each(['data_failed', 'error'] as const)(
    'surfaces the %s Lottie event as an error state',
    async (eventName) => {
      const fixture = create();
      await waitForLoad();

      emitAnimationEvent(eventName);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.getAttribute('data-empty-state-lottie-state'),
      ).toBe('error');
      expect(errorHandler.handleError).toHaveBeenCalledOnce();
    },
  );

  it('destroys the active Lottie instance and listeners with the component', async () => {
    const fixture = create();
    await waitForLoad();

    fixture.destroy();

    expect(animation.destroy).toHaveBeenCalledOnce();
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
    expect(animationListeners.get('DOMLoaded')).toHaveLength(0);
    expect(animationListeners.get('data_failed')).toHaveLength(0);
    expect(animationListeners.get('error')).toHaveLength(0);
  });
});

describe('loadEmptyStateLottieAsset', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns explicitly fetched JSON animation data', async () => {
    const animationData = {v: '5.13.0', layers: []};
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => animationData,
      })),
    );

    await expect(
      loadEmptyStateLottieAsset('/lottie/empty-state/no-data.json'),
    ).resolves.toBe(animationData);
  });

  it('rejects a failed asset response with its HTTP status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ok: false, status: 404})),
    );

    await expect(
      loadEmptyStateLottieAsset('/lottie/empty-state/missing.json'),
    ).rejects.toThrow('HTTP 404');
  });

  it('rejects an invalid JSON response explicitly', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => {
          throw new SyntaxError('Invalid JSON');
        },
      })),
    );

    await expect(
      loadEmptyStateLottieAsset('/lottie/empty-state/no-data.json'),
    ).rejects.toThrow('is not valid JSON');
  });
});
