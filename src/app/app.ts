import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import html2canvas from 'html2canvas';

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
 * 3. If still transparent, inspect document.body and document.documentElement.
 * 4. Fallback to '#ffffff' ONLY if all relevant computed backgrounds are transparent.
 */
export function resolveVisibleBackgroundColor(target: HTMLElement): string {
  if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
    let current: HTMLElement | null = target;

    while (current) {
      const bg = window.getComputedStyle(current).backgroundColor;
      if (!isFullyTransparent(bg)) {
        return bg;
      }
      current = current.parentElement;
    }

    if (typeof document !== 'undefined') {
      if (document.body) {
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        if (!isFullyTransparent(bodyBg)) {
          return bodyBg;
        }
      }

      if (document.documentElement) {
        const docBg = window.getComputedStyle(document.documentElement).backgroundColor;
        if (!isFullyTransparent(docBg)) {
          return docBg;
        }
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

  readonly isCapturing = signal(false);
  readonly statusMessage = signal<string | null>(null);
  readonly hasError = signal(false);

  async captureScreenshot(): Promise<void> {
    if (this.isCapturing()) {
      return;
    }

    const target = document.getElementById('routed-review-content');
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
      const resolvedBackgroundColor = resolveVisibleBackgroundColor(target);

      const canvas = await html2canvas(target, {
        scale: 1,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        backgroundColor: resolvedBackgroundColor,
      });

      const currentUrl = this.router.url.split('?')[0].split('#')[0];
      let cleanPath = currentUrl
        .replace(/^\/+/, '')
        .replace(/\/+$/, '')
        .replace(/\//g, '-');
      if (!cleanPath) {
        cleanPath = 'foundation-review';
      }
      const filename = `${cleanPath}.png`;

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = filename;
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
