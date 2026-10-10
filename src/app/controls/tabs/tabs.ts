import {NgTemplateOutlet} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpAvatar, ErpAvatarTone} from '../avatar/avatar';
import {ErpTabTrigger} from './internal/tab-trigger';

let nextTabsInstanceId = 0;

export interface ErpTabItem {
  readonly id: string;
  readonly label: string;
  readonly content?: string;
  readonly icon?: ErpIconName;
  readonly imageUrl?: string;
  readonly imageTone?: ErpAvatarTone;
  readonly count?: number | string | null;
  readonly headerPresentation?: ErpTabHeaderPresentation;
  readonly disabled?: boolean;
}

export type ErpTabHeaderPresentation =
  | 'text'
  | 'icon'
  | 'icon-text'
  | 'icon-only'
  | 'image'
  | 'image-text';
export type ErpTabsOrientation = 'horizontal' | 'vertical';
export type ErpTabsVerticalPlacement = 'start' | 'end';
export type ErpTabsDistribution = 'content' | 'fill';
export type ErpTabsVariant = 'underline' | 'pill' | 'solid' | 'ghost' | 'pills';
export type ErpTabsPresentation = 'default' | 'avatar-picker';
export type ErpTabHeaderShape = 'reference' | 'rectangle' | 'rounded' | 'circle';
export type ErpTabsTransition =
  | 'slide'
  | 'fade'
  | 'scale'
  | 'none'
  | 'fade-up'
  | 'fade-down'
  | 'fade-start'
  | 'fade-end';

export interface ErpTabPanelContext {
  readonly $implicit: ErpTabItem;
  readonly tab: ErpTabItem;
}

interface ErpTabsIndicatorGeometry {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
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
  imports: [ErpAvatar, ErpIcon, ErpTabTrigger, ErpText, NgTemplateOutlet],
  templateUrl: './tabs.html',
  styleUrls: [
    './tabs-token-contract.scss',
    './tabs.scss',
    './tabs-indicator-panel.scss',
    './tabs-facets.scss',
    './tabs-presentations.scss',
    './tabs-responsive.scss',
    './tabs-motion.scss',
  ],
  host: {
    '[attr.data-tabs-active]': 'resolvedActiveId()',
    '[attr.data-tabs-orientation]': 'orientation()',
    '[attr.data-tabs-vertical-placement]': 'verticalPlacement()',
    '[attr.data-tabs-distribution]': 'distribution()',
    '[attr.data-tabs-variant]': 'variant()',
    '[attr.data-tabs-transition]': 'transition()',
    '[attr.data-tabs-header-presentation]': 'headerPresentation()',
    '[attr.data-tabs-header-shape]': 'headerShape()',
    '[attr.data-tabs-render-panels]': 'renderPanels()',
    '[attr.data-tabs-presentation]': 'presentation()',
  },
})
export class ErpTabs implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly panelTemplates = contentChildren(ErpTabPanel);
  private readonly tablist = viewChild<ElementRef<HTMLElement>>('tablist');
  private readonly instanceId = `erp-tabs-${++nextTabsInstanceId}`;
  private readonly mountedIds = signal<ReadonlySet<string>>(new Set());
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private indicatorFrame: number | null = null;
  private pendingScrollIntoView = false;

  readonly items = input.required<readonly ErpTabItem[]>();
  readonly activeId = model('');
  readonly changed = output<string>();
  readonly tabClick = output<ErpTabItem>();
  readonly orientation = input<ErpTabsOrientation>('horizontal');
  readonly verticalPlacement = input<ErpTabsVerticalPlacement>('start');
  readonly distribution = input<ErpTabsDistribution>('content');
  readonly variant = input<ErpTabsVariant>('underline');
  readonly transition = input<ErpTabsTransition>('slide');
  readonly headerPresentation = input<ErpTabHeaderPresentation>('text');
  readonly headerShape = input<ErpTabHeaderShape>('reference');
  readonly presentation = input<ErpTabsPresentation>('default');
  readonly renderPanels = input(true);
  readonly lazy = input(true);
  readonly keepAlive = input(true);

  protected readonly indicator = signal<ErpTabsIndicatorGeometry>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  protected readonly resolvedActiveId = computed(() => {
    const requested = this.activeId();
    const items = this.items();
    return items.some((item) => item.id === requested && !item.disabled)
      ? requested
      : items.find((item) => !item.disabled)?.id ?? '';
  });

  constructor() {
    effect(() => {
      this.resolvedActiveId();
      this.items();
      this.orientation();
      this.distribution();
      this.variant();
      this.scheduleIndicatorUpdate();
    });
  }

  ngAfterViewInit(): void {
    const list = this.tablist()?.nativeElement;
    if (list && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateIndicator());
      this.resizeObserver.observe(this.host.nativeElement);
    }
    if (list && typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => this.scheduleIndicatorUpdate());
      this.mutationObserver.observe(list, {
        attributeFilter: ['aria-selected'],
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
    this.scheduleIndicatorUpdate();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    if (this.indicatorFrame !== null && this.indicatorFrame >= 0) {
      cancelAnimationFrame(this.indicatorFrame);
    }
  }

  protected activate(item: ErpTabItem): void {
    if (item.disabled || item.id === this.resolvedActiveId()) return;
    this.rememberMounted(this.resolvedActiveId());
    this.rememberMounted(item.id);
    this.activeId.set(item.id);
    this.changed.emit(item.id);
    this.tabClick.emit(item);
    this.scheduleIndicatorUpdate(true);
  }

  protected isActive(item: ErpTabItem): boolean {
    return this.resolvedActiveId() === item.id;
  }

  protected shouldRenderPanel(item: ErpTabItem): boolean {
    if (this.isActive(item)) return true;
    if (!this.keepAlive()) return false;
    if (!this.lazy()) return true;
    return this.mountedIds().has(item.id);
  }

  protected panelTemplate(id: string): TemplateRef<ErpTabPanelContext> | null {
    return this.panelTemplates().find((panel) => panel.id() === id)?.template ?? null;
  }

  protected panelContext(tab: ErpTabItem): ErpTabPanelContext {
    return {$implicit: tab, tab};
  }

  protected resolvedHeaderPresentation(item: ErpTabItem): ErpTabHeaderPresentation {
    return item.headerPresentation ?? this.headerPresentation();
  }

  protected showsIcon(item: ErpTabItem): boolean {
    const presentation = this.resolvedHeaderPresentation(item);
    return !!item.icon &&
      (presentation === 'icon' || presentation === 'icon-only' || presentation === 'icon-text');
  }

  protected showsImage(item: ErpTabItem): boolean {
    const presentation = this.resolvedHeaderPresentation(item);
    return presentation === 'image' || presentation === 'image-text';
  }

  protected showsLabel(item: ErpTabItem): boolean {
    const presentation = this.resolvedHeaderPresentation(item);
    return presentation !== 'icon' && presentation !== 'icon-only' && presentation !== 'image';
  }

  protected tabDomId(index: number): string {
    return `${this.instanceId}-tab-${index}`;
  }

  protected panelDomId(index: number): string {
    return `${this.instanceId}-panel-${index}`;
  }

  protected controlsId(index: number, item: ErpTabItem): string | null {
    return this.renderPanels() && this.shouldRenderPanel(item) ? this.panelDomId(index) : null;
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

    const enabled = this.items()
      .map((item, itemIndex) => ({item, itemIndex}))
      .filter(({item}) => !item.disabled);
    if (enabled.length === 0) return;

    event.preventDefault();
    const current = enabled.findIndex((entry) => entry.itemIndex === index);
    const target = event.key === 'Home'
      ? enabled[0]
      : event.key === 'End'
        ? enabled.at(-1)
        : enabled[(current + step + enabled.length) % enabled.length];
    if (!target) return;

    this.activate(target.item);
    queueMicrotask(() => {
      this.host.nativeElement
        .querySelectorAll<HTMLButtonElement>('[role="tab"]')[target.itemIndex]
        ?.focus();
    });
  }

  private rememberMounted(id: string): void {
    if (!id || this.mountedIds().has(id)) return;
    this.mountedIds.update((current) => new Set([...current, id]));
  }

  private scheduleIndicatorUpdate(scrollIntoView = false): void {
    this.pendingScrollIntoView ||= scrollIntoView;
    if (this.indicatorFrame !== null && this.indicatorFrame >= 0) {
      cancelAnimationFrame(this.indicatorFrame);
    }

    const update = (): void => {
      const shouldScroll = this.pendingScrollIntoView;
      this.pendingScrollIntoView = false;
      this.indicatorFrame = null;
      this.updateIndicator();
      if (shouldScroll) {
        this.activeTrigger()?.scrollIntoView?.({block: 'nearest', inline: 'nearest'});
      }
    };

    if (typeof requestAnimationFrame === 'function') {
      this.indicatorFrame = requestAnimationFrame(update);
    } else {
      this.indicatorFrame = -1;
      queueMicrotask(update);
    }
  }

  private activeTrigger(): HTMLElement | null {
    const id = this.resolvedActiveId();
    return [...(this.tablist()?.nativeElement.querySelectorAll<HTMLElement>('erp-tab-trigger') ?? [])]
      .find((trigger) => trigger.getAttribute('data-tabs-tab-id') === id) ?? null;
  }

  private updateIndicator(): void {
    const list = this.tablist()?.nativeElement;
    const active = this.activeTrigger();
    if (!list || !active) return;
    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    this.indicator.set({
      left: activeRect.left - listRect.left + list.scrollLeft,
      top: activeRect.top - listRect.top + list.scrollTop,
      width: activeRect.width,
      height: activeRect.height,
    });
  }
}
