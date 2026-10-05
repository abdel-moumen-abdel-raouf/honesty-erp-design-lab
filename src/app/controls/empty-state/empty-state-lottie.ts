import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
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

const LOTTIE_WEB_SCRIPT = 'vendor/lottie-web/lottie_svg.min.js';
let lottiePlayerPromise: Promise<LottiePlayer> | null = null;

function loadLottiePlayer(document: Document): Promise<LottiePlayer> {
  const currentPlayer = (document.defaultView as
    | (Window & {lottie?: LottiePlayer})
    | null)?.lottie;

  if (currentPlayer !== undefined) {
    return Promise.resolve(currentPlayer);
  }

  if (lottiePlayerPromise !== null) {
    return lottiePlayerPromise;
  }

  lottiePlayerPromise = new Promise<LottiePlayer>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(LOTTIE_WEB_SCRIPT, document.baseURI).toString();
    script.async = true;
    script.dataset['emptyStateLottieRuntime'] = 'true';
    script.addEventListener('load', () => {
      const player = (document.defaultView as
        | (Window & {lottie?: LottiePlayer})
        | null)?.lottie;

      if (player === undefined) {
        lottiePlayerPromise = null;
        reject(new Error('lottie-web loaded without exposing its player.'));
        return;
      }

      resolve(player);
    });
    script.addEventListener('error', () => {
      lottiePlayerPromise = null;
      reject(new Error('Unable to load the local lottie-web runtime.'));
    });
    document.head.append(script);
  });

  return lottiePlayerPromise;
}

export const EMPTY_STATE_LOTTIE_LOADER =
  new InjectionToken<EmptyStateLottieLoader>('EMPTY_STATE_LOTTIE_LOADER', {
    providedIn: 'root',
    factory: () => {
      const document = inject(DOCUMENT);
      return () => loadLottiePlayer(document);
    },
  });

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
    '[attr.data-empty-state-lottie-playing]': 'shouldPlay()',
    '[style.--honesty-empty-state-lottie-speed]': 'speed()',
  },
})
export class ErpEmptyStateLottie {
  readonly assetPath = input.required<string>();
  readonly animated = input(true);
  readonly motion = input<ErpEmptyStateIllustrationMotion>('float');
  readonly speed = input<ErpEmptyStateMotionSpeed>(1);

  private readonly loader = inject(EMPTY_STATE_LOTTIE_LOADER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly container =
    viewChild<ElementRef<HTMLElement>>('animationContainer');
  private readonly reducedMotion = signal(false);
  private readonly animationRevision = signal(0);
  protected readonly shouldPlay = computed(
    () =>
      this.animated() &&
      this.motion() !== 'none' &&
      !this.reducedMotion(),
  );

  private animation: AnimationItem | null = null;
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
      this.animationRevision();
      const speed = this.speed();
      const shouldPlay = this.shouldPlay();
      const animation = this.animation;

      if (animation === null) {
        return;
      }

      animation.setSpeed(speed);

      if (shouldPlay) {
        animation.play();
      } else {
        animation.goToAndStop(0, true);
      }
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
    if (!this.shouldPlay() || this.animation === null) {
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
    const player = await this.loader();

    if (revision !== this.loadRevision) {
      return;
    }

    const animation = player.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: assetPath,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    if (revision !== this.loadRevision) {
      animation.destroy();
      return;
    }

    this.animation = animation;
    this.animationRevision.update((value) => value + 1);
  }

  private destroyAnimation(): void {
    const animation = this.animation;
    this.animation = null;

    if (animation !== null) {
      animation.destroy();
      this.animationRevision.update((value) => value + 1);
    }
  }
}
