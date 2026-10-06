import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ErpSelect} from './select';
import {ErpSelectOption, ErpSelectSort, ErpSelectValue} from './select-contracts';

interface SelectTestAccess {
  readonly selectedValues: () => readonly string[];
  readonly visibleOptions: () => readonly ErpSelectOption[];
  readonly activeIndex: () => number;
  select(option: ErpSelectOption): void;
  clearSelection(): void;
  setGroup(group: string | null): void;
  setSort(sort: ErpSelectSort): void;
  toggleSortMenu(): void;
  syncPopupWidth(): void;
  updateQuery(value: string): void;
  handleKeydown(event: KeyboardEvent): void;
  toggle(): void;
}

const options: readonly ErpSelectOption[] = [
  {value: 'bravo', label: 'Bravo', group: 'operations', keywords: ['ledger']},
  {value: 'alpha', label: 'Alpha', group: 'finance', description: 'Accounts'},
  {value: 'charlie', label: 'Charlie', group: 'finance', disabled: true},
];

describe('ErpSelect', () => {
  function createSelect(): ComponentFixture<ErpSelect> {
    const fixture = TestBed.createComponent(ErpSelect);
    fixture.componentRef.setInput('label', 'الموظف');
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
    Object.assign(fixture.nativeElement.querySelector('.select__popup'), {
      showPopover: vi.fn(),
      hidePopover: vi.fn(),
    });
    return fixture;
  }

  function access(component: ErpSelect): SelectTestAccess {
    return component as unknown as SelectTestAccess;
  }

  it('defaults to normal and applies every controlled reference size', () => {
    const fixture = createSelect();
    expect(fixture.componentInstance.selectSize()).toBe('normal');

    for (const size of ['sm', 'md', 'normal', 'lg', 'xlg'] as const) {
      fixture.componentRef.setInput('selectSize', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-select-size')).toBe(size);
    }
  });

  it('normalizes single and multiple form values without publishing form writes', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const onChange = vi.fn();
    component.registerOnChange(onChange);

    component.writeValue(42);
    fixture.detectChanges();
    expect(access(component).selectedValues()).toEqual(['42']);

    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    component.writeValue(['alpha', 'alpha', 42]);
    fixture.detectChanges();
    expect(access(component).selectedValues()).toEqual(['alpha', '42']);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('rejects disabled options and enforces maxSelected while propagating one CVA change', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('maxSelected', 1);
    fixture.detectChanges();

    test.select(options[2]);
    test.select(options[0]);
    test.select(options[1]);

    expect(test.selectedValues()).toEqual(['bravo']);
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(['bravo']);
  });

  it('filters by search and group and preserves source/ascending/descending sort', () => {
    const fixture = createSelect();
    const test = access(fixture.componentInstance);

    expect(test.visibleOptions().map(({value}) => value)).toEqual(['bravo', 'alpha', 'charlie']);
    test.setSort('ascending');
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['alpha', 'bravo', 'charlie']);
    test.setSort('descending');
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['charlie', 'bravo', 'alpha']);
    test.setSort('source');
    test.setGroup('finance');
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['alpha', 'charlie']);
    test.setGroup(null);
    test.updateQuery('ledger');
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['bravo']);
  });

  it('keeps search in one labelled row and exposes one bounded sort menu', () => {
    const fixture = createSelect();
    const test = access(fixture.componentInstance);
    expect(fixture.nativeElement.querySelector('.select__search-row erp-text')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        '.select__search-row erp-search-box[data-search-box-mode="inline"]',
      ),
    ).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.select__toolbar .select__sort')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.select__sort-menu')).toBeNull();
    test.toggleSortMenu();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.select__sort-menu erp-stack[role="menu"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.select__sort-menu erp-button')).toHaveLength(3);
    (
      fixture.nativeElement.querySelector(
        '.select__sort-menu [data-value="ascending"] button',
      ) as HTMLButtonElement
    ).click();
    expect(fixture.componentInstance.sort()).toBe('ascending');
  });

  it('matches popup inline size to the trigger while respecting viewport inset', () => {
    const fixture = createSelect();
    const trigger = fixture.nativeElement.querySelector('erp-field-trigger') as HTMLElement;
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      width: 480,
      height: 48,
      x: 0,
      y: 0,
      top: 0,
      right: 480,
      bottom: 48,
      left: 0,
      toJSON: () => ({}),
    });
    vi.stubGlobal('innerWidth', 420);
    access(fixture.componentInstance).syncPopupWidth();
    expect((fixture.nativeElement.querySelector('.select__popup') as HTMLElement).style.inlineSize).toBe('396px');
    vi.unstubAllGlobals();
  });

  it('opens, navigates, selects with Enter, closes with Escape, and clears', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    const onChange = vi.fn<(value: ErpSelectValue) => void>();
    component.registerOnChange(onChange);

    test.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-select-open')).toBe('true');

    test.handleKeydown(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    expect(test.activeIndex()).toBe(1);
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
    expect(test.activeIndex()).toBe(0);
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'Enter'}));
    fixture.detectChanges();
    expect(test.selectedValues()).toEqual(['bravo']);
    expect(onChange).toHaveBeenCalledWith('bravo');
    expect(fixture.nativeElement.getAttribute('data-select-open')).toBe('false');

    test.toggle();
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-select-open')).toBe('false');

    test.clearSelection();
    expect(test.selectedValues()).toEqual([]);
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('does not open or publish values while the field is disabled', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    test.toggle();
    test.select(options[0]);
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-select-open')).toBe('false');
    expect(test.selectedValues()).toEqual([]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
