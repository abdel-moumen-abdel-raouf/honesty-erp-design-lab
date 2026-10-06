import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpBreadcrumbItem} from '../shell-family/shell-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-breadcrumbs',
  imports: [ErpIcon, ErpText],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
  host: {'[attr.data-breadcrumb-current]': 'resolvedCurrentId()'},
})
export class ErpBreadcrumbs {
  readonly items = input.required<readonly ErpBreadcrumbItem[]>();
  readonly currentId = input<string | null>(null);
  readonly label = input('مسار الصفحة');
  readonly activated = output<ErpBreadcrumbItem>();

  protected readonly resolvedCurrentId = computed(() => {
    const items = this.items();
    const requested = this.currentId();

    if (requested && items.some((item) => item.id === requested)) {
      return requested;
    }

    return items.at(-1)?.id ?? '';
  });

  protected activate(item: ErpBreadcrumbItem): void {
    if (item.id !== this.resolvedCurrentId()) {
      this.activated.emit(item);
    }
  }
}
