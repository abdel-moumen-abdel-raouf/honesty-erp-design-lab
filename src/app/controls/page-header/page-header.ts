import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-page-header',
  imports: [ErpText],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class ErpPageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
}
