import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  Router,
  RouterOutlet,
} from '@angular/router';
import {ErpOverlayHost} from './shared/overlay/overlay-host';
import {ErpButton} from './controls/button/button';
import {ErpText} from './primitives/text/text';
import {ErpReviewCatalogNavigation} from './review-internals/review-catalog-navigation/review-catalog-navigation';

export type LabTheme = 'light' | 'dark';

const LAB_THEME_STORAGE_KEY = 'honesty-lab-theme';

export function resolveLabTheme(
  storage: Pick<Storage, 'getItem'> | null,
): LabTheme {
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

export function buildScreenshotFilename(routerUrl: string, theme: LabTheme): string {
  const currentUrl = routerUrl.split('?')[0].split('#')[0];
  const cleanPath =
    currentUrl
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\//g, '-') || 'foundation-review';

  return `${cleanPath}-${theme}-view.png`;
}

export function resolveLabScreenshotTarget(
  rootDocument: Document,
): HTMLElement | null {
  return rootDocument.getElementById('lab-capture-root');
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
  imports: [RouterOutlet, ErpButton, ErpOverlayHost, ErpText, ErpReviewCatalogNavigation],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './app-part-2.scss', './app-part-3.scss', './app-part-4.scss'],
})
export class App {
  private readonly router = inject(Router);
  private readonly storage = this.resolveStorage();

  readonly theme = signal<LabTheme>(resolveLabTheme(this.storage));
  readonly isCapturing = signal(false);
  readonly statusMessage = signal<string | null>(null);
  readonly hasError = signal(false);
  readonly catalogOpen = signal(false);

  toggleTheme(): void {
    const theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(theme);
    persistLabTheme(theme, this.storage);
  }

  toggleCatalog(): void {
    this.catalogOpen.update((open) => !open);
  }

  closeCatalog(): void {
    this.catalogOpen.set(false);
  }

  async captureScreenshot(): Promise<void> {
    if (this.isCapturing()) {
      return;
    }

    const target = resolveLabScreenshotTarget(document);

    if (!target) {
      this.hasError.set(true);
      this.statusMessage.set('تعذر العثور على محتوى الصفحة');
      return;
    }

    this.isCapturing.set(true);
    this.hasError.set(false);
    this.statusMessage.set('جاري الالتقاط...');

    try {
      const {default: html2canvas} = await import('html2canvas/dist/html2canvas.esm.js');
      const width = target.scrollWidth;
      const height = target.scrollHeight;
      const targetWindow = target.ownerDocument.defaultView;

      const canvas = await html2canvas(target, {
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

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = buildScreenshotFilename(this.router.url, this.theme());
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
