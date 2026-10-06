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
    (fixture.nativeElement.querySelector('a[href="/inventory"]') as HTMLAnchorElement)
      .click();
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'inventory'}),
    );
  });

  it('moves focus vertically across enabled links', () => {
    const fixture = TestBed.createComponent(ErpSidebar);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a:not([aria-disabled="true"])');
    links[0].focus();
    links[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}));
    expect(document.activeElement).toBe(links[1]);
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
});
