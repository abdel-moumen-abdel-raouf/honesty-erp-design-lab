import {By} from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';
import {ErpSelect} from '../select/select';
import {ErpBranchSelector} from './branch-selector';

describe('ErpBranchSelector', () => {
  it('reuses ErpSelect and publishes controlled branch changes', () => {
    const fixture = TestBed.createComponent(ErpBranchSelector);
    fixture.componentRef.setInput('branches', [
      {id: 'cairo', label: 'القاهرة'},
      {id: 'alex', label: 'الإسكندرية', disabled: true},
    ]);
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.directive(ErpSelect));
    expect(select.componentInstance.options()).toEqual([
      expect.objectContaining({value: 'cairo'}),
      expect.objectContaining({value: 'alex', disabled: true}),
    ]);
    select.triggerEventHandler('ngModelChange', 'cairo');
    expect(fixture.componentInstance.value()).toBe('cairo');
    expect(changed).toHaveBeenCalledWith('cairo');

    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('labelMode', 'visually-hidden');
    fixture.detectChanges();
    expect(select.componentInstance.disabled()).toBe(true);
    expect(select.componentInstance.labelMode()).toBe('visually-hidden');
  });
});
