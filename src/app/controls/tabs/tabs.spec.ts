import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {
  ErpTabItem,
  ErpTabPanel,
  ErpTabs,
  ErpTabsTransition,
  ErpTabsVariant,
} from './tabs';

const items: readonly ErpTabItem[] = [
  {id: 'one', label: 'الأول', content: 'محتوى أول'},
  {id: 'two', label: 'الثاني', content: 'محتوى ثان', disabled: true},
  {id: 'three', label: 'الثالث'},
];

const enabledItems: readonly ErpTabItem[] = [
  {id: 'alpha', label: 'ألف', content: 'محتوى ألف'},
  {id: 'beta', label: 'باء', content: 'محتوى باء'},
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStatusBadge, ErpTabPanel, ErpTabs],
  template: `
    <erp-tabs [items]="items" activeId="three">
      <ng-template erpTabPanel="three" let-tab="tab">
        <erp-status-badge [label]="tab.label + ' غني'" tone="success" />
      </ng-template>
    </erp-tabs>
  `,
})
class TabsHost { readonly items = items; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpTabs],
  template: `
    <erp-tabs data-first [items]="items" [lazy]="false" />
    <erp-tabs data-second [items]="items" [lazy]="false" />
  `,
})
class MultipleTabsHost { readonly items = enabledItems; }

describe('ErpTabs', () => {
  it('selects the first enabled tab, blocks disabled activation, and renders one panel', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
    (buttons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
    expect(fixture.nativeElement.querySelectorAll('[role="tabpanel"]')).toHaveLength(1);
  });

  it('renders keyed rich projected panels without reducing content to strings', () => {
    const fixture = TestBed.createComponent(TabsHost);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel.textContent).toContain('الثالث غني');
    expect(panel.querySelector('erp-status-badge')).not.toBeNull();
  });

  it('uses automatic orientation-aware keyboard activation in LTR and RTL', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    fixture.nativeElement.style.direction = 'ltr';
    fixture.detectChanges();
    let buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-tabs-active')).toBe('three');

    fixture.nativeElement.style.direction = 'rtl';
    buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[2].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-tabs-active')).toBe('one');

    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}));
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-tabs-active')).toBe('three');
  });

  it('supports Home/End and emits both controlled id and activated item', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    const changed = vi.fn();
    const tabClick = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);
    fixture.componentInstance.tabClick.subscribe(tabClick);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'End', bubbles: true}));
    buttons[2].dispatchEvent(new KeyboardEvent('keydown', {key: 'Home', bubbles: true}));
    expect(changed.mock.calls.map(([id]) => id)).toEqual(['three', 'one']);
    expect(tabClick.mock.calls.map(([item]) => item.id)).toEqual(['three', 'one']);
  });

  it('implements every reference variant and preserves the isolated legacy pills alias', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', enabledItems);
    for (const variant of ['underline', 'pill', 'solid', 'ghost'] satisfies ErpTabsVariant[]) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-tabs-variant')).toBe(variant);
    }
    fixture.componentRef.setInput('variant', 'pills');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-tabs-variant')).toBe('pills');
  });

  it('renders text, icon-text, accessible icon-only, image, image-text, and count anatomy', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', [
      {id: 'text', label: 'نصي', headerPresentation: 'text'},
      {id: 'icon-text', label: 'أيقونة ونص', icon: 'dashboard', headerPresentation: 'icon-text'},
      {id: 'icon', label: 'أيقونة فقط', icon: 'history', headerPresentation: 'icon'},
      {id: 'image', label: 'صورة فقط', imageUrl: '/assets/honesty-erp-avatars/users/male/avatar-01.png', headerPresentation: 'image'},
      {id: 'image-text', label: 'صورة ونص', imageUrl: '/assets/honesty-erp-avatars/users/female/avatar-21.png', headerPresentation: 'image-text', count: 7},
    ] satisfies readonly ErpTabItem[]);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(buttons[0].querySelector('.tabs__label')?.textContent).toContain('نصي');
    expect(buttons[1].querySelector('erp-icon')).not.toBeNull();
    expect(buttons[2].querySelector('.tabs__label')).toBeNull();
    expect(buttons[2].getAttribute('aria-label')).toBe('أيقونة فقط');
    expect(buttons[3].querySelector('erp-avatar')).not.toBeNull();
    expect(buttons[3].querySelector('.tabs__label')).toBeNull();
    expect(buttons[4].querySelector('erp-avatar')).not.toBeNull();
    expect(buttons[4].querySelector('.tabs__label')?.textContent).toContain('صورة ونص');
    expect(buttons[4].querySelector('.tabs__count')?.textContent).toContain('7');
  });

  it('uses the literal reference text-only default and explicit component presentation modes', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', [
      {id: 'home', label: 'Home', icon: 'home'},
      {id: 'team', label: 'Team', imageTone: 'brand'},
    ] satisfies readonly ErpTabItem[]);
    fixture.detectChanges();

    let tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(fixture.nativeElement.getAttribute('data-tabs-header-presentation')).toBe('text');
    expect(tabs[0].querySelector('erp-icon')).toBeNull();
    expect(tabs[1].querySelector('erp-avatar')).toBeNull();

    fixture.componentRef.setInput('headerPresentation', 'icon-text');
    fixture.detectChanges();
    tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(tabs[0].querySelector('erp-icon')).not.toBeNull();

    fixture.componentRef.setInput('headerPresentation', 'image-text');
    fixture.detectChanges();
    tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    const embeddedAvatar = tabs[1].querySelector('erp-avatar');
    expect(embeddedAvatar).not.toBeNull();
    expect(embeddedAvatar.getAttribute('data-avatar-bordered')).toBe('false');
  });

  it('supports reference transitions and retains bounded compatibility transitions', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', enabledItems);
    const transitions: readonly ErpTabsTransition[] = [
      'slide', 'fade', 'scale', 'none',
      'fade-up', 'fade-down', 'fade-start', 'fade-end',
    ];
    for (const transition of transitions) {
      fixture.componentRef.setInput('transition', transition);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[role="tabpanel"]')
        .getAttribute('data-tabs-panel-transition')).toBe(transition);
    }
  });

  it('keeps count and panel-less compatibility without dangling aria-controls', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', [
      {id: 'male', label: 'ذكر', icon: 'male', count: 20},
      {id: 'female', label: 'أنثى', icon: 'female', count: 20},
    ] satisfies readonly ErpTabItem[]);
    fixture.componentRef.setInput('renderPanels', false);
    fixture.detectChanges();

    const tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(tabs).toHaveLength(2);
    expect([...tabs].every((tab) => !tab.hasAttribute('aria-controls'))).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.tabs__count')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('[role="tabpanel"]')).toBeNull();
  });

  it('does not expose aria-controls until a lazy panel is mounted', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', enabledItems);
    fixture.detectChanges();
    let tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(tabs[0].hasAttribute('aria-controls')).toBe(true);
    expect(tabs[1].hasAttribute('aria-controls')).toBe(false);

    (tabs[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(tabs[0].hasAttribute('aria-controls')).toBe(true);
    expect(tabs[1].hasAttribute('aria-controls')).toBe(true);
  });

  it('provides collision-free tab/panel ids for multiple component instances', () => {
    const fixture = TestBed.createComponent(MultipleTabsHost);
    fixture.detectChanges();
    const ids = [...fixture.nativeElement.querySelectorAll('[role="tab"], [role="tabpanel"]')]
      .map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tab of fixture.nativeElement.querySelectorAll('[role="tab"]')) {
      const panelId = tab.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
      expect(fixture.nativeElement.querySelector(`#${panelId}`)).not.toBeNull();
    }
  });

  it('mounts panels lazily, preserves activated panels, and can opt out of keep-alive', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', enabledItems);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="tabpanel"]')).toHaveLength(1);

    (fixture.nativeElement.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="tabpanel"]')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('[role="tabpanel"]:not([hidden])')).toHaveLength(1);

    fixture.componentRef.setInput('keepAlive', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="tabpanel"]')).toHaveLength(1);
  });

  it('supports vertical placement, content/fill distribution, and compatibility shapes', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', enabledItems);
    fixture.componentRef.setInput('distribution', 'fill');
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('verticalPlacement', 'end');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-tabs-distribution')).toBe('fill');
    expect(fixture.nativeElement.getAttribute('data-tabs-orientation')).toBe('vertical');
    expect(fixture.nativeElement.getAttribute('data-tabs-vertical-placement')).toBe('end');

    for (const shape of ['reference', 'rectangle', 'rounded', 'circle'] as const) {
      fixture.componentRef.setInput('headerShape', shape);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-tabs-header-shape')).toBe(shape);
    }
  });
});
