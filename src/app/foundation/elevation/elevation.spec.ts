import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {App} from '../../app';
import {Elevation} from './elevation';

describe('Elevation Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<Elevation>;
  let component: Elevation;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elevation],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Elevation);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the elevation specimen component and have data-theme="light" on root', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#elevation-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.getAttribute('data-theme')).toBe('light');
  });

  it('should have the /foundation/elevation route defined in routes', () => {
    const elevationRoute = routes.find((r) => r.path === 'foundation/elevation');
    expect(elevationRoute).toBeDefined();
  });

  it('should render the elevation navigation link in App component', () => {
    const appFixture = TestBed.createComponent(App);
    appFixture.detectChanges();
    const appCompiled = appFixture.nativeElement as HTMLElement;
    const elevationLink = appCompiled.querySelector('#nav-link-elevation');

    expect(elevationLink).toBeTruthy();
    expect(elevationLink?.getAttribute('routerLink')).toBe('/foundation/elevation');
    expect(elevationLink?.textContent?.trim()).toContain('الارتفاع والظلال');
  });

  describe('Section 1: Reference Shadow Geometry', () => {
    it('should render all 3 Reference geometry specimens (None, Geometry 1, Geometry 2)', () => {
      const noneSpecimen = compiled.querySelector('#ref-geom-none');
      const geom1Specimen = compiled.querySelector('#ref-geom-level-1');
      const geom2Specimen = compiled.querySelector('#ref-geom-level-2');

      expect(noneSpecimen).toBeTruthy();
      expect(geom1Specimen).toBeTruthy();
      expect(geom2Specimen).toBeTruthy();

      expect(noneSpecimen?.textContent).toContain('$honesty-ref-elevation-shadow-none');
      expect(geom1Specimen?.textContent).toContain('$honesty-ref-elevation-shadow-geometry-1');
      expect(geom2Specimen?.textContent).toContain('$honesty-ref-elevation-shadow-geometry-2');
    });
  });

  describe('Section 2: Reference Shadow Alpha Transparency', () => {
    it('should render all 4 Reference alpha specimens (0.08, 0.14, 0.28, 0.40)', () => {
      const alpha08 = compiled.querySelector('#ref-alpha-08');
      const alpha14 = compiled.querySelector('#ref-alpha-14');
      const alpha28 = compiled.querySelector('#ref-alpha-28');
      const alpha40 = compiled.querySelector('#ref-alpha-40');

      expect(alpha08).toBeTruthy();
      expect(alpha14).toBeTruthy();
      expect(alpha28).toBeTruthy();
      expect(alpha40).toBeTruthy();

      expect(alpha08?.textContent).toContain('$honesty-ref-elevation-shadow-alpha-08');
      expect(alpha14?.textContent).toContain('$honesty-ref-elevation-shadow-alpha-14');
      expect(alpha28?.textContent).toContain('$honesty-ref-elevation-shadow-alpha-28');
      expect(alpha40?.textContent).toContain('$honesty-ref-elevation-shadow-alpha-40');
    });
  });

  describe('Section 3: Semantic Elevation (Light vs Dark Themes)', () => {
    it('should render Light theme semantic context with None, Raised, and Overlay', () => {
      const lightContext = compiled.querySelector('#semantic-context-light');
      expect(lightContext).toBeTruthy();
      expect(lightContext?.getAttribute('data-theme')).toBe('light');

      const noneSample = lightContext?.querySelector('#semantic-light-none');
      const raisedSample = lightContext?.querySelector('#semantic-light-raised');
      const overlaySample = lightContext?.querySelector('#semantic-light-overlay');

      expect(noneSample).toBeTruthy();
      expect(raisedSample).toBeTruthy();
      expect(overlaySample).toBeTruthy();

      expect(noneSample?.textContent).toContain('--honesty-elevation-none');
      expect(raisedSample?.textContent).toContain('--honesty-elevation-raised');
      expect(overlaySample?.textContent).toContain('--honesty-elevation-overlay');
    });

    it('should render Dark theme semantic context with None, Raised, and Overlay', () => {
      const darkContext = compiled.querySelector('#semantic-context-dark');
      expect(darkContext).toBeTruthy();
      expect(darkContext?.getAttribute('data-theme')).toBe('dark');

      const noneSample = darkContext?.querySelector('#semantic-dark-none');
      const raisedSample = darkContext?.querySelector('#semantic-dark-raised');
      const overlaySample = darkContext?.querySelector('#semantic-dark-overlay');

      expect(noneSample).toBeTruthy();
      expect(raisedSample).toBeTruthy();
      expect(overlaySample).toBeTruthy();

      expect(noneSample?.textContent).toContain('--honesty-elevation-none');
      expect(raisedSample?.textContent).toContain('--honesty-elevation-raised');
      expect(overlaySample?.textContent).toContain('--honesty-elevation-overlay');
    });
  });

  describe('Section 4: Contextual Floating-Layer Review', () => {
    it('should render contextual Light example with base, floating, and raised regions', () => {
      const lightCase = compiled.querySelector('#contextual-case-light');
      expect(lightCase).toBeTruthy();
      expect(lightCase?.getAttribute('data-theme')).toBe('light');

      const baseRegion = lightCase?.querySelector('#contextual-base-light');
      const floatingRegion = lightCase?.querySelector('#contextual-floating-light');
      const raisedRegion = lightCase?.querySelector('#contextual-raised-light');

      expect(baseRegion).toBeTruthy();
      expect(floatingRegion).toBeTruthy();
      expect(raisedRegion).toBeTruthy();

      expect(baseRegion?.textContent).toContain('--honesty-elevation-none');
      expect(floatingRegion?.textContent).toContain('--honesty-elevation-overlay');
      expect(raisedRegion?.textContent).toContain('--honesty-elevation-raised');
    });

    it('should render contextual Dark example with base, floating, and raised regions', () => {
      const darkCase = compiled.querySelector('#contextual-case-dark');
      expect(darkCase).toBeTruthy();
      expect(darkCase?.getAttribute('data-theme')).toBe('dark');

      const baseRegion = darkCase?.querySelector('#contextual-base-dark');
      const floatingRegion = darkCase?.querySelector('#contextual-floating-dark');
      const raisedRegion = darkCase?.querySelector('#contextual-raised-dark');

      expect(baseRegion).toBeTruthy();
      expect(floatingRegion).toBeTruthy();
      expect(raisedRegion).toBeTruthy();

      expect(baseRegion?.textContent).toContain('--honesty-elevation-none');
      expect(floatingRegion?.textContent).toContain('--honesty-elevation-overlay');
      expect(raisedRegion?.textContent).toContain('--honesty-elevation-raised');
    });
  });
});
