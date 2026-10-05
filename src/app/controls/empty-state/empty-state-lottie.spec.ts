import {TestBed} from '@angular/core/testing';
import type {AnimationItem, LottiePlayer} from 'lottie-web';
import {
  EMPTY_STATE_LOTTIE_LOADER,
  ErpEmptyStateLottie,
} from './empty-state-lottie';

describe('ErpEmptyStateLottie', () => {
  let animation: AnimationItem;
  let player: LottiePlayer;
  let mediaQuery: MediaQueryList;
  let mediaListeners: Set<(event: MediaQueryListEvent) => void>;

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

    animation = {
      destroy: vi.fn(),
      goToAndPlay: vi.fn(),
      goToAndStop: vi.fn(),
      play: vi.fn(),
      setSpeed: vi.fn(),
    } as unknown as AnimationItem;
    player = {
      loadAnimation: vi.fn(() => animation),
    } as unknown as LottiePlayer;

    TestBed.configureTestingModule({
      imports: [ErpEmptyStateLottie],
      providers: [
        {
          provide: EMPTY_STATE_LOTTIE_LOADER,
          useValue: async () => player,
        },
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

  it('loads the assigned transparent asset through the SVG renderer without autoplay', async () => {
    const fixture = create();
    await waitForLoad();

    expect(player.loadAnimation).toHaveBeenCalledWith(
      expect.objectContaining({
        container: fixture.nativeElement.querySelector(
          '.empty-state-lottie__canvas',
        ),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/lottie/empty-state/no-data.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      }),
    );
  });

  it('destroys the previous animation before loading a changed asset', async () => {
    const firstAnimation = animation;
    const secondAnimation = {
      destroy: vi.fn(),
      goToAndPlay: vi.fn(),
      goToAndStop: vi.fn(),
      play: vi.fn(),
      setSpeed: vi.fn(),
    } as unknown as AnimationItem;
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
    expect(player.loadAnimation).toHaveBeenLastCalledWith(
      expect.objectContaining({path: '/lottie/empty-state/error.json'}),
    );
  });

  it.each([0.5, 1, 1.5] as const)(
    'applies motion speed %s through the Lottie runtime',
    async (speed) => {
      const fixture = create();
      await waitForLoad();

      if (speed === 1) {
        fixture.componentRef.setInput('speed', 0.5);
        fixture.detectChanges();
      }

      vi.mocked(animation.setSpeed).mockClear();

      fixture.componentRef.setInput('speed', speed);
      fixture.detectChanges();

      expect(animation.setSpeed).toHaveBeenLastCalledWith(speed);
    },
  );

  it('shows the first frame when animated is false', async () => {
    const fixture = create();
    await waitForLoad();

    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();

    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
    expect(
      fixture.nativeElement.getAttribute('data-empty-state-lottie-playing'),
    ).toBe('false');
  });

  it('shows the first frame when illustration motion is none', async () => {
    const fixture = create();
    await waitForLoad();

    fixture.componentRef.setInput('motion', 'none');
    fixture.detectChanges();

    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
  });

  it('replays from the first frame when runtime motion is allowed', async () => {
    const fixture = create();
    await waitForLoad();

    fixture.componentInstance.replay();

    expect(animation.goToAndPlay).toHaveBeenCalledWith(0, true);
  });

  it('prevents playback and resets to a static frame during reduced motion', async () => {
    const fixture = create();
    await waitForLoad();
    vi.mocked(animation.goToAndPlay).mockClear();

    setReducedMotion(true);
    fixture.detectChanges();
    fixture.componentInstance.replay();

    expect(animation.goToAndStop).toHaveBeenLastCalledWith(0, true);
    expect(animation.goToAndPlay).not.toHaveBeenCalled();
    expect(
      fixture.nativeElement.getAttribute('data-empty-state-lottie-playing'),
    ).toBe('false');
  });

  it('destroys the active Lottie instance and media listener with the component', async () => {
    const fixture = create();
    await waitForLoad();

    fixture.destroy();

    expect(animation.destroy).toHaveBeenCalledOnce();
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
