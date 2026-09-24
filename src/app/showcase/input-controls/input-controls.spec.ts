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

  it('has the /controls/inputs route and creates', () => {
    expect(
      routes.find((route) => route.path === 'controls/inputs'),
    ).toBeDefined();
    expect(create().componentInstance).toBeTruthy();
  });

  it('renders nine review groups with equivalent Light and Dark contexts', () => {
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
    ]);
    for (const group of groups) {
      expect(
        [...group.querySelectorAll('[data-theme-context]')].map((context) =>
          context.getAttribute('data-theme'),
        ),
      ).toEqual(['light', 'dark']);
    }
  });

  it('contains all four temporal overlay triggers in both themes', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="temporal-pickers"]');
    for (const selector of [
      'erp-date-box',
      'erp-time-box',
      'erp-date-time-box',
      'erp-date-range-box',
    ]) {
      expect(group?.querySelectorAll(selector).length).toBe(2);
    }
    expect(group?.querySelectorAll('input[type="date"]').length).toBe(0);
    expect(group?.querySelectorAll('input[type="time"]').length).toBe(0);
    expect(group?.querySelectorAll('input[type="datetime-local"]').length).toBe(0);
  });

  it('contains checkbox and radio basics in both theme contexts', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="boolean-choice"]');

    expect(group?.querySelectorAll('erp-check-box').length).toBe(6);
    expect(group?.querySelectorAll('erp-radio-box').length).toBe(6);
    expect(group?.querySelectorAll('[data-check-box-evidence]').length).toBe(2);
    expect(group?.querySelectorAll('[data-radio-box-evidence]').length).toBe(2);
  });

  it('contains all four numeric controls in both theme contexts', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="numeric-family"]');

    for (const selector of [
      'erp-number-box',
      'erp-money-box',
      'erp-number-stepper',
      'erp-range-slider',
    ]) {
      expect(group?.querySelectorAll(selector).length).toBe(2);
    }
    expect(group?.querySelectorAll('[data-range-thumb]').length).toBe(4);
  });

  it('contains single-file and single-image picker evidence in both themes', () => {
    const root = create().nativeElement as HTMLElement;
    const group = root.querySelector('[data-review-group="file-image-basics"]');

    expect(group?.querySelectorAll('erp-file-picker').length).toBe(2);
    expect(group?.querySelectorAll('erp-image-picker').length).toBe(2);
    expect(group?.querySelectorAll('input[type="file"]').length).toBe(4);
    expect(group?.querySelectorAll('input[multiple]').length).toBe(0);
  });

  it('contains every text-entry control and complete variant/size evidence', () => {
    const root = create().nativeElement as HTMLElement;
    for (const selector of [
      'erp-text-box',
      'erp-text-area-box',
      'erp-password-box',
      'erp-search-box',
      'erp-url-box',
      'erp-tel-box',
    ]) {
      expect(
        root.querySelectorAll(
          `[data-review-group="family"] ${selector}`,
        ).length,
      ).toBe(2);
    }
    expect(root.querySelectorAll('[data-variant-evidence]').length).toBe(10);
    expect(root.querySelectorAll('[data-size-evidence]').length).toBe(14);
    expect(root.querySelectorAll('[data-glass-evidence]').length).toBe(2);
  });

  it('exposes deterministic invalid compatibility evidence', () => {
    const root = create().nativeElement as HTMLElement;
    const invalid = [
      ...root.querySelectorAll<HTMLElement>('[data-invalid-combination]'),
    ];
    expect(invalid.length).toBe(4);
    expect(
      invalid.map((item) =>
        item.getAttribute('data-field-configuration-state'),
      ),
    ).toEqual(['invalid', 'invalid', 'invalid', 'invalid']);
  });

  it('provides LTR and RTL focus-gradient review contexts without a direction API', () => {
    const root = create().nativeElement as HTMLElement;
    const evidence = [
      ...root.querySelectorAll<HTMLElement>(
        '[data-gradient-direction-evidence]',
      ),
    ];
    expect(evidence.length).toBe(4);
    expect(
      evidence.map((item) => [
        item.getAttribute('data-gradient-direction-evidence'),
        item.getAttribute('dir'),
      ]),
    ).toEqual([
      ['ltr', 'ltr'],
      ['rtl', 'rtl'],
      ['ltr', 'ltr'],
      ['rtl', 'rtl'],
    ]);
  });

  it('includes password, clear, feedback, disabled, and readonly behavior evidence', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-password-evidence]').length).toBe(2);
    expect(root.querySelectorAll('[data-clear-evidence]').length).toBe(2);
    expect(root.querySelectorAll('[data-feedback-evidence]').length).toBe(2);
    expect(
      root.querySelectorAll('[data-feedback-evidence] erp-field-feedback').length,
    ).toBe(2);
  });
});
