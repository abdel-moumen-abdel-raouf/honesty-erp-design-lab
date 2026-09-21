import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpDividerOrientation = 'horizontal' | 'vertical';
export type ErpDividerTone = 'subtle' | 'default' | 'strong';
export type ErpDividerStroke = 'solid' | 'dashed';
export type ErpDividerWeight = 'default' | 'emphasis';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-divider',
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
  host: {
    role: 'separator',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-stroke]': 'stroke()',
    '[attr.data-weight]': 'weight()',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class ErpDivider {
  readonly orientation = input<ErpDividerOrientation>('horizontal');
  readonly tone = input<ErpDividerTone>('subtle');
  readonly stroke = input<ErpDividerStroke>('solid');
  readonly weight = input<ErpDividerWeight>('default');
}
