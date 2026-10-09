import {TestBed} from '@angular/core/testing';
import {ErpSidebar} from './sidebar';

describe('ErpSidebar', () => {
  const items = [
    {
      id: 'finance',
      label: 'المالية',
      icon: 'money' as const,
      children: [
        {id: 'ledger', label: 'الحسابات العامة', href: '/ledger'},
        {id: 'disabled', label: 'تقارير مغلقة', href: '/reports', disabled: true},
      ],
    },
    {id: 'inventory', label: 'المخزون', href: '/inventory', badge: {label: '3'}},
  ];

  it('renders nested active and disabled navigation and emits enabled intents', () => {
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('activeId', 'ledger');
    const activated = vi.fn();
    fixture.componentInstance.navigationActivated.subscribe(activated);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-current="page"]')?.textContent)
      .toContain('الحسابات العامة');
    expect(fixture.nativeElement.querySelector('[aria-disabled="true"]'))
      .not.toBeNull();
    (fixture.nativeElement.querySelector('[aria-disabled="true"]') as HTMLAnchorElement)
      .click();
    expect(activated).not.toHaveBeenCalled();
    const inventoryLink = fixture.nativeElement.querySelector(
      'a[href="/inventory"]',
    ) as HTMLAnchorElement;
    const navigationClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    inventoryLink.dispatchEvent(navigationClick);
    expect(navigationClick.defaultPrevented).toBe(true);
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'inventory'}),
    );
  });

  it('owns disclosure separately from navigation and exposes active ancestor context', () => {
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('activeId', 'ledger');
    fixture.detectChanges();

    const disclosure = fixture.nativeElement.querySelector(
      'erp-sidebar-disclosure button',
    ) as HTMLButtonElement;
    expect(disclosure.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector(
      '[data-sidebar-active-ancestor="true"]',
    )).not.toBeNull();

    fixture.componentRef.setInput('activeId', null);
    fixture.detectChanges();
    disclosure.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expandedIds()).toEqual(['finance']);
  });

  it('moves focus vertically across disclosure and enabled destinations', () => {
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('expandedIds', ['finance']);
    fixture.detectChanges();
    const controls = fixture.nativeElement.querySelectorAll(
      '[data-sidebar-interactive]:not([disabled]):not([aria-disabled="true"])',
    );
    controls[0].focus();
    controls[0].dispatchEvent(new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
    }));
    expect(document.activeElement).toBe(controls[1]);
  });

  it('inherits RTL direction without owning a local direction contract', () => {
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', items);
    fixture.nativeElement.dir = 'rtl';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('nav').dir).toBe('');
    expect(fixture.nativeElement.querySelector('[data-sidebar-level="1"]'))
      .not.toBeNull();
  });

  it('keeps destinations reachable when a collapsed group is activated', () => {
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('collapsed', true);
    fixture.detectChanges();

    const disclosure = fixture.nativeElement.querySelector(
      'erp-sidebar-disclosure button',
    ) as HTMLButtonElement;
    disclosure.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.collapsed()).toBe(false);
    expect(fixture.componentInstance.expandedIds()).toContain('finance');
    expect(fixture.nativeElement.querySelector('a[href="/ledger"]')).not.toBeNull();
  });

  it('skips cyclic navigation data without duplicating entries', () => {
    const cyclic: {id: string; label: string; children?: readonly unknown[]} = {
      id: 'cycle',
      label: 'دورة غير صالحة',
    };
    cyclic.children = [cyclic];
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', [cyclic]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[data-sidebar-level]').length)
      .toBe(1);
  });
});
