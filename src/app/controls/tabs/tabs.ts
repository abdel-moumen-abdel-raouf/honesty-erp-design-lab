import {NgTemplateOutlet} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  ElementRef,
  inject,
  input,
  model,
  output,
  TemplateRef,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpTabTrigger} from './internal/tab-trigger';

export interface ErpTabItem {
  readonly id: string;
  readonly label: string;
  readonly content?: string;
  readonly icon?: ErpIconName;
  readonly headerPresentation?: ErpTabHeaderPresentation;
  readonly disabled?: boolean;
}

export type ErpTabHeaderPresentation = 'text' | 'icon-text' | 'icon-only';
export type ErpTabsOrientation = 'horizontal' | 'vertical';
export type ErpTabsVerticalPlacement = 'start' | 'end';
export type ErpTabsDistribution = 'content' | 'fill';
export type ErpTabsVariant = 'underline' | 'pills';
export type ErpTabsTransition =
  | 'none'
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-start'
  | 'fade-end';

export interface ErpTabPanelContext {
  readonly $implicit: ErpTabItem;
  readonly tab: ErpTabItem;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpTabPanel]',
})
export class ErpTabPanel {
  readonly id = input.required<string>({alias: 'erpTabPanel'});
  readonly template = inject<TemplateRef<ErpTabPanelContext>>(TemplateRef);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-tabs',
  imports: [ErpIcon, ErpTabTrigger, ErpText, NgTemplateOutlet],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss', './tabs-facets.scss', './tabs-motion.scss'],
  host: {
    '[attr.data-tabs-active]': 'resolvedActiveId()',
    '[attr.data-tabs-orientation]': 'orientation()',
    '[attr.data-tabs-vertical-placement]': 'verticalPlacement()',
    '[attr.data-tabs-distribution]': 'distribution()',
    '[attr.data-tabs-variant]': 'variant()',
    '[attr.data-tabs-transition]': 'transition()',
  },
})
export class ErpTabs {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly panelTemplates = contentChildren(ErpTabPanel);

  readonly items = input.required<readonly ErpTabItem[]>();
  readonly activeId = model('');
  readonly changed = output<string>();
  readonly orientation = input<ErpTabsOrientation>('horizontal');
  readonly verticalPlacement = input<ErpTabsVerticalPlacement>('start');
  readonly distribution = input<ErpTabsDistribution>('content');
  readonly variant = input<ErpTabsVariant>('underline');
  readonly transition = input<ErpTabsTransition>('none');

  protected readonly resolvedActiveId = computed(() => {
    const requested = this.activeId();
    const items = this.items();
    return items.some((item) => item.id === requested && !item.disabled)
      ? requested
      : items.find((item) => !item.disabled)?.id ?? '';
  });

  protected activate(item: ErpTabItem): void {
    if (item.disabled) return;
    this.activeId.set(item.id);
    this.changed.emit(item.id);
  }

  protected panelTemplate(id: string): TemplateRef<ErpTabPanelContext> | null {
    return this.panelTemplates().find((panel) => panel.id() === id)?.template ?? null;
  }

  protected panelContext(tab: ErpTabItem): ErpTabPanelContext {
    return {$implicit: tab, tab};
  }

  protected headerPresentation(item: ErpTabItem): ErpTabHeaderPresentation {
    return item.headerPresentation ?? (item.icon ? 'icon-text' : 'text');
  }

  protected keydown(event: KeyboardEvent, index: number): void {
    const horizontal = this.orientation() === 'horizontal';
    const direction = getComputedStyle(this.host.nativeElement).direction;
    const horizontalStep =
      (event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0) *
      (direction === 'rtl' ? -1 : 1);
    const verticalStep = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    const step = horizontal ? horizontalStep : verticalStep;
    if (!step && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const enabled = this.items()
      .map((item, itemIndex) => ({item, itemIndex}))
      .filter(({item}) => !item.disabled);
    const current = enabled.findIndex((entry) => entry.itemIndex === index);
    const target = event.key === 'Home'
      ? enabled[0]
      : event.key === 'End'
        ? enabled.at(-1)
        : enabled[(current + step + enabled.length) % enabled.length];
    if (target) {
      this.activate(target.item);
      this.host.nativeElement
        .querySelectorAll<HTMLButtonElement>('[role="tab"]')[target.itemIndex]
        ?.focus();
    }
  }
}
