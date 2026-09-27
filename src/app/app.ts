import {ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {filter} from 'rxjs';
import {ErpOverlayHost} from './shared/overlay/overlay-host';

export type LabPreviewMode = 'desktop' | 'tablet' | 'mobile';
export type LabTheme = 'light' | 'dark';

const LAB_THEME_STORAGE_KEY = 'honesty-lab-theme';

export function hasLabPreviewFlag(search: string): boolean {
  return new URLSearchParams(search).get('labPreview') === '1';
}

export function resolveLabTheme(
  search: string,
  storage: Pick<Storage, 'getItem'> | null,
): LabTheme {
  const queryTheme = new URLSearchParams(search).get('labTheme');

  if (queryTheme === 'light' || queryTheme === 'dark') {
    return queryTheme;
  }

  try {
    const storedTheme = storage?.getItem(LAB_THEME_STORAGE_KEY);
    return storedTheme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function persistLabTheme(
  theme: LabTheme,
  storage: Pick<Storage, 'setItem'> | null,
): void {
  try {
    storage?.setItem(LAB_THEME_STORAGE_KEY, theme);
  } catch {
    // Design Lab theme persistence is optional when storage is unavailable.
  }
}

export function buildLabPreviewUrl(
  routerUrl: string,
  theme: LabTheme,
): string {
  const fragmentIndex = routerUrl.indexOf('#');
  const fragment = fragmentIndex >= 0 ? routerUrl.slice(fragmentIndex + 1) : '';
  const withoutFragment = fragmentIndex >= 0 ? routerUrl.slice(0, fragmentIndex) : routerUrl;
  const queryIndex = withoutFragment.indexOf('?');
  const path = queryIndex >= 0 ? withoutFragment.slice(0, queryIndex) : withoutFragment;
  const query = queryIndex >= 0 ? withoutFragment.slice(queryIndex + 1) : '';
  const parameters = new URLSearchParams(query);

  parameters.set('labPreview', '1');
  parameters.set('labTheme', theme);

  const resolvedPath = path || '/';
  const resolvedFragment = fragment ? `#${fragment}` : '';
  return `${resolvedPath}?${parameters.toString()}${resolvedFragment}`;
}

export function buildScreenshotFilename(routerUrl: string, mode: LabPreviewMode): string {
  const currentUrl = routerUrl.split('?')[0].split('#')[0];
  const cleanPath =
    currentUrl
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\//g, '-') || 'foundation-review';

  return `${cleanPath}-${mode}-view.png`;
}

export function isDirectLabReviewRoute(routerUrl: string): boolean {
  const route = routerUrl.split('?')[0].split('#')[0];
  return route === '/controls/inputs' || route === '/controls/overlays';
}

export interface LabScreenshotSources {
  readonly outerRoot: HTMLElement;
  readonly toolbar: HTMLElement | null;
  readonly embeddedRoot: HTMLElement | null;
}

export function resolveLabScreenshotSources(
  rootDocument: Document,
  directReview: boolean,
): LabScreenshotSources | null {
  const outerRoot = rootDocument.getElementById('lab-capture-root');

  if (!outerRoot) {
    return null;
  }

  if (directReview) {
    return {outerRoot, toolbar: null, embeddedRoot: null};
  }

  const previewFrame = rootDocument.getElementById(
    'lab-preview-frame',
  ) as HTMLIFrameElement | null;
  const embeddedRoot =
    previewFrame?.contentDocument?.getElementById('lab-capture-root') ?? null;

  if (!embeddedRoot) {
    return null;
  }

  return {
    outerRoot,
    toolbar: rootDocument.getElementById('lab-utility-bar'),
    embeddedRoot,
  };
}

export function resolveLabScreenshotTarget(
  rootDocument: Document,
  directReview: boolean,
): HTMLElement | null {
  const sources = resolveLabScreenshotSources(rootDocument, directReview);
  return directReview ? sources?.outerRoot ?? null : sources?.embeddedRoot ?? null;
}

/**
 * Checks if a CSS color value represents a fully transparent color.
 * Partially transparent colors (alpha > 0) are NOT considered fully transparent.
 */
export function isFullyTransparent(color: string | null | undefined): boolean {
  if (!color) {
    return true;
  }
  const normalized = color.trim().toLowerCase();
  if (normalized === 'transparent' || normalized === '' || normalized === 'none') {
    return true;
  }

  // Handle rgba(r, g, b, a) or rgb(r g b / a) with alpha === 0
  const rgbaMatch = normalized.match(
    /^rgba?\(\s*[\d.]+%?\s*[, ]\s*[\d.]+%?\s*[, ]\s*[\d.]+%?(?:\s*[,/]\s*([\d.]+%?)\s*)?\)$/
  );
  if (rgbaMatch && rgbaMatch[1] !== undefined) {
    const alphaStr = rgbaMatch[1];
    const alpha = alphaStr.endsWith('%')
      ? parseFloat(alphaStr) / 100
      : parseFloat(alphaStr);
    return alpha === 0;
  }

  return false;
}

/**
 * Resolves the actual visible page background color at capture time:
 * 1. Inspect target's computed background color.
 * 2. If transparent, walk through its ancestors until a non-transparent computed background is found.
 * 3. If still transparent, inspect the target document's body and documentElement.
 * 4. Fallback to '#ffffff' ONLY if all relevant computed backgrounds are transparent.
 */
export function resolveVisibleBackgroundColor(target: HTMLElement): string {
  const targetDocument = target.ownerDocument;
  const targetWindow = targetDocument.defaultView;

  if (targetWindow && typeof targetWindow.getComputedStyle === 'function') {
    let current: HTMLElement | null = target;

    while (current) {
      const background = targetWindow.getComputedStyle(current).backgroundColor;
      if (!isFullyTransparent(background)) {
        return background;
      }
      current = current.parentElement;
    }

    if (targetDocument.body) {
      const bodyBackground = targetWindow.getComputedStyle(targetDocument.body).backgroundColor;
      if (!isFullyTransparent(bodyBackground)) {
        return bodyBackground;
      }
    }

    if (targetDocument.documentElement) {
      const documentBackground = targetWindow.getComputedStyle(
        targetDocument.documentElement,
      ).backgroundColor;
      if (!isFullyTransparent(documentBackground)) {
        return documentBackground;
      }
    }
  }

  return '#ffffff';
}

const SCREENSHOT_SRGB_COLOR_PATTERN =
  /color\(\s*srgb\s+(-?(?:\d+\.?\d*|\.\d+))\s+(-?(?:\d+\.?\d*|\.\d+))\s+(-?(?:\d+\.?\d*|\.\d+))(?:\s*\/\s*(-?(?:\d+\.?\d*|\.\d+)))?\s*\)/gi;

export function normalizeScreenshotColorFunctions(value: string): string {
  return value.replace(
    SCREENSHOT_SRGB_COLOR_PATTERN,
    (_match, red: string, green: string, blue: string, alpha?: string) => {
      const channel = (component: string) =>
        Math.round(Math.min(1, Math.max(0, Number.parseFloat(component))) * 255);
      const resolvedAlpha = Math.min(
        1,
        Math.max(0, alpha === undefined ? 1 : Number.parseFloat(alpha)),
      );

      return `rgba(${channel(red)}, ${channel(green)}, ${channel(blue)}, ${resolvedAlpha})`;
    },
  );
}

export function normalizeScreenshotCloneColors(root: HTMLElement): void {
  const targetWindow = root.ownerDocument.defaultView;

  if (!targetWindow) {
    return;
  }

  for (const element of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
    const style = targetWindow.getComputedStyle(element);

    for (let index = 0; index < style.length; index += 1) {
      const property = style.item(index);
      const value = style.getPropertyValue(property);
      const normalized = normalizeScreenshotColorFunctions(value);

      if (normalized !== value) {
        element.style.setProperty(property, normalized, 'important');
      }
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ErpOverlayHost],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private readonly previewRouterUrl = signal(this.router.url);
  private readonly storage = this.resolveStorage();

  readonly isEmbeddedPreview = hasLabPreviewFlag(
    typeof window === 'undefined' ? '' : window.location.search,
  );
  readonly currentPreviewMode = signal<LabPreviewMode>('desktop');
  readonly theme = signal<LabTheme>(
    resolveLabTheme(
      typeof window === 'undefined' ? '' : window.location.search,
      this.storage,
    ),
  );
  readonly isDirectReview = computed(
    () =>
      !this.isEmbeddedPreview &&
      isDirectLabReviewRoute(this.previewRouterUrl()),
  );
  readonly previewSafeUrl = computed<SafeResourceUrl>(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      buildLabPreviewUrl(this.previewRouterUrl(), this.theme()),
    );
  });
  readonly isCapturing = signal(false);
  readonly statusMessage = signal<string | null>(null);
  readonly hasError = signal(false);

  constructor() {
    if (!this.isEmbeddedPreview) {
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((event) => {
          this.previewRouterUrl.set(event.urlAfterRedirects);
        });
    }
  }

  setPreviewMode(mode: LabPreviewMode): void {
    this.currentPreviewMode.set(mode);
  }

  toggleTheme(): void {
    const theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(theme);
    persistLabTheme(theme, this.storage);
  }

  async captureScreenshot(): Promise<void> {
    if (this.isCapturing()) {
      return;
    }

    const sources = resolveLabScreenshotSources(document, this.isDirectReview());

    if (!sources) {
      this.hasError.set(true);
      this.statusMessage.set('تعذر العثور على محتوى الصفحة');
      return;
    }

    this.isCapturing.set(true);
    this.hasError.set(false);
    this.statusMessage.set('جاري الالتقاط...');

    try {
      const {default: html2canvas} = await import('html2canvas');
      const captureElement = (target: HTMLElement) => {
        const width = target.scrollWidth;
        const height = target.scrollHeight;
        const targetWindow = target.ownerDocument.defaultView;

        return html2canvas(target, {
          scale: 1,
          width,
          height,
          windowWidth: targetWindow?.innerWidth ?? width,
          windowHeight: targetWindow?.innerHeight ?? height,
          scrollX: 0,
          scrollY: 0,
          useCORS: true,
          backgroundColor: resolveVisibleBackgroundColor(target),
          onclone: (_clonedDocument, clonedElement) => {
            normalizeScreenshotCloneColors(clonedElement);
          },
        });
      };

      let canvas: HTMLCanvasElement;

      if (this.isDirectReview()) {
        canvas = await captureElement(sources.outerRoot);
      } else {
        if (!sources.toolbar || !sources.embeddedRoot) {
          throw new Error('Incomplete iframe screenshot sources.');
        }

        const [toolbarCanvas, embeddedCanvas] = await Promise.all([
          captureElement(sources.toolbar),
          captureElement(sources.embeddedRoot),
        ]);
        canvas = document.createElement('canvas');
        canvas.width = Math.max(toolbarCanvas.width, embeddedCanvas.width);
        canvas.height = toolbarCanvas.height + embeddedCanvas.height;

        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Screenshot composition canvas is unavailable.');
        }

        context.fillStyle = resolveVisibleBackgroundColor(sources.outerRoot);
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(toolbarCanvas, 0, 0);
        context.drawImage(embeddedCanvas, 0, toolbarCanvas.height);
      }

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = buildScreenshotFilename(this.router.url, this.currentPreviewMode());
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.statusMessage.set(null);
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      this.hasError.set(true);
      this.statusMessage.set('فشل التقاط الصفحة');
    } finally {
      this.isCapturing.set(false);
    }
  }

  private resolveStorage(): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }
}
