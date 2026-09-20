import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import html2canvas from 'html2canvas';

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

      const canvas = await html2canvas(target, {
        scale: 1,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        backgroundColor: null,
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
