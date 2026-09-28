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

  it('should create the elevation specimen component and inherit the global theme', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#elevation-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.hasAttribute('data-theme')).toBe(false);
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

  describe('Section 3: Semantic Elevation under inherited App theme', () => {
    it('should render one semantic elevation context under the inherited App theme', () => {
      const context = compiled.querySelector('#semantic-context-current');
      expect(context).toBeTruthy();
      expect(context?.hasAttribute('data-theme')).toBe(false);
      expect(context?.querySelector('#semantic-current-none')).toBeTruthy();
      expect(context?.querySelector('#semantic-current-raised')).toBeTruthy();
      expect(context?.querySelector('#semantic-current-overlay')).toBeTruthy();
    });
  });

  describe('Section 4: Contextual Floating-Layer Review', () => {
    it('should render one contextual elevation example under the inherited App theme', () => {
      const currentCase = compiled.querySelector('#contextual-case-current');
      expect(currentCase).toBeTruthy();
      expect(currentCase?.hasAttribute('data-theme')).toBe(false);
      expect(currentCase?.querySelector('#contextual-base-current')).toBeTruthy();
      expect(currentCase?.querySelector('#contextual-floating-current')).toBeTruthy();
      expect(currentCase?.querySelector('#contextual-raised-current')).toBeTruthy();
    });
  });
});
