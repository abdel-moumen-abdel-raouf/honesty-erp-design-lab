import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {ERP_TEXT_TYPE_DEFAULTS} from '../../primitives/text/text';
import {TypographyPrimitives} from './typography-primitives';

describe('TypographyPrimitives showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyPrimitives],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('has the /primitives/typography route', () => {
    expect(routes.find((route) => route.path === 'primitives/typography')).toBeDefined();
  });

  it('creates', () => {
    expect(TestBed.createComponent(TypographyPrimitives).componentInstance).toBeTruthy();
  });

  it('uses a Light theme review root and exactly seven major groups', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('erp-container.typography-showcase')?.getAttribute('data-theme')).toBe(
      'light',
    );
    expect(compiled.querySelectorAll('[data-review-group]').length).toBe(7);
  });

  it('renders evidence for every ErpTextType', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const renderedTypes = new Set(
      [...compiled.querySelectorAll('[data-text-type]')].map((element) => {
        return element.getAttribute('data-text-type');
      }),
    );

    for (const type of Object.keys(ERP_TEXT_TYPE_DEFAULTS)) {
      expect(renderedTypes.has(type)).toBe(true);
    }
  });

  it('renders both custom and native-host ErpText usage', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('erp-text[data-text-type]')).toBeTruthy();
    expect(compiled.querySelector('[erptext][data-text-type]')).toBeTruthy();
  });

  it('uses native ErpText hosts for headings, links, and table text', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const level of [1, 2, 3, 4, 5, 6]) {
      expect(
        compiled.querySelector(`h${level}[erptext][data-text-type="heading-${level}"]`),
      ).toBeTruthy();
    }

    expect(compiled.querySelector('a[erptext][data-text-type="link"]')).toBeTruthy();
    expect(compiled.querySelector('caption[erptext][data-text-type="caption"]')).toBeTruthy();
    expect(compiled.querySelector('th[erptext][data-text-type="table-header"]')).toBeTruthy();
    expect(compiled.querySelector('td[erptext][data-text-type="table-cell"]')).toBeTruthy();
  });

  it('uses ErpDivider and contains no raw hr', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('erp-divider')).toBeTruthy();
    expect(compiled.querySelectorAll('hr').length).toBe(0);
  });

  it('renders code, keyboard, sample, and variable evidence', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('[data-text-type="code"]')).toBeTruthy();
    expect(compiled.querySelector('[data-text-type="keyboard"]')).toBeTruthy();
    expect(compiled.querySelector('[data-text-type="sample"]')).toBeTruthy();
    expect(compiled.querySelector('[data-text-type="variable"]')).toBeTruthy();
  });

  it('places the native summary directly inside details', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const summary = fixture.nativeElement.querySelector('summary[erptext]') as HTMLElement | null;

    expect(summary).toBeTruthy();
    expect(summary?.parentElement?.tagName).toBe('DETAILS');
  });

  it('exercises the ErpText direction API on the native bdo host', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const bdo = fixture.nativeElement.querySelector('bdo[erptext]') as HTMLElement | null;

    expect(bdo?.getAttribute('data-text-type')).toBe('bdo');
    expect(bdo?.getAttribute('dir')).toBe('ltr');
  });

  it('identifies the custom-host ellipsis evidence', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const ellipsis = fixture.nativeElement.querySelector('#ellipsis-proof') as HTMLElement | null;

    expect(ellipsis?.getAttribute('data-text-overflow')).toBe('ellipsis');
  });

  it('records the conflicting public inputs for clamp precedence evidence', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const clamp = fixture.nativeElement.querySelector(
      '#clamp-precedence-proof',
    ) as HTMLElement | null;

    expect(clamp?.getAttribute('data-text-overflow')).toBe('ellipsis');
    expect(clamp?.getAttribute('data-text-wrap')).toBe('nowrap');
    expect(clamp?.getAttribute('data-text-line-clamp')).toBe('2');
  });
});
