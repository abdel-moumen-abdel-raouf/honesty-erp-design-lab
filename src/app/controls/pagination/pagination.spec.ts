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

  it('defaults every optional region to visible and keeps 100 سجل as one option label', () => {
    const fixture = create(4);
    const component = fixture.componentInstance;
    expect([
      component.showSummary(), component.showPageSize(), component.showFirst(),
      component.showPrevious(), component.showPageNumbers(), component.showNext(), component.showLast(),
    ]).toEqual([true, true, true, true, true, true, true]);
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(component.pageSizeOptions()).toContain(100);
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

  it('uses ErpSelect for optional page-size selection and can hide it', async () => {
    const fixture = create(3);
    await fixture.whenStable();
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('erp-select') as HTMLElement;
    const accessibleLabelHost = select.querySelector(
      '.field-frame__label--visually-hidden',
    ) as HTMLElement;
    const accessibleLabel = accessibleLabelHost.querySelector(
      'label',
    ) as HTMLLabelElement;
    expect(select).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-inline.pagination__size-row')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        '.pagination__size-row > erp-text',
      ).textContent.trim(),
    ).toBe('عدد السجلات');
    expect(accessibleLabel.textContent?.trim()).toBe('عدد السجلات');
    expect(accessibleLabel.htmlFor).toBe(
      select.querySelector('erp-field-trigger button')?.id,
    );
    expect(select.querySelector('.field-frame__label--static')).toBeNull();
    expect(fixture.nativeElement.querySelector('select')).toBeNull();
    fixture.componentRef.setInput('showPageSize', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-select')).toBeNull();
  });

  it('independently controls every summary and navigation region', () => {
    const fixture = create(8, 4);
    fixture.componentRef.setInput('showSummary', false);
    fixture.componentRef.setInput('showFirst', false);
    fixture.componentRef.setInput('showPrevious', false);
    fixture.componentRef.setInput('showPageNumbers', false);
    fixture.componentRef.setInput('showNext', false);
    fixture.componentRef.setInput('showLast', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.pagination__summary')).toBeNull();
    expect(nativeButtons(fixture)).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
  });

  it('renders the exact Table reference footer and emits controlled page intent', () => {
    const fixture = create(3, 2);
    fixture.componentRef.setInput('presentation', 'table-reference');
    fixture.componentRef.setInput('visibleItems', 10);
    fixture.componentRef.setInput('totalItems', 24);
    fixture.componentRef.setInput('selectedItems', 2);
    const spy = vi.fn();
    fixture.componentInstance.pageChange.subscribe(spy);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-pagination-presentation')).toBe('table-reference');
    expect(host.textContent).toContain('عرض 10 من 24');
    expect(host.textContent).toContain('2 محدد');
    expect(host.querySelector('erp-select')).toBeNull();
    expect(host.querySelectorAll('erp-icon-button')).toHaveLength(2);
    expect(host.querySelectorAll('erp-button')).toHaveLength(3);

    const pages = [...host.querySelectorAll<HTMLButtonElement>('erp-button button')];
    pages[2].click();
    expect(spy).toHaveBeenCalledWith(3);
  });
});
