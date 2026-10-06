import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpContainer} from '../../primitives/container/container';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-page-shell',
  imports: [ErpContainer],
  templateUrl: './page-shell.html',
  styleUrl: './page-shell.scss',
})
export class ErpPageShell {}
