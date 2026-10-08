import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpPageWidthMode = 'boxed' | 'fluid' | 'full';
export type ErpPageScrollMode = 'document' | 'page' | 'free';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-page',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  host: {
    '[attr.data-page-width]': 'widthMode()',
    '[attr.data-page-scroll]': 'scrollMode()',
  },
})
export class ErpPage {
  readonly widthMode = input<ErpPageWidthMode>('fluid');
  readonly scrollMode = input<ErpPageScrollMode>('document');
}
