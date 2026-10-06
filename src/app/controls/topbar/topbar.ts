import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class ErpTopbar {}
