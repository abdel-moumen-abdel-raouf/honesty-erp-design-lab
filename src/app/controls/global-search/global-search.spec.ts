import {By} from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';
import {ErpSearchBox} from '../search-box/search-box';
import {ErpGlobalSearch} from './global-search';

describe('ErpGlobalSearch', () => {
  it('reuses SearchBox dropdown mode and emits selected result intent', () => {
    const fixture = TestBed.createComponent(ErpGlobalSearch);
    fixture.componentRef.setInput('results', [
      {id: 'invoice-1', label: 'فاتورة 1001', category: 'المبيعات'},
    ]);
    const activated = vi.fn();
    fixture.componentInstance.resultActivated.subscribe(activated);
    fixture.detectChanges();

    const search = fixture.debugElement.query(By.directive(ErpSearchBox));
    expect(search.componentInstance.mode()).toBe('dropdown');
    expect(search.componentInstance.labelMode()).toBe('visually-hidden');
    expect(search.componentInstance.items()[0].label).toContain('المبيعات');
    expect(search.componentInstance.items()[0].description).toBeUndefined();
    search.triggerEventHandler('ngModelChange', 'invoice-1');
    expect(fixture.componentInstance.query()).toBe('invoice-1');
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'invoice-1'}),
    );

    fixture.componentRef.setInput('results', [
      {id: 'blocked', label: 'نتيجة معطلة', disabled: true},
    ]);
    fixture.detectChanges();
    activated.mockClear();
    search.triggerEventHandler('ngModelChange', 'blocked');
    expect(activated).not.toHaveBeenCalled();
  });

  it('preserves descriptions and mixed-direction labels for the shared SearchBox owner', () => {
    const fixture = TestBed.createComponent(ErpGlobalSearch);
    fixture.componentRef.setInput('results', [
      {
        id: 'supplier-27',
        label: 'مورد Northwind Trading International',
        category: 'الموردون',
        description: 'القاهرة — حساب نشط',
        icon: 'building',
      },
    ]);
    fixture.detectChanges();

    const search = fixture.debugElement.query(By.directive(ErpSearchBox));
    expect(search.componentInstance.items()[0]).toEqual(expect.objectContaining({
      value: 'supplier-27',
      label: 'الموردون — مورد Northwind Trading International',
      description: 'القاهرة — حساب نشط',
      icon: 'building',
    }));
  });
});
