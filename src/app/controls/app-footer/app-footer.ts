import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {
  ErpStatusBadge,
  ErpStatusBadgeTone,
} from '../status-badge/status-badge';

export interface ErpAppFooterAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-app-footer',
  imports: [ErpButton, ErpStatusBadge, ErpText],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.scss',
})
export class ErpAppFooter {
  readonly applicationLabel = input<string | null>(null);
  readonly versionLabel = input<string | null>(null);
  readonly statusLabel = input<string | null>(null);
  readonly statusTone = input<ErpStatusBadgeTone>('neutral');
  readonly actions = input<readonly ErpAppFooterAction[]>([]);
  readonly ariaLabel = input('تذييل التطبيق');

  readonly actionActivated = output<string>();

  readonly hasContent = computed(() => Boolean(
    this.applicationLabel()?.trim() ||
    this.versionLabel()?.trim() ||
    this.statusLabel()?.trim() ||
    this.actions().length,
  ));

  protected activate(action: ErpAppFooterAction): void {
    if (!action.disabled) {
      this.actionActivated.emit(action.id);
    }
  }
}
