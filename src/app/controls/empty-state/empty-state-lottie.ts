import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  InjectionToken,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type {AnimationItem, LottiePlayer} from 'lottie-web';
import type {
  ErpEmptyStateIllustrationMotion,
  ErpEmptyStateMotionSpeed,
} from './empty-state';

type EmptyStateLottieLoader = () => Promise<LottiePlayer>;
type EmptyStateLottieAssetLoader = (assetPath: string) => Promise<unknown>;
type EmptyStateLottieState = 'loading' | 'ready' | 'static' | 'error';

let lottiePlayerPromise: Promise<LottiePlayer> | null = null;

export function loadLottiePlayer(): Promise<LottiePlayer> {
  if (lottiePlayerPromise === null) {
    // @ts-expect-error -- lottie-web 5.13.0 ships this ESM build without colocated declarations; the package LottiePlayer type and runtime guard remain authoritative.
    lottiePlayerPromise = import('lottie-web/build/player/esm/lottie_svg.min.js')
      .then((module) => module.default)
      .then((player) => {
        if (typeof player.loadAnimation !== 'function') {
          throw new Error('The imported lottie-web runtime is invalid.');
        }

        return player;
      })
      .catch((error: unknown) => {
        lottiePlayerPromise = null;
        throw new Error('Unable to import the lottie-web runtime.', {
          cause: error,
        });
      });
  }

  return lottiePlayerPromise;
}

export async function loadEmptyStateLottieAsset(
  assetPath: string,
): Promise<unknown> {
  const response = await fetch(assetPath);

  if (!response.ok) {
    throw new Error(
      `Unable to load Lottie asset ${assetPath}: HTTP ${response.status}.`,
    );
  }

  try {
    return await response.json();
  } catch (error: unknown) {
    throw new Error(`Lottie asset ${assetPath} is not valid JSON.`, {
      cause: error,
    });
  }
}

export const EMPTY_STATE_LOTTIE_LOADER =
  new InjectionToken<EmptyStateLottieLoader>('EMPTY_STATE_LOTTIE_LOADER', {
    providedIn: 'root',
    factory: () => loadLottiePlayer,
  });

export const EMPTY_STATE_LOTTIE_ASSET_LOADER =
  new InjectionToken<EmptyStateLottieAssetLoader>(
    'EMPTY_STATE_LOTTIE_ASSET_LOADER',
    {
      providedIn: 'root',
      factory: () => loadEmptyStateLottieAsset,
    },
  );

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-empty-state-lottie',
  templateUrl: './empty-state-lottie.html',
  styleUrl: './empty-state-lottie.scss',
  host: {
    'aria-hidden': 'true',
    '[attr.data-empty-state-lottie-asset]': 'assetPath()',
    '[attr.data-empty-state-lottie-motion]': 'motion()',
    '[attr.data-empty-state-lottie-playing]': 'isPlaying()',
    '[attr.data-empty-state-lottie-state]': 'runtimeState()',
    '[style.--honesty-empty-state-lottie-speed]': 'speed()',
  },
})
export class ErpEmptyStateLottie {
  readonly assetPath = input.required<string>();
  readonly animated = input(true);
  readonly motion = input<ErpEmptyStateIllustrationMotion>('float');
  readonly speed = input<ErpEmptyStateMotionSpeed>(1);

  private readonly loader = inject(EMPTY_STATE_LOTTIE_LOADER);
  private readonly assetLoader = inject(EMPTY_STATE_LOTTIE_ASSET_LOADER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly container =
    viewChild<ElementRef<HTMLElement>>('animationContainer');
  private readonly reducedMotion = signal(false);
  protected readonly runtimeState = signal<EmptyStateLottieState>('loading');
  protected readonly shouldPlay = computed(
    () =>
      this.animated() &&
      this.motion() !== 'none' &&
      !this.reducedMotion(),
  );
  protected readonly isPlaying = computed(
    () => this.shouldPlay() && this.runtimeState() === 'ready',
  );

  private animation: AnimationItem | null = null;
  private animationReady = false;
  private animationListenerCleanups: (() => void)[] = [];
  private loadRevision = 0;
  private motionQuery: MediaQueryList | null = null;

  constructor() {
    this.initializeReducedMotion();

    effect(() => {
      const container = this.container()?.nativeElement;
      const assetPath = this.assetPath();

      if (container === undefined) {
        return;
      }

      void this.loadAnimation(container, assetPath);
    });

    effect(() => {
      const speed = this.speed();
      const shouldPlay = this.shouldPlay();
      const animation = this.animation;

      if (animation === null || !this.animationReady) {
        return;
      }

      this.applyPlayback(animation, speed, shouldPlay);
    });

    this.destroyRef.onDestroy(() => {
      this.loadRevision += 1;
      this.destroyAnimation();

      if (this.motionQuery !== null) {
        this.motionQuery.removeEventListener('change', this.handleMotionChange);
      }
    });
  }

  replay(): void {
    if (
      !this.shouldPlay() ||
      this.animation === null ||
      !this.animationReady
    ) {
      return;
    }

    this.animation.setSpeed(this.speed());
    this.animation.goToAndPlay(0, true);
  }

  private initializeReducedMotion(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion.set(this.motionQuery.matches);
    this.motionQuery.addEventListener('change', this.handleMotionChange);
  }

  private readonly handleMotionChange = (event: MediaQueryListEvent): void => {
    this.reducedMotion.set(event.matches);
  };

  private async loadAnimation(
    container: HTMLElement,
    assetPath: string,
  ): Promise<void> {
    const revision = ++this.loadRevision;
    this.destroyAnimation();
    this.runtimeState.set('loading');

    try {
      const [player, animationData] = await Promise.all([
        this.loader(),
        this.assetLoader(assetPath),
      ]);

      if (revision !== this.loadRevision) {
        return;
      }

      const animation = player.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });

      if (revision !== this.loadRevision) {
        animation.destroy();
        return;
      }

      this.animation = animation;
      this.animationReady = false;
      this.animationListenerCleanups = [
        animation.addEventListener('DOMLoaded', () => {
          this.handleDomLoaded(revision, container, animation);
        }),
        animation.addEventListener('data_failed', () => {
          this.handleAnimationFailure(
            revision,
            new Error(`Lottie data loading failed for ${assetPath}.`),
          );
        }),
        animation.addEventListener('error', () => {
          this.handleAnimationFailure(
            revision,
            new Error(`Lottie rendering failed for ${assetPath}.`),
          );
        }),
      ];

      if (animation.isLoaded) {
        queueMicrotask(() => {
          this.handleDomLoaded(revision, container, animation);
        });
      }
    } catch (error: unknown) {
      this.handleAnimationFailure(revision, error);
    }
  }

  private handleDomLoaded(
    revision: number,
    container: HTMLElement,
    animation: AnimationItem,
  ): void {
    if (
      revision !== this.loadRevision ||
      animation !== this.animation ||
      this.animationReady
    ) {
      return;
    }

    if (container.querySelector('svg') === null) {
      this.handleAnimationFailure(
        revision,
        new Error('Lottie DOMLoaded completed without a generated SVG.'),
      );
      return;
    }

    this.animationReady = true;
    this.applyPlayback(animation, this.speed(), this.shouldPlay());
  }

  private applyPlayback(
    animation: AnimationItem,
    speed: ErpEmptyStateMotionSpeed,
    shouldPlay: boolean,
  ): void {
    animation.setSpeed(speed);

    if (shouldPlay) {
      animation.play();
      this.runtimeState.set('ready');
    } else {
      animation.goToAndStop(0, true);
      this.runtimeState.set('static');
    }
  }

  private handleAnimationFailure(revision: number, error: unknown): void {
    if (revision !== this.loadRevision) {
      return;
    }

    const runtimeError =
      error instanceof Error
        ? error
        : new Error('Unknown EmptyState Lottie runtime failure.');

    this.destroyAnimation();
    this.runtimeState.set('error');
    this.errorHandler.handleError(runtimeError);
  }

  private destroyAnimation(): void {
    const animation = this.animation;
    this.animation = null;
    this.animationReady = false;

    for (const cleanup of this.animationListenerCleanups) {
      cleanup();
    }
    this.animationListenerCleanups = [];

    if (animation !== null) {
      animation.destroy();
    }
  }
}
