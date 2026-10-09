import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpTooltip} from '../tooltip/tooltip';

export type ErpQuickActionPriority = 'primary' | 'secondary';

export interface ErpQuickAction {
  readonly id: string;
  readonly label: string;
  readonly icon: ErpIconName;
  readonly priority?: ErpQuickActionPriority;
  readonly disabled?: boolean;
}

export interface ErpQuickActionGroup {
  readonly id: string;
  readonly label?: string;
  readonly actions: readonly ErpQuickAction[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-quick-actions-bar',
  imports: [ErpIconButton, ErpText, ErpTooltip],
  templateUrl: './quick-actions-bar.html',
  styleUrl: './quick-actions-bar.scss',
})
export class ErpQuickActionsBar {
  readonly groups = input.required<readonly ErpQuickActionGroup[]>();
  readonly ariaLabel = input('الإجراءات السريعة');

  readonly actionActivated = output<string>();

  protected activate(action: ErpQuickAction): void {
    if (!action.disabled) {
      this.actionActivated.emit(action.id);
    }
  }
}
