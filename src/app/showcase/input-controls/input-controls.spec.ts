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

  it('renders the exact checkbox reference sections and contracts', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="boolean-choice"]')!;

    expect(group.querySelectorAll('erp-check-box')).toHaveLength(45);

    for (const selector of [
      '[data-check-box-standalone-panel]',
      '[data-check-box-text-panel]',
      '[data-check-box-switch-panel]',
      '[data-check-box-tile-panel]',
      '[data-check-box-variants-panel]',
      '[data-check-box-indeterminate-panel]',
      '[data-check-box-size-panel]',
      '[data-check-box-state-matrix-panel]',
    ]) {
      expect(group.querySelectorAll(selector)).toHaveLength(1);
    }

    expect(
      group.querySelectorAll('erp-check-box[data-check-box-mode="checkbox"]'),
    ).toHaveLength(29);
    expect(
      group.querySelectorAll('erp-check-box[data-check-box-mode="switch"]'),
    ).toHaveLength(12);
    expect(
      group.querySelectorAll('erp-check-box[data-check-box-mode="tile"]'),
    ).toHaveLength(4);

    expect(
      group.querySelectorAll('erp-check-box[data-check-box-variant="outline"]'),
    ).toHaveLength(39);
    expect(
      group.querySelectorAll('erp-check-box[data-check-box-variant="filled"]'),
    ).toHaveLength(3);
    expect(
      group.querySelectorAll('erp-check-box[data-check-box-variant="soft"]'),
    ).toHaveLength(3);

    expect(group.querySelectorAll('svg.check-box__mark')).toHaveLength(45);
    expect(group.querySelectorAll('.check-box__mark-check')).toHaveLength(45);
    expect(group.querySelectorAll('.check-box__mark-dash')).toHaveLength(45);

    const sizeEvidence = [
      ...group.querySelectorAll<HTMLElement>(
        '[data-check-box-size-panel] erp-check-box',
      ),
    ];
    expect(
      sizeEvidence.map((control) => control.getAttribute('data-check-box-size')),
    ).toEqual(['sm', 'md', 'lg', 'xl']);

    expect(
      group.querySelector<HTMLElement>('[data-boolean-choice-rtl-evidence]')?.dir,
    ).toBe('rtl');
  });

  it('renders the approved RadioBox family review and tile single-select evidence', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="boolean-choice"]')!;

    for (const selector of [
      '[data-radio-box-standalone-panel]',
      '[data-radio-box-text-panel]',
      '[data-radio-box-group-panel]',
      '[data-radio-box-tile-panel]',
      '[data-radio-box-variants-panel]',
      '[data-radio-box-size-panel]',
      '[data-radio-box-state-matrix-panel]',
    ]) {
      expect(group.querySelectorAll(selector)).toHaveLength(1);
    }

    expect(group.querySelectorAll('[data-radio-box-evidence]')).toHaveLength(1);
    expect(group.querySelectorAll('[data-radio-group-evidence]')).toHaveLength(1);
    expect(group.querySelectorAll('[data-radio-tile-group-evidence]')).toHaveLength(1);
    expect(
      group.querySelectorAll(
        '[data-radio-box-tile-panel] erp-radio-box[data-radio-box-mode="tile"]',
      ),
    ).toHaveLength(3);

    expect(
      group.querySelectorAll(
        '[data-radio-box-variants-panel] erp-radio-box[data-radio-box-variant="filled"]',
      ),
    ).toHaveLength(2);
    expect(
      group.querySelectorAll(
        '[data-radio-box-variants-panel] erp-radio-box[data-radio-box-variant="soft"]',
      ),
    ).toHaveLength(2);

    const sizeEvidence = [
      ...group.querySelectorAll<HTMLElement>(
        '[data-radio-box-size-panel] erp-radio-box',
      ),
    ];
    expect(
      sizeEvidence.map((control) => control.getAttribute('data-radio-box-size')),
    ).toEqual(['sm', 'md', 'lg', 'xl']);

    expect(
      group.querySelector<HTMLElement>('[data-radio-box-rtl-evidence]')?.dir,
    ).toBe('rtl');
  });

  it('demonstrates RadioBox required recovery without checkbox-only states', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const required = root.querySelector<HTMLElement>(
      '[data-radio-box-required-evidence]',
    )!;
    const native = required.querySelector('input') as HTMLInputElement;

    expect(required.getAttribute('data-radio-box-status')).toBe('danger');

    native.checked = true;
    native.dispatchEvent(new Event('change', {bubbles: true}));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(required.getAttribute('data-radio-box-status')).toBe('none');
    expect(root.querySelector('[data-radio-box-standalone-panel] svg')).toBeNull();
  });

  it('demonstrates required recovery and select-all indeterminate behavior', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="boolean-choice"]')!;

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
      [...group.querySelectorAll<HTMLElement>(
        '[data-check-box-indeterminate-panel] .check-reference-nested erp-check-box',
      )].every(
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
