import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter, RouterLink} from '@angular/router';
import {routes} from '../../app.routes';
import {
  FOUNDATION_DEFERRED_DECISIONS,
  FOUNDATION_OVERALL_STATUS,
  FOUNDATION_OVERVIEW_DOMAINS,
} from './overview.data';
import {Overview} from './overview';

describe('Foundation Overview', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Overview],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('defines exactly the 12 specified Foundation domain entries', () => {
    expect(FOUNDATION_OVERVIEW_DOMAINS).toHaveLength(12);
  });

  it('renders all 12 domains and their 12 review links', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));

    expect(compiled.querySelectorAll('[data-domain-entry]')).toHaveLength(12);
    expect(compiled.querySelectorAll('[data-domain-link]')).toHaveLength(12);
    expect(links).toHaveLength(12);
    expect(
      links.map((link) => link.injector.get(RouterLink).href)
    ).toEqual(FOUNDATION_OVERVIEW_DOMAINS.map((domain) => domain.reviewRoute));
  });

  it('renders the overall closure-review status in English and Arabic', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain(FOUNDATION_OVERALL_STATUS.english);
    expect(text).toContain(FOUNDATION_OVERALL_STATUS.arabic);
  });

  it('renders exactly the five specified major sections', () => {
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
      'القرارات المؤجلة المقصودة',
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

  it('renders exactly the 14 specified intentional deferrals', () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = Array.from(
      compiled.querySelectorAll<HTMLElement>('[data-deferred-item]')
    );

    expect(items).toHaveLength(14);
    expect(items.map((item) => item.textContent?.trim())).toEqual([
      ...FOUNDATION_DEFERRED_DECISIONS,
    ]);
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

    expect(gate?.textContent).toContain('Final freeze has NOT happened yet.');
    expect(gate?.textContent).toContain(
      'Product Owner explicit approval is required before entering production primitives/components.'
    );
    expect(gate?.querySelector('button')).toBeNull();
  });
});
