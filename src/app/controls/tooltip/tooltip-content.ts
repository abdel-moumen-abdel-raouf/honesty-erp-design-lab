import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-tooltip-content',
  templateUrl: './tooltip-content.html',
  styleUrl: './tooltip-content.scss',
})
export class ErpTooltipContent {}
