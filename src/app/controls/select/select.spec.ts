import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OverlayRect} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpSelect} from './select';
import {ErpSelectOption, ErpSelectRenderRow, ErpSelectValue} from './select-contracts';

interface SelectTestAccess {
  readonly selectedValues: () => readonly string[];
  readonly visibleOptions: () => readonly ErpSelectOption[];
  readonly rows: () => readonly ErpSelectRenderRow[];
  readonly activeIndex: () => number;
  readonly popupPhase: () => string;
  readonly referenceSize: () => 'sm' | 'md' | 'lg';
  readonly controller: unknown;
  select(option: ErpSelectOption): void;
  clearSelection(): void;
  selectAllVisible(): void;
  syncPopupWidth(): void;
  updateQuery(value: string): void;
  handleKeydown(event: KeyboardEvent): void;
  toggle(): void;
}

const options: readonly ErpSelectOption[] = [
  {
    value: 'bravo', label: 'Bravo', group: 'operations', keywords: ['ledger'],
    icon: 'user', meta: 'B-20',
  },
  {
    value: 'alpha', label: 'Alpha', group: 'finance', description: 'Accounts',
    imageUrl: '/avatar.png',
  },
  {value: 'charlie', label: 'Charlie', group: 'finance', disabled: true},
  {value: 'hidden', label: 'Hidden', hidden: true},
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

  function rect(width: number): DOMRect {
    return {
      width, height: 38, x: 0, y: 0, top: 0, right: width, bottom: 38, left: 0,
      toJSON: () => ({}),
    } as DOMRect;
  }

  it('uses the reference md default and preserves legacy size aliases', () => {
    const fixture = createSelect();
    const test = access(fixture.componentInstance);
    expect(fixture.componentInstance.selectSize()).toBe('md');
    expect(test.referenceSize()).toBe('md');

    const matrix = [
      ['sm', 'sm'], ['md', 'md'], ['normal', 'md'], ['lg', 'lg'], ['xlg', 'lg'],
    ] as const;
    for (const [inputSize, referenceSize] of matrix) {
      fixture.componentRef.setInput('selectSize', inputSize);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-select-size')).toBe(inputSize);
      expect(fixture.nativeElement.getAttribute('data-select-reference-size')).toBe(referenceSize);
    }
  });

  it('renders the exact-reference hierarchy through approved ERP owners', () => {
    const fixture = createSelect();
    fixture.componentRef.setInput('searchable', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(
      'erp-field-frame[data-field-control-presentation="custom"]',
    )).not.toBeNull();
    expect(fixture.nativeElement.querySelector(
      'erp-field-trigger button[role="combobox"][aria-haspopup="listbox"]',
    )).not.toBeNull();
    expect(fixture.nativeElement.querySelector(
      'erp-search-box[data-search-box-presentation="select-panel"]',
    )).not.toBeNull();
    expect(fixture.nativeElement.querySelector(
      'erp-selection-tile[data-selection-tile-presentation="select-option"]',
    )).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.select__toolbar')).toBeNull();
    expect(fixture.nativeElement.querySelector('.select__sort-menu')).toBeNull();
  });

  it('keeps the exact-reference popup and option-list ownership distinct', () => {
    const fixture = createSelect();
    const host = fixture.nativeElement as HTMLElement;
    const popup = host.querySelector('.select__popup') as HTMLElement;
    const listbox = host.querySelector('.select__listbox') as HTMLElement;

    expect(host.querySelector('.select__trigger')).not.toBeNull();
    expect(popup.contains(listbox)).toBe(true);
    expect(popup.querySelectorAll('.select__listbox')).toHaveLength(1);
  });

  it('normalizes controlled single and multiple values without publishing form writes', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    component.writeValue(42);
    expect(access(component).selectedValues()).toEqual(['42']);
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    component.writeValue(['alpha', 'alpha', 42]);
    expect(access(component).selectedValues()).toEqual(['alpha', '42']);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('publishes single selection and renders reference media, description, and metadata', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const onChange = vi.fn<(value: ErpSelectValue) => void>();
    component.registerOnChange(onChange);
    access(component).select(options[1]);
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledWith('alpha');
    const imageAvatar = fixture.nativeElement.querySelector(
      '.select__single erp-avatar',
    ) as HTMLElement;
    expect(imageAvatar).not.toBeNull();
    expect(imageAvatar.getAttribute('data-avatar-size')).toBe('xs');
    expect(imageAvatar.querySelector('.avatar__frame')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.select__option-description')).not.toBeNull();
    component.writeValue('bravo');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.select__single erp-icon')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.select__option-meta')?.textContent).toContain('B-20');
  });

  it('uses the dedicated clear and selected-marker glyphs from the approved registry', () => {
    const fixture = createSelect();
    fixture.componentInstance.writeValue('bravo');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector(
      'erp-select-action[data-select-action-kind="clear"] erp-icon[data-icon-name="dismiss"]',
    )).not.toBeNull();
    expect(fixture.nativeElement.querySelector(
      '.select__tick[data-icon-name="check-mark"]',
    )).not.toBeNull();

    fixture.componentRef.setInput('multiple', true);
    fixture.componentInstance.writeValue(['bravo']);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(
      'erp-select-action[data-select-action-kind="chip-remove"] erp-icon[data-icon-name="dismiss"]',
    )).not.toBeNull();
    expect(fixture.nativeElement.querySelector(
      '.select__check erp-icon[data-icon-name="check-mark"]',
    )).not.toBeNull();
  });

  it('separates pointer focus from focus-visible and clears Field focus on blur', () => {
    const fixture = createSelect();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector('erp-field-trigger button') as HTMLButtonElement;
    const frame = host.querySelector('erp-field-frame') as HTMLElement;
    const matches = vi.spyOn(trigger, 'matches');

    matches.mockReturnValue(false);
    trigger.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(host.getAttribute('data-select-focus-visible')).toBe('false');
    expect(frame.getAttribute('data-field-focused')).toBe('true');

    trigger.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(host.getAttribute('data-select-focus-visible')).toBe('false');
    expect(frame.getAttribute('data-field-focused')).toBe('false');

    matches.mockReturnValue(true);
    trigger.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(host.getAttribute('data-select-focus-visible')).toBe('true');
  });

  it('enforces multiple limits and renders chips, overflow count, and select-all footer', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('maxSelected', 2);
    fixture.componentRef.setInput('maxChips', 1);
    fixture.componentRef.setInput('selectAll', true);
    fixture.detectChanges();
    test.select(options[2]);
    test.select(options[0]);
    test.selectAllVisible();
    fixture.detectChanges();
    expect(test.selectedValues()).toEqual(['bravo', 'alpha']);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(fixture.nativeElement.querySelectorAll('.select__chip')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('.select__chip--more')?.textContent).toContain('+1');
    expect(fixture.nativeElement.querySelector('.select__footer')?.textContent).toContain('2 محدد');
  });

  it('filters hidden options, searches all reference text, and supports custom filtering', () => {
    const fixture = createSelect();
    const test = access(fixture.componentInstance);
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['bravo', 'alpha', 'charlie']);
    test.updateQuery('ledger');
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['bravo']);
    test.updateQuery('');
    fixture.componentRef.setInput('filterFn', (option: ErpSelectOption) => option.group === 'finance');
    fixture.detectChanges();
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['alpha', 'charlie']);
    fixture.componentRef.setInput('filterPredicate', () => false);
    test.updateQuery('anything');
    expect(test.visibleOptions()).toEqual([]);
  });

  it('supports reference label/custom sorting and legacy data sorting without toolbar chrome', () => {
    const fixture = createSelect();
    const test = access(fixture.componentInstance);
    fixture.componentRef.setInput('sortMode', 'label');
    fixture.detectChanges();
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['alpha', 'bravo', 'charlie']);
    fixture.componentRef.setInput('sortMode', 'custom');
    fixture.componentRef.setInput('comparator', (left: ErpSelectOption, right: ErpSelectOption) =>
      right.value.localeCompare(left.value));
    fixture.detectChanges();
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['charlie', 'bravo', 'alpha']);
    fixture.componentRef.setInput('sortMode', 'none');
    fixture.componentInstance.sort.set('ascending');
    fixture.detectChanges();
    expect(test.visibleOptions().map(({value}) => value)).toEqual(['alpha', 'bravo', 'charlie']);
    expect(fixture.nativeElement.querySelector('.select__toolbar')).toBeNull();
  });

  it('renders sticky group rows without obsolete group-filter chrome', () => {
    const fixture = createSelect();
    const test = access(fixture.componentInstance);
    fixture.componentRef.setInput('groupBy', 'group');
    fixture.detectChanges();
    expect(test.rows().map((row) => row.kind)).toEqual([
      'group', 'option', 'group', 'option', 'option',
    ]);
    expect([...fixture.nativeElement.querySelectorAll('.select__group-label')]
      .map((element: Element) => element.textContent?.trim())).toEqual(['operations', 'finance']);
    expect(fixture.nativeElement.querySelector('.select__group-tabs')).toBeNull();
  });

  it.each([150, 240, 400])('matches a %spx control with no hidden popup minimum', (width) => {
    const fixture = createSelect();
    const control = fixture.nativeElement.querySelector('.select__control') as HTMLElement;
    vi.spyOn(control, 'getBoundingClientRect').mockReturnValue(rect(width));
    vi.stubGlobal('innerWidth', 1200);
    access(fixture.componentInstance).syncPopupWidth();
    expect((fixture.nativeElement.querySelector('.select__popup') as HTMLElement).style.inlineSize)
      .toBe(`${width}px`);
    vi.unstubAllGlobals();
  });

  it('caps popup width only at the exact viewport inset boundary', () => {
    const fixture = createSelect();
    const control = fixture.nativeElement.querySelector('.select__control') as HTMLElement;
    vi.spyOn(control, 'getBoundingClientRect').mockReturnValue(rect(480));
    vi.stubGlobal('innerWidth', 420);
    access(fixture.componentInstance).syncPopupWidth();
    expect((fixture.nativeElement.querySelector('.select__popup') as HTMLElement).style.inlineSize)
      .toBe('396px');
    vi.unstubAllGlobals();
  });

  it('opens, navigates around disabled options, selects, clears, and closes after motion', async () => {
    vi.useFakeTimers();
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    const onChange = vi.fn<(value: ErpSelectValue) => void>();
    component.registerOnChange(onChange);
    test.toggle();
    await Promise.resolve();
    fixture.detectChanges();
    expect(test.popupPhase()).toBe('open');
    expect(fixture.nativeElement.querySelector('erp-field-trigger button')
      ?.getAttribute('aria-expanded')).toBe('true');
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'End'}));
    expect(test.activeIndex()).toBe(1);
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
    expect(test.activeIndex()).toBe(0);
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'Enter'}));
    expect(test.selectedValues()).toEqual(['bravo']);
    expect(test.popupPhase()).toBe('leaving');
    vi.advanceTimersByTime(200);
    expect(test.popupPhase()).toBe('closed');
    expect(onChange).toHaveBeenCalledWith('bravo');
    test.clearSelection();
    expect(test.selectedValues()).toEqual([]);
    expect(onChange).toHaveBeenLastCalledWith(null);
    vi.useRealTimers();
  });

  it('restricts popup placement to the reference vertical axis and measures its unscaled layout box', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    test.toggle();
    const controller = test.controller as {
      options: {
        readGeometryInput(): {allowedPlacements?: readonly string[]};
        prepareGeometry?(context: {
          anchor: OverlayRect;
          viewport: OverlayRect;
        }): void;
        measureSurface?(): Readonly<{width: number; height: number}>;
      };
    };
    const popup = fixture.nativeElement.querySelector('.select__popup') as HTMLElement;
    Object.defineProperties(popup, {
      offsetWidth: {configurable: true, value: 240},
      offsetHeight: {configurable: true, value: 180},
    });

    expect(controller.options.readGeometryInput().allowedPlacements).toEqual(['bottom', 'top']);
    controller.options.prepareGeometry?.({
      anchor: {
        left: 40, top: 260, right: 280, bottom: 300, width: 240, height: 40,
      },
      viewport: {
        left: 0, top: 0, right: 320, bottom: 568, width: 320, height: 568,
      },
    });
    expect(popup.style.maxBlockSize).toBe('248px');
    expect(controller.options.measureSurface?.()).toEqual({width: 240, height: 180});
  });

  it('supports Backspace removal and Escape/Tab lifecycle in multiple mode', async () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    fixture.componentRef.setInput('multiple', true);
    component.writeValue(['bravo', 'alpha']);
    fixture.detectChanges();
    test.toggle();
    await Promise.resolve();
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'Backspace'}));
    expect(test.selectedValues()).toEqual(['bravo']);
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(test.popupPhase()).toBe('leaving');
  });

  it('closes immediately under reduced motion without changing selection visibility', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true, media: '(prefers-reduced-motion: reduce)', onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(),
      removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
    }));
    const fixture = createSelect();
    const test = access(fixture.componentInstance);
    fixture.componentInstance.writeValue('alpha');
    test.toggle();
    await Promise.resolve();
    test.handleKeydown(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    expect(test.popupPhase()).toBe('closed');
    expect(fixture.nativeElement.querySelector('.select__single-label')?.textContent).toContain('Alpha');
    vi.unstubAllGlobals();
  });

  it('does not open or publish while disabled', () => {
    const fixture = createSelect();
    const component = fixture.componentInstance;
    const test = access(component);
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    test.toggle();
    test.select(options[0]);
    expect(test.popupPhase()).toBe('closed');
    expect(test.selectedValues()).toEqual([]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('maps exact appearance and top placement while retaining Field compatibility', () => {
    const fixture = createSelect();
    for (const appearance of ['outline', 'filled', 'ghost'] as const) {
      fixture.componentRef.setInput('selectAppearance', appearance);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-select-appearance')).toBe(appearance);
    }
    fixture.componentRef.setInput('placement', 'top');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-select-placement')).toBe('top');
  });
});
