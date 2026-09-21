import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpGridColumns = 1 | 2 | 3 | 4 | 5 | 6;
export type ErpGridGap = 'grid' | 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type ErpGridResponsive = 'auto' | 'fixed';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-grid',
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  host: {
    '[attr.data-columns]': 'columns()',
    '[attr.data-gap]': 'gap()',
    '[attr.data-responsive]': 'responsive()',
  },
})
export class ErpGrid {
  readonly columns = input<ErpGridColumns>(1);
  readonly gap = input<ErpGridGap>('grid');
  readonly responsive = input<ErpGridResponsive>('auto');
}
