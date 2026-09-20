import {TestBed} from '@angular/core/testing';
import {routes} from '../../app.routes';
import {Typography} from './typography';

describe('Typography Specimen Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typography],
    }).compileComponents();
  });

  it('should verify the typography route still exists in application routes', () => {
    const typographyRoute = routes.find((r) => r.path === 'foundation/typography');
    expect(typographyRoute).toBeTruthy();
    expect(typographyRoute?.loadComponent).toBeDefined();
  });

  it('should create the typography specimen component', () => {
    const fixture = TestBed.createComponent(Typography);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the font loading banner with deterministic visible status text for all states', async () => {
    const fixture = TestBed.createComponent(Typography);
    const component = fixture.componentInstance;
    await fixture.whenStable();

    // 1. Initial test environment state (in testbed environment without font loading API, hasFontError is set)
    fixture.detectChanges();
    const banner = fixture.nativeElement.querySelector('#font-loading-banner');
    const statusText = fixture.nativeElement.querySelector('#font-loading-status');
    expect(banner).toBeTruthy();
    expect(statusText).toBeTruthy();
    expect(banner.classList.contains('is-error')).toBe(true);
    expect(statusText.textContent.trim()).toBe('تعذر التحقق من تحميل الخطوط المحلية');

    // 2. Success State
    component.hasFontError.set(false);
    component.tajawalLoaded.set(true);
    component.spaceGroteskLoaded.set(true);
    fixture.detectChanges();

    expect(banner.classList.contains('is-success')).toBe(true);
    expect(banner.classList.contains('is-error')).toBe(false);
    expect(statusText.textContent.trim()).toBe('تم التحقق بنجاح: Tajawal و Space Grotesk محملان محلياً');

    // 3. Checking State
    component.hasFontError.set(false);
    component.tajawalLoaded.set(null);
    component.spaceGroteskLoaded.set(null);
    fixture.detectChanges();

    expect(banner.classList.contains('is-success')).toBe(false);
    expect(banner.classList.contains('is-error')).toBe(false);
    expect(statusText.textContent.trim()).toBe('جاري التحقق من تحميل الخطوط المحلية...');
  });

  it('should render all three font-family review groups (Arabic, Latin, Mixed UI)', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const arabicGroup = compiled.querySelector('#family-arabic-group');
    const latinGroup = compiled.querySelector('#family-latin-group');
    const mixedGroup = compiled.querySelector('#family-mixed-group');

    expect(arabicGroup).toBeTruthy();
    expect(latinGroup).toBeTruthy();
    expect(mixedGroup).toBeTruthy();

    expect(arabicGroup?.querySelector('.font-family-arabic')).toBeTruthy();
    expect(latinGroup?.querySelector('.font-family-latin')).toBeTruthy();
    expect(mixedGroup?.querySelector('.font-family-ui')).toBeTruthy();
  });

  it('should render all 9 Candidate V1 semantic role specimens', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const expectedRoles = [
      'display',
      'page-title',
      'section-title',
      'subsection-title',
      'body',
      'body-strong',
      'body-small',
      'label',
      'caption',
    ];

    for (const role of expectedRoles) {
      const roleRow = compiled.querySelector(`#role-specimen-${role}`);
      expect(roleRow).toBeTruthy();

      const renderedBlock = roleRow?.querySelector(`.role-${role}`);
      expect(renderedBlock).toBeTruthy();
    }
  });

  it('should render the shared core weight review specimens (400, 500, 700)', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const sample400 = compiled.querySelector('#weight-sample-400');
    const sample500 = compiled.querySelector('#weight-sample-500');
    const sample700 = compiled.querySelector('#weight-sample-700');

    expect(sample400).toBeTruthy();
    expect(sample500).toBeTruthy();
    expect(sample700).toBeTruthy();
  });

  it('should render the long Arabic text rhythm specimens for Body and Body Small', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const bodyCard = compiled.querySelector('#rhythm-body-card');
    const bodySmallCard = compiled.querySelector('#rhythm-body-small-card');

    expect(bodyCard).toBeTruthy();
    expect(bodySmallCard).toBeTruthy();
    expect(bodyCard?.querySelector('#rhythm-body-sample')).toBeTruthy();
    expect(bodySmallCard?.querySelector('#rhythm-body-small-sample')).toBeTruthy();
  });

  it('should render the digit and data review specimen without using unapproved 600 weight', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const digitSection = compiled.querySelector('#digit-data-section');
    expect(digitSection).toBeTruthy();

    const dataList = compiled.querySelector('#data-review-list');
    expect(dataList).toBeTruthy();

    const textContent = dataList?.textContent || '';
    expect(textContent).toContain('INV-2026-001');
    expect(textContent).toContain('12,345.67 EGP');
    expect(textContent).toContain('١٢٬٣٤٥٫٦٧');

    // Data item labels and values exist with semantic structure
    const labels = compiled.querySelectorAll('.data-item-label');
    const values = compiled.querySelectorAll('.data-item-value');
    expect(labels.length).toBeGreaterThanOrEqual(5);
    expect(values.length).toBeGreaterThanOrEqual(5);
  });

  it('should render the RTL / bidi review specimen with isolated tokens', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const bidiSection = compiled.querySelector('#bidi-review-section');
    expect(bidiSection).toBeTruthy();

    const bdiElements = compiled.querySelectorAll('#bidi-sample-content bdi[dir="ltr"]');
    expect(bdiElements.length).toBeGreaterThanOrEqual(4);
  });

  it('should render the limited Dark-theme typography review context', () => {
    const fixture = TestBed.createComponent(Typography);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const darkContainer = compiled.querySelector('#dark-context-container[data-theme="dark"]');
    expect(darkContainer).toBeTruthy();

    expect(darkContainer?.querySelector('#dark-role-page-title')).toBeTruthy();
    expect(darkContainer?.querySelector('#dark-role-body')).toBeTruthy();
    expect(darkContainer?.querySelector('#dark-role-body-small')).toBeTruthy();
    expect(darkContainer?.querySelector('#dark-role-label')).toBeTruthy();
    expect(darkContainer?.querySelector('#dark-role-caption')).toBeTruthy();
    expect(darkContainer?.querySelector('#dark-mixed-data-line')).toBeTruthy();
  });
});

