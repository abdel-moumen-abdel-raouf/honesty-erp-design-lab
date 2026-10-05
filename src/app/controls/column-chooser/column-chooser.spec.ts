import {TestBed} from '@angular/core/testing';
import {ErpColumnChooser} from './column-chooser';

describe('ErpColumnChooser', () => {
  const columns = [
    {key: 'name', label: 'الاسم', required: true},
    {key: 'status', label: 'الحالة'},
  ] as const;

  it('keeps required columns visible and emits normalized visibility intent', () => {
    const fixture = TestBed.createComponent(ErpColumnChooser);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('visibleKeys', ['status']);
    const spy = vi.fn();
    fixture.componentInstance.visibilityChange.subscribe(spy);
    fixture.detectChanges();
    const component = fixture.componentInstance as unknown as {updateVisible(value: readonly string[]): void};
    component.updateVisible([]);
    expect(spy).toHaveBeenCalledWith(['name']);
  });

  it('uses ErpSelect and exposes reset intent without native select authoring', () => {
    const fixture = TestBed.createComponent(ErpColumnChooser);
    fixture.componentRef.setInput('columns', columns);
    const spy = vi.fn();
    fixture.componentInstance.resetRequested.subscribe(spy);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('select')).toBeNull();
    const buttons = fixture.nativeElement.querySelectorAll('erp-button button');
    (buttons[buttons.length - 1] as HTMLButtonElement).click();
    expect(spy).toHaveBeenCalledOnce();
  });
});
