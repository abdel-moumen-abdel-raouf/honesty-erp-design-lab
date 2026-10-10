import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-page-shell',
  templateUrl: './page-shell.html',
  styleUrl: './page-shell.scss',
  host: {
    '[attr.data-page-shell-side-visible]': 'sideVisible()',
    '[attr.data-page-shell-footer-visible]': 'footerVisible()',
  },
})
export class ErpPageShell {
  readonly sideVisible = input(true, {transform: booleanAttribute});
  readonly footerVisible = input(true, {transform: booleanAttribute});
}
