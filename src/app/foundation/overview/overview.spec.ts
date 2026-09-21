import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter, RouterLink} from '@angular/router';
import {routes} from '../../app.routes';
import {
  FOUNDATION_NEXT_LAYER_DECISIONS,
  FOUNDATION_OVERALL_STATUS,
  FOUNDATION_OVERVIEW_DOMAINS,
  FOUNDATION_V1_CONSTRAINTS,
} from './overview.data';
import {Overview} from './overview';

const EXPECTED_REVIEW_ROUTES = [
  '/foundation/colors',
  '/foundation/colors/status-hues',
  '/foundation/themes',
  '/foundation/feedback-colors',
  '/foundation/typography',
  '/foundation/charts',
  '/foundation/preferences',
  '/foundation/spacing',
  '/foundation/borders-radius',
  '/foundation/elevation',
  '/foundation/motion',
  '/foundation/density',
  '/foundation/layout-grid',
  '/foundation/layers',
] as const;

describe('Foundation Overview', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Overview],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('defines exactly 12 logical domains and 14 review links', () => {
    expect(FOUNDATION_OVERVIEW_DOMAINS).toHaveLength(12);
    expect(
      FOUNDATION_OVERVIEW_DOMAINS.flatMap((domain) => domain.reviewLinks)
    ).toHaveLength(14);
    expect(FOUNDATION_OVERVIEW_DOMAINS[0].reviewLinks).toHaveLength(2);
    expect(FOUNDATION_OVERVIEW_DOMAINS[1].reviewLinks).toHaveLength(2);

    for (const domain of FOUNDATION_OVERVIEW_DOMAINS.slice(2)) {
      expect(domain.reviewLinks).toHaveLength(1);
    }
  });

  it('renders all domains and the exact flattened 14-route review sequence', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));

    expect(compiled.querySelectorAll('[data-domain-entry]')).toHaveLength(12);
    expect(compiled.querySelectorAll('[data-domain-link]')).toHaveLength(14);
    expect(links).toHaveLength(14);
    expect(links.map((link) => link.injector.get(RouterLink).href)).toEqual([
      ...EXPECTED_REVIEW_ROUTES,
    ]);
  });

  it('renders the unchanged overall closure-review status in English and Arabic', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(FOUNDATION_OVERALL_STATUS.english).toBe(
      'Ready for Product Owner final closure review'
    );
    expect(text).toContain(FOUNDATION_OVERALL_STATUS.english);
    expect(text).toContain(FOUNDATION_OVERALL_STATUS.arabic);
  });

  it('renders exactly five major sections with the reconciled third section', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = Array.from(
      compiled.querySelectorAll<HTMLElement>('[data-overview-section]')
    );

    expect(sections).toHaveLength(5);
    expect(sections.map((section) => section.querySelector('h2')?.textContent?.trim())).toEqual([
      'حالة الأساس',
      'مجالات الأساس',
      'حدود V1 والطبقات التالية',
      'محفزات إعادة الفتح',
      'بوابة الإغلاق',
    ]);
  });

  it('documents that Surface review is consolidated into Themes', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const note = compiled.querySelector('[data-surfaces-consolidation]');

    expect(note?.textContent).toContain('/foundation/themes');
    expect(note?.textContent).toContain(
      'Surface review is consolidated there because the same Light/Dark Surface hierarchy has already been reviewed there'
    );
  });

  it('renders exactly 10 next-layer decisions and 3 frozen V1 constraints in LTR lists', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const nextLayerList = compiled.querySelector('[data-next-layer-list]');
    const constraintList = compiled.querySelector('[data-v1-constraint-list]');
    const nextLayerItems = Array.from(
      compiled.querySelectorAll<HTMLElement>('[data-next-layer-item]')
    );
    const constraintItems = Array.from(
      compiled.querySelectorAll<HTMLElement>('[data-v1-constraint-item]')
    );

    expect(nextLayerList?.getAttribute('dir')).toBe('ltr');
    expect(constraintList?.getAttribute('dir')).toBe('ltr');
    expect(nextLayerItems).toHaveLength(10);
    expect(constraintItems).toHaveLength(3);
    expect(nextLayerItems.map((item) => item.textContent?.trim())).toEqual([
      ...FOUNDATION_NEXT_LAYER_DECISIONS,
    ]);
    expect(constraintItems.map((item) => item.textContent?.trim())).toEqual([
      ...FOUNDATION_V1_CONSTRAINTS,
    ]);
  });

  it('removes resolved Brand, Focus, and Chart-after-Brand items from unresolved lists', () => {
    const unresolved = [
      ...FOUNDATION_NEXT_LAYER_DECISIONS,
      ...FOUNDATION_V1_CONSTRAINTS,
    ];

    expect(unresolved).not.toContain('Secondary / Accent palettes');
    expect(unresolved).not.toContain('Focus-ring geometry');
    expect(unresolved).not.toContain(
      'Chart categorical palette reconsideration after Secondary/Accent'
    );
  });

  it('renders every specified domain reopen trigger', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const triggers = Array.from(
      compiled.querySelectorAll<HTMLElement>('[data-reopen-trigger] dd')
    );

    expect(triggers).toHaveLength(12);
    expect(triggers.map((trigger) => trigger.textContent?.trim())).toEqual(
      FOUNDATION_OVERVIEW_DOMAINS.map((domain) => domain.reopenTrigger)
    );
  });

  it('keeps final freeze behind explicit Product Owner approval without an action', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const gate = compiled.querySelector('#closure-gate');

    expect(gate?.textContent).toContain(
      'Lower-layer Foundation Candidate V1 contracts are assembled for final Product Owner closure review.'
    );
    expect(gate?.textContent).toContain(
      'Next-layer decisions and frozen V1 constraints are documented.'
    );
    expect(gate?.textContent).toContain('Final freeze has NOT happened yet.');
    expect(gate?.textContent).toContain(
      'Product Owner explicit approval is required before entering production primitives/components.'
    );
    expect(gate?.querySelector('button')).toBeNull();
  });
});
