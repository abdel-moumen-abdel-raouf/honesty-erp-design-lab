import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import type {ErpTableDensity, ErpTablePresentation} from '../table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP-owned table internals intentionally use the erp prefix.
  selector: 'erp-table-viewport',
  templateUrl: './table-viewport.html',
  styleUrl: './table-viewport.scss',
  host: {
    '[attr.data-density]': 'density()',
    '[attr.data-fixed]': 'fixedHeight() !== null',
    '[attr.data-vertical]': 'vertical()',
    '[attr.data-presentation]': 'presentation()',
    '[style.--honesty-table-fixed-height.px]': 'fixedHeight()',
  },
})
export class ErpTableViewport {
  readonly caption = input.required<string>();
  readonly density = input<ErpTableDensity>('normal');
  readonly fixedHeight = input<number | null>(null);
  readonly vertical = input(false);
  readonly presentation = input<ErpTablePresentation>('standalone');
}
