import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpTabItem, ErpTabPanel, ErpTabs} from './tabs';

const items: readonly ErpTabItem[] = [
  {id: 'one', label: 'الأول', content: 'محتوى أول'},
  {id: 'two', label: 'الثاني', content: 'محتوى ثان', disabled: true},
  {id: 'three', label: 'الثالث'},
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

describe('ErpTabs', () => {
  it('keeps one active tab and skips disabled activation', () => {
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

  it('renders rich projected panel content instead of requiring a string', () => {
    const fixture = TestBed.createComponent(TabsHost);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');
    expect(panel.textContent).toContain('الثالث غني');
    expect(panel.querySelector('erp-status-badge')).not.toBeNull();
  });

  it('moves focus and activation logically in LTR and RTL while skipping disabled tabs', () => {
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
  });

  it('supports Home and End and emits the chosen id', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    const spy = vi.fn();
    fixture.componentInstance.changed.subscribe(spy);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'End', bubbles: true}));
    buttons[2].dispatchEvent(new KeyboardEvent('keydown', {key: 'Home', bubbles: true}));
    expect(spy.mock.calls.map(([id]) => id)).toEqual(['three', 'one']);
  });

  it('exposes underline/pills, content/fill, vertical placement, and panel transitions', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('variant', 'pills');
    fixture.componentRef.setInput('distribution', 'fill');
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('verticalPlacement', 'end');
    fixture.componentRef.setInput('transition', 'fade-end');
    fixture.componentRef.setInput('headerShape', 'rectangle');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-tabs-variant')).toBe('pills');
    expect(fixture.nativeElement.getAttribute('data-tabs-distribution')).toBe('fill');
    expect(fixture.nativeElement.getAttribute('data-tabs-orientation')).toBe('vertical');
    expect(fixture.nativeElement.getAttribute('data-tabs-vertical-placement')).toBe('end');
    expect(fixture.nativeElement.querySelector('[role="tabpanel"]').getAttribute('data-tabs-panel-transition')).toBe('fade-end');
    expect(fixture.nativeElement.getAttribute('data-tabs-header-shape')).toBe('rectangle');
  });

  it('supports rectangle, rounded, and circle header boundaries', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    for (const shape of ['rectangle', 'rounded', 'circle'] as const) {
      fixture.componentRef.setInput('headerShape', shape);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-tabs-header-shape')).toBe(shape);
    }
  });

  it('uses Up/Down navigation for vertical tabs', () => {
    const fixture = TestBed.createComponent(ErpTabs);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="tab"]');
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}));
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-tabs-active')).toBe('three');
  });
});
