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
import html2canvas from 'html2canvas';
import {filter} from 'rxjs';

export type LabPreviewMode = 'desktop' | 'tablet' | 'mobile';

export function hasLabPreviewFlag(search: string): boolean {
  return new URLSearchParams(search).get('labPreview') === '1';
}

export function buildLabPreviewUrl(routerUrl: string): string {
  const fragmentIndex = routerUrl.indexOf('#');
  const fragment = fragmentIndex >= 0 ? routerUrl.slice(fragmentIndex + 1) : '';
  const withoutFragment = fragmentIndex >= 0 ? routerUrl.slice(0, fragmentIndex) : routerUrl;
  const queryIndex = withoutFragment.indexOf('?');
  const path = queryIndex >= 0 ? withoutFragment.slice(0, queryIndex) : withoutFragment;
  const query = queryIndex >= 0 ? withoutFragment.slice(queryIndex + 1) : '';
  const parameters = new URLSearchParams(query);

  parameters.set('labPreview', '1');

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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private readonly previewRouterUrl = signal(this.router.url);

  readonly isEmbeddedPreview = hasLabPreviewFlag(
    typeof window === 'undefined' ? '' : window.location.search,
  );
  readonly currentPreviewMode = signal<LabPreviewMode>('desktop');
  readonly previewSafeUrl = computed<SafeResourceUrl>(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      buildLabPreviewUrl(this.previewRouterUrl()),
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

  async captureScreenshot(): Promise<void> {
    if (this.isCapturing()) {
      return;
    }

    const previewFrame = document.getElementById('lab-preview-frame') as HTMLIFrameElement | null;
    const previewDocument = previewFrame?.contentDocument;
    const target = previewDocument?.getElementById('routed-review-content') as HTMLElement | null;

    if (!target) {
      this.hasError.set(true);
      this.statusMessage.set('تعذر العثور على محتوى الصفحة');
      return;
    }

    this.isCapturing.set(true);
    this.hasError.set(false);
    this.statusMessage.set('جاري الالتقاط...');

    try {
      const width = target.scrollWidth;
      const height = target.scrollHeight;
      const previewWindow = target.ownerDocument.defaultView;
      const resolvedBackgroundColor = resolveVisibleBackgroundColor(target);

      const canvas = await html2canvas(target, {
        scale: 1,
        width,
        height,
        windowWidth: previewWindow?.innerWidth ?? width,
        windowHeight: previewWindow?.innerHeight ?? height,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        backgroundColor: resolvedBackgroundColor,
      });

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
}
