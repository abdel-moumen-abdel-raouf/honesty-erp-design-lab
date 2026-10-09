import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpTooltip} from '../tooltip/tooltip';
import {ErpText} from '../../primitives/text/text';
import {ErpNavigationItem} from '../shell-family/shell-contracts';
import {ErpSidebarDisclosure} from './internal/sidebar-disclosure';
import {ErpSidebarLink} from './internal/sidebar-link';

interface ErpVisibleNavigationEntry {
  readonly item: ErpNavigationItem;
  readonly level: number;
  readonly group: boolean;
  readonly visible: boolean;
  readonly activeAncestor: boolean;
}

let nextSidebarId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-sidebar',
  imports: [
    ErpIconButton,
    ErpSidebarDisclosure,
    ErpSidebarLink,
    ErpText,
    ErpTooltip,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[attr.data-sidebar-active]': 'activeId()',
    '[attr.data-sidebar-collapsed]': 'collapsed()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ErpSidebar {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly instanceId = `honesty-sidebar-${++nextSidebarId}`;

  readonly items = input.required<readonly ErpNavigationItem[]>();
  readonly activeId = input<string | null>(null);
  readonly label = input('التنقل الرئيسي');
  readonly collapseLabel = input('تبديل عرض الشريط الجانبي');
  readonly collapsed = model(false);
  readonly expandedIds = model<readonly string[]>([]);
  readonly navigationActivated = output<ErpNavigationItem>();

  private readonly activeAncestorIds = computed(() => {
    const ids = new Set<string>();
    this.collectActiveAncestors(this.items(), this.activeId(), ids, new Set<string>());
    return ids;
  });

  private readonly effectiveExpandedIds = computed(() => new Set([
    ...this.expandedIds(),
    ...this.activeAncestorIds(),
  ]));

  protected readonly entries = computed(() => {
    const expanded = this.effectiveExpandedIds();
    return this.flatten(this.items(), 0, true, expanded, new Set<string>());
  });

  protected activate(item: ErpNavigationItem): void {
    this.navigationActivated.emit(item);
  }

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
  }

  protected toggleGroup(item: ErpNavigationItem): void {
    if (item.disabled) {
      return;
    }

    const next = new Set(this.expandedIds());
    if (next.has(item.id)) {
      next.delete(item.id);
    } else {
      next.add(item.id);
    }
    this.expandedIds.set([...next]);

    if (this.collapsed()) {
      this.collapsed.set(false);
    }
  }

  protected isExpanded(itemId: string): boolean {
    return this.effectiveExpandedIds().has(itemId);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    const links = [
      ...this.host.nativeElement.querySelectorAll<HTMLElement>(
        '[data-sidebar-interactive]:not([disabled]):not([aria-disabled="true"])',
      ),
    ];

    if (links.length === 0) {
      return;
    }

    const current = Math.max(
      0,
      links.indexOf(document.activeElement as HTMLElement),
    );
    let target: HTMLElement | undefined;

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
    parentVisible: boolean,
    expanded: ReadonlySet<string>,
    ancestors: ReadonlySet<string>,
  ): readonly ErpVisibleNavigationEntry[] {
    const entries: ErpVisibleNavigationEntry[] = [];

    for (const item of items) {
      if (ancestors.has(item.id)) {
        continue;
      }

      const children = item.children ?? [];
      const group = children.length > 0;
      entries.push({
        item,
        level,
        group,
        visible: parentVisible,
        activeAncestor: this.activeAncestorIds().has(item.id),
      });

      if (group) {
        entries.push(
          ...this.flatten(
            children,
            level + 1,
            parentVisible && expanded.has(item.id),
            expanded,
            new Set([...ancestors, item.id]),
          ),
        );
      }
    }

    return entries;
  }

  private collectActiveAncestors(
    items: readonly ErpNavigationItem[],
    activeId: string | null,
    result: Set<string>,
    ancestors: ReadonlySet<string>,
  ): boolean {
    if (!activeId) {
      return false;
    }

    for (const item of items) {
      if (ancestors.has(item.id)) {
        continue;
      }

      if (item.id === activeId) {
        return true;
      }

      const children = item.children ?? [];
      if (children.length > 0 && this.collectActiveAncestors(
        children,
        activeId,
        result,
        new Set([...ancestors, item.id]),
      )) {
        result.add(item.id);
        return true;
      }
    }

    return false;
  }
}
