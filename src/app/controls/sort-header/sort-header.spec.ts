import {TestBed} from '@angular/core/testing';
import {ErpSortHeader} from './sort-header';

describe('ErpSortHeader', () => {
  it('cycles none, ascending, descending, and none through intent output', () => {
    const fixture = TestBed.createComponent(ErpSortHeader);
    fixture.componentRef.setInput('label', 'الاسم');
    const spy = vi.fn();
    fixture.componentInstance.sortChange.subscribe(spy);
    for (const [current, next] of [['none','ascending'],['ascending','descending'],['descending','none']] as const) {
      fixture.componentRef.setInput('direction', current);
      fixture.detectChanges();
      (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
      expect(spy).toHaveBeenLastCalledWith(next);
    }
  });

  it('blocks sort intent while disabled and inherits theme/direction', () => {
    const fixture = TestBed.createComponent(ErpSortHeader);
    fixture.componentRef.setInput('label', 'الاسم');
    fixture.componentRef.setInput('disabled', true);
    const spy = vi.fn();
    fixture.componentInstance.sortChange.subscribe(spy);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    expect(spy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
    expect(fixture.nativeElement.hasAttribute('dir')).toBe(false);
  });
});
