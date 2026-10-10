import {TestBed} from '@angular/core/testing';
import {ErpBreadcrumbsShowcase} from './breadcrumbs-showcase';

describe('ErpBreadcrumbsShowcase', () => {
  it('renders one meaningful four-level ERP path with a resolved current item', () => {
    const fixture = TestBed.createComponent(ErpBreadcrumbsShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(host.querySelectorAll('[data-showcase-control]')).toHaveLength(
      fixture.componentInstance.controls.length,
    );
    expect(host.querySelectorAll('[data-showcase-target] li')).toHaveLength(4);
    expect(host.querySelector('[aria-current="page"]')?.textContent).toContain(
      'فاتورة المبيعات 1042',
    );
    expect(host.querySelectorAll('.breadcrumbs__separator')).toHaveLength(3);
  });
});
