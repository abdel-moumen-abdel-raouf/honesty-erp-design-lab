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

  it('renders evidence for all 54 ErpText types', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const renderedTypes = new Set(
      [...compiled.querySelectorAll('erp-text[data-text-type]')].map((element) => {
        return element.getAttribute('data-text-type');
      }),
    );

    expect(Object.keys(ERP_TEXT_TYPE_DEFAULTS).length).toBe(54);
    for (const type of Object.keys(ERP_TEXT_TYPE_DEFAULTS)) {
      expect(renderedTypes.has(type)).toBe(true);
    }
  });

  it('uses only custom ErpText authoring', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[erptext]').length).toBe(0);
    expect(compiled.querySelector('erp-text[data-text-type]')).toBeTruthy();
  });

  it('contains custom ErpText heading-1 through heading-6 evidence', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const level of [1, 2, 3, 4, 5, 6]) {
      expect(compiled.querySelector(`erp-text[data-text-type="heading-${level}"]`)).toBeTruthy();
    }
  });

  it('contains the required direct custom type evidence', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const requiredTypes = [
      'paragraph',
      'div',
      'strong',
      'code',
      'label',
      'link',
      'table-cell',
      'summary',
      'bdi',
      'bdo',
    ];

    for (const type of requiredTypes) {
      expect(compiled.querySelector(`erp-text[data-text-type="${type}"]`)).toBeTruthy();
    }
  });

  it('renders one internal anchor for the interactive link proof', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const proof = compiled.querySelector('#interactive-link-proof') as HTMLElement | null;

    expect(proof).toBeTruthy();
    expect(proof?.querySelectorAll('a').length).toBe(1);
    expect(proof?.querySelector('a')?.getAttribute('href')).toBe('#link-proof');
  });

  it('keeps ErpDivider and contains no raw hr', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('erp-divider')).toBeTruthy();
    expect(compiled.querySelectorAll('hr').length).toBe(0);
  });

  it('preserves ellipsis, clamp precedence, and bdo direction evidence', () => {
    const fixture = TestBed.createComponent(TypographyPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const ellipsis = compiled.querySelector('#ellipsis-proof');
    const clamp = compiled.querySelector('#clamp-precedence-proof');
    const bdo = compiled.querySelector('erp-text[data-text-type="bdo"][dir="ltr"]');

    expect(ellipsis?.getAttribute('data-text-overflow')).toBe('ellipsis');
    expect(clamp?.getAttribute('data-text-overflow')).toBe('ellipsis');
    expect(clamp?.getAttribute('data-text-wrap')).toBe('nowrap');
    expect(clamp?.getAttribute('data-text-line-clamp')).toBe('2');
    expect(bdo?.querySelector('bdo')?.getAttribute('dir')).toBe('ltr');
  });
});
