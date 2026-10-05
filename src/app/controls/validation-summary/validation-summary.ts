import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {ErpAlert} from '../alert/alert';
import {ErpButton} from '../button/button';
import {ErpFormValidationIssue} from '../forms-family/forms-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-validation-summary',
  imports: [ErpAlert, ErpButton],
  templateUrl: './validation-summary.html',
  styleUrl: './validation-summary.scss',
  host: {'[attr.data-validation-summary-count]': 'issues().length'},
})
export class ErpValidationSummary {
  readonly title = input('يرجى مراجعة الحقول التالية');
  readonly issues = input<readonly ErpFormValidationIssue[]>([]);
  readonly issueActivated = output<ErpFormValidationIssue>();
}
