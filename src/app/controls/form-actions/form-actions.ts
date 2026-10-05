import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-form-actions',
  templateUrl: './form-actions.html',
  styleUrl: './form-actions.scss',
})
export class ErpFormActions {}
