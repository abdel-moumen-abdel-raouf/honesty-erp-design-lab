import {TestBed} from '@angular/core/testing';
import {ErpPagination} from './pagination';

describe('ErpPagination', () => {
  function create(pageCount: number, page = 1) {
    const fixture = TestBed.createComponent(ErpPagination);
    fixture.componentRef.setInput('pageCount', pageCount);
    fixture.componentRef.setInput('page', page);
    fixture.detectChanges();
    return fixture;
  }

  function nativeButtons(fixture: ReturnType<typeof create>): HTMLButtonElement[] {
    return [...fixture.nativeElement.querySelectorAll('erp-button button')] as HTMLButtonElement[];
  }

  it('normalizes zero count and pages below the valid boundary consistently', () => {
    const fixture = create(0, -3);
    const buttons = nativeButtons(fixture);
    expect(fixture.nativeElement.getAttribute('data-pagination-page-count')).toBe('1');
    expect(fixture.nativeElement.getAttribute('data-pagination-page')).toBe('1');
    expect(fixture.nativeElement.textContent).toContain('الصفحة 1 من 1');
    expect(buttons[0].disabled).toBe(true);
    expect(buttons.at(-1)?.disabled).toBe(true);
  });

  it('clamps a page above count and emits no contradictory boundary intent', () => {
    const fixture = create(3, 9);
    const spy = vi.fn();
    fixture.componentInstance.pageChange.subscribe(spy);
    const buttons = nativeButtons(fixture);
    expect(fixture.nativeElement.getAttribute('data-pagination-page')).toBe('3');
    expect(fixture.nativeElement.textContent).toContain('الصفحة 3 من 3');
    expect(buttons.at(-1)?.disabled).toBe(true);
    buttons.at(-1)?.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('emits first, previous, next, and last intents from a middle page', () => {
    const fixture = create(12, 6);
    const spy = vi.fn();
    fixture.componentInstance.pageChange.subscribe(spy);
    const buttons = nativeButtons(fixture);
    buttons[0].click();
    buttons[1].click();
    buttons.at(-2)?.click();
    buttons.at(-1)?.click();
    expect(spy.mock.calls.map(([page]) => page)).toEqual([1, 5, 7, 12]);
  });

  it('uses ErpSelect for optional page-size selection and can hide it', () => {
    const fixture = create(3);
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('select')).toBeNull();
    fixture.componentRef.setInput('showPageSize', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-select')).toBeNull();
  });
});
