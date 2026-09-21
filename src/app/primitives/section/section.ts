import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpSectionGap = 'none' | 'default' | 'large';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-section',
  templateUrl: './section.html',
  styleUrl: './section.scss',
  host: {
    '[attr.data-gap]': 'gap()',
  },
})
export class ErpSection {
  readonly gap = input<ErpSectionGap>('default');
}
