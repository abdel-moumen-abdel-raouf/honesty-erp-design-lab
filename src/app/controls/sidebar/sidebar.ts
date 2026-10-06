import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpNavigationItem} from '../shell-family/shell-contracts';

interface ErpVisibleNavigationEntry {
  readonly item: ErpNavigationItem;
  readonly level: number;
  readonly group: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-sidebar',
  imports: [ErpIcon, ErpStatusBadge, ErpText],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {'[attr.data-sidebar-active]': 'activeId()'},
})
export class ErpSidebar {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly items = input.required<readonly ErpNavigationItem[]>();
  readonly activeId = input<string | null>(null);
  readonly label = input('التنقل الرئيسي');
  readonly navigationActivated = output<ErpNavigationItem>();

  protected readonly entries = computed(() =>
    this.flatten(this.items(), 0, new Set<string>()),
  );

  protected activate(item: ErpNavigationItem, event: MouseEvent): void {
    if (item.disabled || item.children?.length) {
      event.preventDefault();
      return;
    }

    this.navigationActivated.emit(item);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    const links = [
      ...this.host.nativeElement.querySelectorAll<HTMLAnchorElement>(
        'a[data-sidebar-link]:not([aria-disabled="true"])',
      ),
    ];

    if (links.length === 0) {
      return;
    }

    const current = Math.max(
      0,
      links.indexOf(document.activeElement as HTMLAnchorElement),
    );
    let target: HTMLAnchorElement | undefined;

    if (event.key === 'ArrowDown') {
      target = links[(current + 1) % links.length];
    } else if (event.key === 'ArrowUp') {
      target = links[(current - 1 + links.length) % links.length];
    } else if (event.key === 'Home') {
      target = links[0];
    } else if (event.key === 'End') {
      target = links.at(-1);
    }

    if (target) {
      event.preventDefault();
      target.focus();
    }
  }

  private flatten(
    items: readonly ErpNavigationItem[],
    level: number,
    ancestors: ReadonlySet<string>,
  ): readonly ErpVisibleNavigationEntry[] {
    const entries: ErpVisibleNavigationEntry[] = [];

    for (const item of items) {
      if (ancestors.has(item.id)) {
        continue;
      }

      const children = item.children ?? [];
      entries.push({item, level, group: children.length > 0});

      if (children.length > 0) {
        entries.push(
          ...this.flatten(
            children,
            level + 1,
            new Set([...ancestors, item.id]),
          ),
        );
      }
    }

    return entries;
  }
}
