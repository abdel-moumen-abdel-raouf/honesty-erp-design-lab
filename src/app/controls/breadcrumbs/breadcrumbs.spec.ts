import {TestBed} from '@angular/core/testing';
import {ErpBreadcrumbs} from './breadcrumbs';

describe('ErpBreadcrumbs', () => {
  it('marks the resolved current item and emits only actionable ancestors', () => {
    const fixture = TestBed.createComponent(ErpBreadcrumbs);
    fixture.componentRef.setInput('items', [
      {id: 'home', label: 'الرئيسية', href: '/home', icon: 'home'},
      {id: 'sales', label: 'المبيعات'},
    ]);
    const activated = vi.fn();
    fixture.componentInstance.activated.subscribe(activated);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-current="page"]')?.textContent)
      .toContain('المبيعات');
    (fixture.nativeElement.querySelector('a') as HTMLAnchorElement).click();
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'home'}),
    );
    expect(fixture.nativeElement.querySelector('nav')).not.toBeNull();
  });

  it('keeps logical separators and link hrefs under inherited RTL direction', () => {
    const fixture = TestBed.createComponent(ErpBreadcrumbs);
    fixture.componentRef.setInput('items', [
      {id: 'home', label: 'الرئيسية', href: '/home'},
      {id: 'sales', label: 'المبيعات', href: '/sales'},
      {id: 'invoice', label: 'الفاتورة'},
    ]);
    fixture.nativeElement.dir = 'rtl';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('nav').dir).toBe('');
    expect(fixture.nativeElement.querySelector('a')?.getAttribute('href')).toBe(
      '/home',
    );
    expect(
      fixture.nativeElement.querySelectorAll(
        'erp-icon.breadcrumbs__separator',
      ).length,
    ).toBe(2);
  });
});
