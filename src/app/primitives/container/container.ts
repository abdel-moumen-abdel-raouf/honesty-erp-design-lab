import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpContainerWidth = 'full' | 'narrow' | 'content' | 'wide';
export type ErpContainerGutter = 'page' | 'none';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-container',
  templateUrl: './container.html',
  styleUrl: './container.scss',
  host: {
    '[attr.data-width]': 'width()',
    '[attr.data-gutter]': 'gutter()',
  },
})
export class ErpContainer {
  readonly width = input<ErpContainerWidth>('full');
  readonly gutter = input<ErpContainerGutter>('page');
}
