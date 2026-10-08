import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- internal ERP presentation owner.
  selector: 'erp-user-menu-arrow',
  templateUrl: './user-menu-arrow.html',
  styleUrl: './user-menu-arrow.scss',
  host: {'aria-hidden': 'true'},
})
export class ErpUserMenuArrow {}
