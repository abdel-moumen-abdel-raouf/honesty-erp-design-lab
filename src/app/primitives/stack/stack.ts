import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpStackGap = 'none' | 'tight' | 'default' | 'loose';
export type ErpStackAlign = 'stretch' | 'start' | 'center' | 'end';
export type ErpStackJustify = 'start' | 'center' | 'end' | 'between';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-stack',
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
  host: {
    '[attr.data-gap]': 'gap()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
  },
})
export class ErpStack {
  readonly gap = input<ErpStackGap>('default');
  readonly align = input<ErpStackAlign>('stretch');
  readonly justify = input<ErpStackJustify>('start');
}
