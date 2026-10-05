import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpTextBox} from '../text-box/text-box';
import {ErpFilterBar} from './filter-bar';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, imports: [ErpFilterBar, ErpTextBox], template: `<erp-filter-bar [filters]="filters"><erp-text-box label="الحساب" /></erp-filter-bar>`})
class FilterBarHost { readonly filters = [{key:'account',label:'الحساب',value:'النقدية'}]; }

describe('ErpFilterBar', () => {
  it('projects ERP fields and renders active criteria without owning parsing', () => {
    const fixture = TestBed.createComponent(FilterBarHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-text-box')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('الحساب: النقدية');
  });

  it('emits remove, reset, and apply intents', () => {
    const fixture = TestBed.createComponent(ErpFilterBar);
    fixture.componentRef.setInput('filters', [{key:'status',label:'الحالة',value:'نشط'}]);
    const removed=vi.fn(), reset=vi.fn(), apply=vi.fn();
    fixture.componentInstance.filterRemoved.subscribe(removed);
    fixture.componentInstance.resetRequested.subscribe(reset);
    fixture.componentInstance.applyRequested.subscribe(apply);
    fixture.detectChanges();
    const buttons=[...fixture.nativeElement.querySelectorAll('erp-button button')] as HTMLButtonElement[];
    buttons.forEach((button)=>button.click());
    expect(removed).toHaveBeenCalledWith('status');
    expect(reset).toHaveBeenCalledOnce();
    expect(apply).toHaveBeenCalledOnce();
  });
});
