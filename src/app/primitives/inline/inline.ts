import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpInlineGap = 'none' | 'tight' | 'default' | 'loose';
export type ErpInlineAlign = 'stretch' | 'start' | 'center' | 'end' | 'baseline';
export type ErpInlineJustify = 'start' | 'center' | 'end' | 'between';
export type ErpInlineWrap = 'nowrap' | 'wrap';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-inline',
  templateUrl: './inline.html',
  styleUrl: './inline.scss',
  host: {
    '[attr.data-gap]': 'gap()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
  },
})
export class ErpInline {
  readonly gap = input<ErpInlineGap>('default');
  readonly align = input<ErpInlineAlign>('center');
  readonly justify = input<ErpInlineJustify>('start');
  readonly wrap = input<ErpInlineWrap>('nowrap');
}
