/* eslint-disable @angular-eslint/component-selector */
import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpTooltip} from '../tooltip/tooltip';
export type ErpAlertTone = 'info' | 'success' | 'warning' | 'danger';
@Component({changeDetection: ChangeDetectionStrategy.OnPush,   selector: 'erp-alert', imports: [ErpIcon, ErpIconButton, ErpText, ErpTooltip], templateUrl: './alert.html', styleUrl: './alert.scss', host: {'[attr.data-alert-tone]': 'tone()', '[attr.role]': 'tone() === "danger" ? "alert" : "status"'}})
export class ErpAlert {
  readonly title = input.required<string>(); readonly description = input<string | null>(null); readonly tone = input<ErpAlertTone>('info'); readonly icon = input<ErpIconName | null>(null); readonly dismissible = input(false, {transform: booleanAttribute}); readonly dismissLabel = input('إغلاق التنبيه'); readonly dismissed = output<void>();
  protected readonly effectiveIcon = computed<ErpIconName>(() => this.icon() ?? ({info: 'info', success: 'success', warning: 'warning', danger: 'error'} as const)[this.tone()]);
}
