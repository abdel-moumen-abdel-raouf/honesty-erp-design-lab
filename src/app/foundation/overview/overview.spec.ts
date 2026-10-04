import {TestBed} from '@angular/core/testing';
import {
  FOUNDATION_CURRENT_REVIEW_FAMILIES,
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

const EXPECTED_PRODUCTION_REVIEW_ROUTES = [
  '/primitives/structural',
  '/primitives/typography',
  '/primitives/icons',
  '/controls/buttons',
  '/controls/tooltips',
  '/controls/inputs',
  '/controls/empty-states',
  '/controls/overlays',
] as const;

describe('Foundation Overview', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Overview],
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

  it('renders all Foundation domains and the current production review inventory', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productionLinks = Array.from(
      compiled.querySelectorAll<HTMLElement>(
        'erp-text[data-review-family-link] a'
      )
    );
    const foundationLinks = Array.from(
      compiled.querySelectorAll<HTMLElement>('erp-text[data-domain-link] a')
    );

    expect(compiled.querySelectorAll('[data-domain-entry]')).toHaveLength(12);
    expect(foundationLinks).toHaveLength(14);
    expect(compiled.querySelectorAll('[data-review-family]')).toHaveLength(8);
    expect(productionLinks).toHaveLength(8);
    expect(FOUNDATION_CURRENT_REVIEW_FAMILIES).toHaveLength(8);
    expect(productionLinks.map((link) => link.getAttribute('href'))).toEqual([
      ...EXPECTED_PRODUCTION_REVIEW_ROUTES,
    ]);
    expect(foundationLinks.map((link) => link.getAttribute('href'))).toEqual([
      ...EXPECTED_REVIEW_ROUTES,
    ]);
  });

  it('renders the current factual implementation-review status in English and Arabic', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(FOUNDATION_OVERALL_STATUS.english).toBe(
      'Foundation established; production review surfaces are implemented and under Product Owner review'
    );
    expect(text).toContain(FOUNDATION_OVERALL_STATUS.english);
    expect(text).toContain(FOUNDATION_OVERALL_STATUS.arabic);
  });

  it('renders exactly six major ERP sections including the production review families', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = Array.from(
      compiled.querySelectorAll<HTMLElement>(
        'erp-section[data-overview-section]'
      )
    );

    expect(sections).toHaveLength(6);
    expect(
      sections.map((section) =>
        section
          .querySelector('erp-text[data-text-type="heading-2"]')
          ?.textContent?.trim()
      )
    ).toEqual([
      'حالة الأساس',
      'عائلات مراجعة الإنتاج الحالية',
      'مجالات الأساس',
      'حدود V1 والطبقات التالية',
      'محفزات إعادة الفتح',
      'حالة المراجعة',
    ]);
  });

  it('documents that Surface review is consolidated into Themes', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const note = compiled.querySelector('[data-surfaces-consolidation]');
    const surfaces = FOUNDATION_OVERVIEW_DOMAINS.find(
      (domain) => domain.id === 'themes-feedback-surfaces',
    );

    expect(note?.textContent).toContain('/foundation/themes');
    expect(note?.textContent?.trim()).toBe(surfaces?.note);
  });

  it('renders exactly 5 next-layer decisions and 3 frozen V1 constraints', () => {
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

    expect(nextLayerList?.hasAttribute('dir')).toBe(false);
    expect(constraintList?.hasAttribute('dir')).toBe(false);
    expect(nextLayerItems).toHaveLength(5);
    expect(constraintItems).toHaveLength(3);
    expect(
      nextLayerItems.map((item) => item.textContent?.trim().replace(/^•\s*/, ''))
    ).toEqual([...FOUNDATION_NEXT_LAYER_DECISIONS]);
    expect(
      constraintItems.map((item) =>
        item.textContent?.trim().replace(/^•\s*/, '')
      )
    ).toEqual([...FOUNDATION_V1_CONSTRAINTS]);
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

  it('renders every specified domain reopen trigger through ERP text', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const triggers = Array.from(
      compiled.querySelectorAll<HTMLElement>(
        '[data-reopen-trigger] erp-text[data-text-type="description"]'
      )
    );

    expect(triggers).toHaveLength(12);
    expect(triggers.map((trigger) => trigger.textContent?.trim())).toEqual(
      FOUNDATION_OVERVIEW_DOMAINS.map((domain) => domain.reopenTrigger)
    );
  });

  it('records technical candidates without declaring visual approval or freeze', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const gate = compiled.querySelector('#closure-gate');
    const statements = Array.from(
      gate?.querySelectorAll<HTMLElement>('[data-closure-statement]') ?? []
    ).map((item) => item.textContent?.trim().replace(/^•\s*/, ''));

    expect(statements).toHaveLength(4);
    expect(statements[0]).toContain('عقود التأسيس');
    expect(statements[1]).toContain('مرشحة للمراجعة الفنية');
    expect(statements[2]).toContain('الموافقة البصرية من مالك المنتج معلقة');
    expect(statements[3]).toContain(
      'لا يُعد بمثابة إقرار بالموافقة البصرية أو تجميد'
    );
    expect(gate?.querySelector('erp-button')).toBeNull();
  });
});
