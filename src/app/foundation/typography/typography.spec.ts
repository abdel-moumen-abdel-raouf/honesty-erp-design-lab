import {TestBed} from '@angular/core/testing';
import {Typography} from './typography';

describe('Typography Specimen Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typography],
    }).compileComponents();
  });

  it('should create the typography specimen component', () => {
    const fixture = TestBed.createComponent(Typography);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
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

  it('should render the digit and data review specimen', () => {
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
