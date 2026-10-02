import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {InputControls} from './input-controls';

describe('InputControls showcase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputControls],
      providers: [provideRouter(routes)],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(InputControls);
    fixture.detectChanges();
    return fixture;
  }

  it('provides concise full FieldFrame hit-area review evidence', () => {
    const root = create().nativeElement as HTMLElement;
    const evidence = root.querySelector(
      '[data-field-hit-area-review-evidence]',
    );

    expect(evidence).toBeTruthy();
    expect(evidence?.textContent).toContain('انقر');
  });

  it('has the /controls/inputs route and creates', () => {
    expect(
      routes.find((route) => route.path === 'controls/inputs'),
    ).toBeDefined();
    expect(create().componentInstance).toBeTruthy();
  });

  it('renders ten review groups under the inherited global theme', () => {
    const root = create().nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll('[data-review-group]')];
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual([
      'family',
      'variants-appearance',
      'sizes',
      'matrix',
      'behavior-direction',
      'boolean-choice',
      'numeric-family',
      'file-image-basics',
      'temporal-pickers',
      'selection-pickers',
    ]);
    expect(root.querySelectorAll('[data-theme-context]')).toHaveLength(0);
    expect(root.querySelector('erp-container.input-showcase')?.hasAttribute('data-theme')).toBe(false);
  });

  it('contains all four selection picker controls', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="selection-pickers"]');
    expect(group?.querySelectorAll('erp-color-picker').length).toBe(2);
    for (const selector of ['erp-icon-picker', 'erp-item-picker', 'erp-combo-box']) {
      expect(group?.querySelectorAll(selector).length).toBe(1);
    }
    expect(
      [...(group?.querySelectorAll<HTMLElement>('[data-color-picker-evidence]') ?? [])]
        .map((control) => control.dataset['colorPickerEvidence']),
    ).toEqual(['system', 'free']);

    expect(
      [...(group?.querySelectorAll<HTMLElement>('[data-color-picker-evidence]') ?? [])]
        .map((control) => control.getAttribute('data-color-picker-mode')),
    ).toEqual(['system', 'free']);

    const item = group?.querySelector<HTMLElement>('[data-item-picker-evidence]');
    const combo = group?.querySelector<HTMLElement>('[data-combo-box-evidence]');

    expect(item?.hasAttribute('searchable')).toBe(false);
    expect(item?.querySelector('erp-field-trigger')).not.toBeNull();
    expect(combo?.querySelector('input[role="combobox"]')).not.toBeNull();
  });

  it('contains all four temporal overlay triggers', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="temporal-pickers"]');
    for (const selector of [
      'erp-date-box',
      'erp-time-box',
      'erp-date-time-box',
      'erp-date-range-box',
    ]) {
      expect(group?.querySelectorAll(selector).length).toBe(1);
    }
    expect(group?.querySelectorAll('input[type="date"]').length).toBe(0);
    expect(group?.querySelectorAll('input[type="time"]').length).toBe(0);
    expect(group?.querySelectorAll('input[type="datetime-local"]').length).toBe(0);
  });

  it('renders the full checkbox reference evidence separately from the current radio controls', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="boolean-choice"]');

    expect(group?.querySelectorAll('erp-check-box')).toHaveLength(21);

    const radioBoxes = [
      ...(group?.querySelectorAll<HTMLElement>('erp-radio-box') ?? []),
    ];
    const standaloneRadioBoxes = radioBoxes.filter(
      (radioBox) => radioBox.closest('erp-radio-group') === null,
    );
    const groupedRadioBoxes = [
      ...(group?.querySelectorAll<HTMLElement>(
        'erp-radio-group erp-radio-box',
      ) ?? []),
    ];

    expect(standaloneRadioBoxes).toHaveLength(4);
    expect(groupedRadioBoxes).toHaveLength(3);
    expect(group?.querySelectorAll('erp-radio-group')).toHaveLength(1);
    expect(group?.querySelectorAll('[data-radio-group-evidence]')).toHaveLength(1);
    expect(group?.querySelectorAll('[data-check-box-evidence]')).toHaveLength(1);
    expect(group?.querySelectorAll('[data-radio-box-evidence]')).toHaveLength(1);

    for (const selector of [
      '[data-check-box-size-card]',
      '[data-check-box-states-card]',
      '[data-check-box-switch-card]',
      '[data-check-box-neon-card]',
      '[data-check-box-tiles-card]',
      '[data-check-box-task-card]',
      '[data-radio-current-card]',
    ]) {
      expect(group?.querySelectorAll(selector)).toHaveLength(1);
    }

    expect(group?.querySelectorAll('[data-boolean-choice-rtl-evidence]')).toHaveLength(1);
    expect(
      group?.querySelector<HTMLElement>('[data-boolean-choice-rtl-evidence]')?.dir,
    ).toBe('rtl');

    const sizeEvidence = [
      ...(group?.querySelectorAll<HTMLElement>(
        '[data-check-box-size-card] erp-check-box',
      ) ?? []),
    ];
    expect(
      sizeEvidence.map((control) => control.getAttribute('data-check-box-size')),
    ).toEqual(['sm', 'md', 'lg', 'xl']);

    expect(
      group?.querySelectorAll(
        'erp-check-box[data-check-box-variant="classic"]',
      ),
    ).toHaveLength(16);
    expect(
      group?.querySelectorAll(
        'erp-check-box[data-check-box-variant="switch"]',
      ),
    ).toHaveLength(3);
    expect(
      group?.querySelectorAll(
        'erp-check-box[data-check-box-variant="neon"]',
      ),
    ).toHaveLength(2);
    expect(group?.querySelectorAll('erp-check-box erp-icon')).toHaveLength(0);
    expect(group?.querySelectorAll('erp-check-box .check-box__visual')).toHaveLength(21);
  });

  it('demonstrates indeterminate exit, required recovery, selectable tiles, and select-all behavior', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="boolean-choice"]')!;

    const mixed = group.querySelector<HTMLElement>(
      '[data-check-box-mixed-evidence]',
    )!;
    const mixedInput = mixed.querySelector('input') as HTMLInputElement;
    expect(mixed.getAttribute('data-check-box-indeterminate')).toBe('true');

    mixedInput.checked = true;
    mixedInput.dispatchEvent(new Event('change', {bubbles: true}));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(mixed.getAttribute('data-check-box-indeterminate')).toBe('false');
    expect(mixed.getAttribute('data-check-box-checked')).toBe('true');

    const required = group.querySelector<HTMLElement>(
      '[data-check-box-required-evidence]',
    )!;
    const requiredInput = required.querySelector('input') as HTMLInputElement;
    expect(required.getAttribute('data-check-box-status')).toBe('danger');

    requiredInput.checked = true;
    requiredInput.dispatchEvent(new Event('change', {bubbles: true}));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(required.getAttribute('data-check-box-status')).toBe('none');
    expect(required.getAttribute('data-check-box-checked')).toBe('true');

    const proTile = group.querySelector<HTMLElement>(
      '[data-check-box-tiles-card] .check-tile:nth-of-type(2)',
    );
    expect(proTile?.getAttribute('data-selected')).toBe('false');
    proTile?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    fixture.detectChanges();
    expect(proTile?.getAttribute('data-selected')).toBe('true');

    const master = group.querySelector<HTMLElement>(
      '[data-check-box-task-master]',
    )!;
    const masterInput = master.querySelector('input') as HTMLInputElement;
    expect(master.getAttribute('data-check-box-indeterminate')).toBe('true');

    masterInput.checked = true;
    masterInput.dispatchEvent(new Event('change', {bubbles: true}));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(master.getAttribute('data-check-box-indeterminate')).toBe('false');
    expect(master.getAttribute('data-check-box-checked')).toBe('true');
    expect(
      [...group.querySelectorAll<HTMLElement>('.check-task erp-check-box')]
        .every(
          (control) => control.getAttribute('data-check-box-checked') === 'true',
        ),
    ).toBe(true);
  });

  it('contains all four numeric controls', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="numeric-family"]');

    for (const selector of [
      'erp-number-box',
      'erp-number-stepper',
      'erp-range-slider',
    ]) {
      expect(group?.querySelectorAll(selector).length).toBe(1);
    }
    expect(group?.querySelectorAll('erp-money-box').length).toBe(2);
    expect(
      group?.querySelectorAll('[data-money-box-arabic-digits-evidence]').length,
    ).toBe(1);
    expect(group?.querySelectorAll('[data-range-thumb]').length).toBe(2);
    expect(group?.querySelectorAll('[data-range-tooltip-anchor]').length).toBe(2);
  });

  it('contains multi-file and multi-image RTL evidence', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="file-image-basics"]');

    expect(group?.querySelectorAll('erp-file-picker').length).toBe(2);
    expect(group?.querySelectorAll('erp-image-picker').length).toBe(3);
    expect(group?.querySelectorAll('input[type="file"]').length).toBe(5);
    expect(group?.querySelectorAll('input[multiple]').length).toBe(5);
    expect(group?.querySelectorAll('[data-file-picker-item]').length).toBe(2);
    expect(group?.querySelectorAll('[data-image-picker-item]').length).toBe(6);
    expect(group?.querySelectorAll('[data-local-rejection-evidence]').length).toBe(1);
    expect(
      [...(group?.querySelectorAll<HTMLElement>('[data-image-picker-evidence]') ?? [])]
        .map((control) => control.dataset['imagePickerEvidence']),
    ).toEqual(['md', 'sm', 'lg']);
    expect(group?.querySelector<HTMLElement>('[data-file-image-rtl-evidence]')?.dir).toBe('rtl');
    expect(group?.querySelectorAll('[data-file-image-rtl-evidence]').length).toBe(1);
  });

  it('contains every text-entry control and complete variant/size evidence', () => {
    const root = create().nativeElement as HTMLElement;
    for (const selector of [
      'erp-text-box',
      'erp-text-area-box',
      'erp-password-box',
      'erp-url-box',
      'erp-tel-box',
    ]) {
      expect(
        root.querySelectorAll(
          `[data-review-group="family"] ${selector}`,
        ).length,
      ).toBe(1);
    }
    expect(
      root.querySelectorAll('[data-review-group="family"] erp-search-box').length,
    ).toBe(2);
    expect(root.querySelectorAll('[data-variant-evidence]').length).toBe(5);
    expect(root.querySelectorAll('[data-size-evidence]').length).toBe(7);
    expect(root.querySelectorAll('[data-glass-substrate]').length).toBe(1);
    expect(root.querySelectorAll('[data-glass-evidence]').length).toBe(3);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-glass-evidence]')]
        .map((field) => field.dataset['glassEvidence']),
    ).toEqual([
      'outline-focus',
      'solid-status',
      'subtle-status',
    ]);
  });

  it('exposes deterministic invalid compatibility evidence', () => {
    const root = create().nativeElement as HTMLElement;
    const invalid = [
      ...root.querySelectorAll<HTMLElement>('[data-invalid-combination]'),
    ];
    expect(invalid.length).toBe(2);
    expect(
      invalid.map((item) =>
        item.getAttribute('data-field-configuration-state'),
      ),
    ).toEqual(['invalid', 'invalid']);
  });

  it('provides LTR and RTL focus-gradient review contexts without a direction API', () => {
    const root = create().nativeElement as HTMLElement;
    const evidence = [
      ...root.querySelectorAll<HTMLElement>(
        '[data-gradient-direction-evidence]',
      ),
    ];
    expect(evidence.length).toBe(2);
    expect(
      evidence.map((item) => [
        item.getAttribute('data-gradient-direction-evidence'),
        item.getAttribute('dir'),
      ]),
    ).toEqual([
      ['ltr', 'ltr'],
      ['rtl', 'rtl'],
    ]);
  });

  it('includes password, clear, feedback, disabled, and readonly behavior evidence', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-password-evidence]').length).toBe(1);
    expect(root.querySelectorAll('[data-clear-evidence]').length).toBe(1);
    expect(root.querySelectorAll('[data-feedback-evidence]').length).toBe(1);
    expect(
      root.querySelectorAll('[data-feedback-evidence] erp-field-feedback').length,
    ).toBe(1);
  });

  it('provides SearchBox modal, dropdown, and inline mode evidence', () => {
    const root = create().nativeElement as HTMLElement;
    const dropdown = root.querySelector<HTMLElement>(
      '[data-search-dropdown-evidence]',
    );
    const modal = root.querySelector<HTMLElement>(
      '[data-search-modal-evidence]',
    );
    const inline = root.querySelector<HTMLElement>(
      '[data-search-inline-evidence]',
    );

    expect(dropdown?.getAttribute('data-search-box-mode')).toBe('dropdown');
    expect(modal?.getAttribute('data-search-box-mode')).toBe('modal');
    expect(inline?.getAttribute('data-search-box-mode')).toBe('inline');
    expect(dropdown?.hasAttribute('clearable')).toBe(true);
    expect(modal?.hasAttribute('clearable')).toBe(true);
    expect(inline?.hasAttribute('clearable')).toBe(true);
    expect(dropdown?.querySelectorAll('[data-search-result]').length).toBe(3);
  });

  it('provides selected DateRange evidence in an RTL context', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="temporal-pickers"]');
    const ranges = group?.querySelectorAll<HTMLElement>('[data-date-range-box-evidence]');

    expect(ranges?.length).toBe(1);
    expect(group?.querySelector<HTMLElement>('[data-date-range-rtl-evidence]')?.dir).toBe('rtl');
    expect(
      [...(ranges ?? [])].map((range) => [
        range.dataset['dateRangeStart'],
        range.dataset['dateRangeEnd'],
      ]),
    ).toEqual([
      ['2026-09-24', '2026-09-30'],
    ]);
  });
});
