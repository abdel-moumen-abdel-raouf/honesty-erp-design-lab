import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-typography-specimen',
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
})
export class Typography implements OnInit {
  readonly tajawalLoaded = signal<boolean | null>(null);
  readonly spaceGroteskLoaded = signal<boolean | null>(null);
  readonly fontVerificationMessage = signal<string>('جاري فحص تحميل الخطوط محلياً...');
  readonly hasFontError = signal<boolean>(false);

  ngOnInit(): void {
    this.verifyFonts();
  }

  private async verifyFonts(): Promise<void> {
    if (typeof document === 'undefined' || !document.fonts) {
      this.fontVerificationMessage.set('بيئة التشغيل لا تدعم Font Loading API (بيئة غير متصفحية)');
      return;
    }

    try {
      await document.fonts.ready;
      await Promise.allSettled([
        document.fonts.load('16px "Tajawal"'),
        document.fonts.load('16px "Space Grotesk"'),
      ]);

      const tajawalOk = document.fonts.check('16px "Tajawal"');
      const spaceGroteskOk = document.fonts.check('16px "Space Grotesk"');

      this.tajawalLoaded.set(tajawalOk);
      this.spaceGroteskLoaded.set(spaceGroteskOk);

      if (tajawalOk && spaceGroteskOk) {
        this.hasFontError.set(false);
        this.fontVerificationMessage.set('تم التحقق بنجاح: الخطوط المعتمدة محملة محلياً ومفعلة (Tajawal + Space Grotesk)');
      } else {
        this.hasFontError.set(true);
        const failed: string[] = [];
        if (!tajawalOk) failed.push('Tajawal');
        if (!spaceGroteskOk) failed.push('Space Grotesk');
        this.fontVerificationMessage.set(`تنبيه: تعذر التحقق من تحميل الخطوط المحلية: ${failed.join(', ')}`);
      }
    } catch {
      this.fontVerificationMessage.set('حدث خطأ أثناء فحص جاهزية الخطوط عبر Font Loading API');
    }
  }
}
