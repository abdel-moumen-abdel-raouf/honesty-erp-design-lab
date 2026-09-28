import {TestBed} from '@angular/core/testing';
import {routes} from '../../app.routes';
import {Charts} from './charts';

describe('Charts Specimen', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Charts],
    }).compileComponents();
  });

  it('should create the charts specimen component', () => {
    const fixture = TestBed.createComponent(Charts);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have the /foundation/charts route defined in routes', () => {
    const chartsRoute = routes.find((route) => route.path === 'foundation/charts');
    expect(chartsRoute).toBeDefined();
  });

  it('should render one current-theme review context without local theme authority', () => {
    const fixture = TestBed.createComponent(Charts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const context = compiled.querySelector('#chart-context-current');

    expect(context).toBeTruthy();
    expect(context?.hasAttribute('data-theme')).toBe(false);
  });

  it('should render exactly five ordinal categorical swatches in the inherited theme', () => {
    const fixture = TestBed.createComponent(Charts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const swatches = compiled.querySelectorAll('#chart-context-current .categorical-swatch');

    expect(swatches.length).toBe(5);
    expect(Array.from(swatches).map((swatch) => swatch.textContent?.trim())).toEqual([
      'Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5',
    ]);
  });

  it('should render a grouped-bar fixture with five series in the inherited theme', () => {
    const fixture = TestBed.createComponent(Charts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const fixtures = compiled.querySelectorAll('.grouped-bar-chart');
    expect(fixtures.length).toBe(1);
    for (const chart of fixtures) {
      expect(chart.querySelectorAll('.bar-series').length).toBe(5);
    }
  });

  it('should render a multi-line fixture with five line series in the inherited theme', () => {
    const fixture = TestBed.createComponent(Charts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const fixtures = compiled.querySelectorAll('.multi-line-chart');
    expect(fixtures.length).toBe(1);
    for (const chart of fixtures) {
      expect(chart.querySelectorAll('.line-series').length).toBe(5);
    }
  });

  it('should render exactly four separate status and delta roles in the inherited theme', () => {
    const fixture = TestBed.createComponent(Charts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const reviews = compiled.querySelectorAll('.status-review');
    expect(reviews.length).toBe(1);
    for (const review of reviews) {
      expect(review.querySelectorAll('[data-status-role]').length).toBe(4);
    }
  });

  it('should render Gridline, Axis, and Label structural evidence in the inherited theme', () => {
    const fixture = TestBed.createComponent(Charts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const reviews = compiled.querySelectorAll('.structural-review');
    expect(reviews.length).toBe(1);
    for (const review of reviews) {
      expect(review.querySelector('[data-structural-role="gridline"]')).toBeTruthy();
      expect(review.querySelector('[data-structural-role="axis"]')).toBeTruthy();
      expect(review.querySelector('[data-structural-role="label"]')).toBeTruthy();
    }
  });
});
