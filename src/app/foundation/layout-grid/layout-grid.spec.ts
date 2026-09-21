import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {App} from '../../app';
import {LayoutGrid} from './layout-grid';

describe('LayoutGrid Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<LayoutGrid>;
  let component: LayoutGrid;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutGrid],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the layout-grid specimen component and have data-theme="light" on root', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#layout-grid-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.getAttribute('data-theme')).toBe('light');
  });

  it('should have the /foundation/layout-grid route defined in routes', () => {
    const layoutRoute = routes.find((r) => r.path === 'foundation/layout-grid');
    expect(layoutRoute).toBeDefined();
  });

  it('should render the layout-grid navigation link in App component with exact label', () => {
    const appFixture = TestBed.createComponent(App);
    appFixture.detectChanges();
    const appCompiled = appFixture.nativeElement as HTMLElement;
    const navLink = appCompiled.querySelector('#nav-link-layout-grid');

    expect(navLink).toBeTruthy();
    expect(navLink?.getAttribute('routerLink')).toBe('/foundation/layout-grid');
    expect(navLink?.textContent?.trim()).toBe('التخطيط والشبكة');
  });

  describe('Section 1: Layout Gap Scale (7 Specimens)', () => {
    it('should render all 7 layout gap specimens (XXS to XXL)', () => {
      const keys = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      keys.forEach((key) => {
        const item = compiled.querySelector(`#gap-specimen-${key}`);
        expect(item).toBeTruthy();
      });
    });

    it('should have exactly 3 neutral generic markers in each gap specimen track', () => {
      const tracks = compiled.querySelectorAll('.gap-demo-track');
      expect(tracks.length).toBe(7);
      tracks.forEach((track) => {
        const markers = track.querySelectorAll('.gap-marker');
        expect(markers.length).toBe(3);
      });
    });
  });

  describe('Section 2: Page Inline Gutter Evidence', () => {
    it('should render the wide generic page-frame specimen and content region', () => {
      const frame = compiled.querySelector('#page-gutter-frame');
      const content = compiled.querySelector('#page-gutter-content-box');
      expect(frame).toBeTruthy();
      expect(content).toBeTruthy();
    });
  });

  describe('Section 3: Grid Gutter Evidence', () => {
    it('should render the grid-gutter specimen with exactly 3 demonstration columns', () => {
      const grid = compiled.querySelector('#grid-gutter-specimen');
      expect(grid).toBeTruthy();
      const cols = grid?.querySelectorAll('.demo-col-card');
      expect(cols?.length).toBe(3);
    });
  });

  describe('Section 4: Viewport Query Probe', () => {
    it('should render the viewport probe container with all three query band elements', () => {
      const probe = compiled.querySelector('#viewport-probe-box');
      expect(probe).toBeTruthy();
      const bandA = compiled.querySelector('#probe-band-down');
      const bandB = compiled.querySelector('#probe-band-between');
      const bandC = compiled.querySelector('#probe-band-up');
      expect(bandA).toBeTruthy();
      expect(bandB).toBeTruthy();
      expect(bandC).toBeTruthy();
    });
  });

  describe('Section 5: Container Query Fixtures', () => {
    it('should render all three named container fixtures (narrow, medium, wide)', () => {
      const narrow = compiled.querySelector('#fixture-narrow');
      const medium = compiled.querySelector('#fixture-medium');
      const wide = compiled.querySelector('#fixture-wide');

      expect(narrow).toBeTruthy();
      expect(medium).toBeTruthy();
      expect(wide).toBeTruthy();
    });

    it('should contain identical generic content structure (3 items) inside every container fixture', () => {
      const fixtures = compiled.querySelectorAll('.container-test-fixture');
      expect(fixtures.length).toBe(3);

      fixtures.forEach((fixtureEl) => {
        const namedTarget = fixtureEl.querySelector('.named-container-target');
        expect(namedTarget).toBeTruthy();

        const indicator = fixtureEl.querySelector('.container-band-status');
        expect(indicator).toBeTruthy();

        const grid = fixtureEl.querySelector('.fixture-content-grid');
        expect(grid).toBeTruthy();

        const items = grid?.querySelectorAll('.cgrid-item');
        expect(items?.length).toBe(3);
      });
    });
  });
});
