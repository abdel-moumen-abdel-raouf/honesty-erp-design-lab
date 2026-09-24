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

  it('renders five review groups with equivalent Light and Dark contexts', () => {
    const root = create().nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll('[data-review-group]')];
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual([
      'family',
      'variants-appearance',
      'sizes',
      'matrix',
      'behavior-direction',
    ]);
    for (const group of groups) {
      expect(
        [...group.querySelectorAll('[data-theme-context]')].map((context) =>
          context.getAttribute('data-theme'),
        ),
      ).toEqual(['light', 'dark']);
    }
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
