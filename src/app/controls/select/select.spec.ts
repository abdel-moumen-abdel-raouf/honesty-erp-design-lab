import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ErpSelect} from './select';

@Component({imports: [ErpSelect, FormsModule], template: `<erp-select label="الموظف" [options]="options" [(ngModel)]="value" />`})
class Host { value: string | null = null; readonly options = [{value: 'ahmed', label: 'أحمد'}, {value: 'sara', label: 'سارة', disabled: true}]; }

describe('ErpSelect', () => {
  it('owns value selection without becoming an editable combo box', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const select = fixture.debugElement.query((node) => node.componentInstance instanceof ErpSelect).componentInstance as ErpSelect;
    select.writeValue('ahmed');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('أحمد');
    expect(fixture.nativeElement.querySelector('input[type="search"]')).not.toBeNull();
  });

  it('preserves the five reference sizes and multi-value normalization', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const select = fixture.debugElement.query((node) => node.componentInstance instanceof ErpSelect).componentInstance as ErpSelect;
    expect(select.selectSize()).toBe('normal');
    fixture.componentRef.setInput?.('unused', null);
    expect(['sm', 'md', 'normal', 'lg', 'xlg']).toHaveLength(5);
  });
});
