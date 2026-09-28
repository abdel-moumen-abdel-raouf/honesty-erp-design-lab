import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpContainer} from '../../primitives/container/container';
import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpContainer, ErpStack, ErpSection, ErpText, ErpReviewBox],
  selector: 'app-typography-specimen',
  templateUrl: './typography.html',
  styleUrls: ['./typography.scss', './typography-part-2.scss', './typography-part-3.scss', './typography-part-4.scss', './typography-part-5.scss', './typography-part-6.scss', './typography-part-7.scss', './typography-part-8.scss', './typography-part-9.scss'],
})
export class Typography implements OnInit {
  readonly tajawalLoaded = signal<boolean | null>(null);
  readonly spaceGroteskLoaded = signal<boolean | null>(null);
  readonly hasFontError = signal<boolean>(false);

  ngOnInit(): void {
    this.verifyFonts();
  }

  private async verifyFonts(): Promise<void> {
    if (typeof document === 'undefined' || !document.fonts) {
      this.hasFontError.set(true);
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
      } else {
        this.hasFontError.set(true);
      }
    } catch {
      this.hasFontError.set(true);
    }
  }
}
