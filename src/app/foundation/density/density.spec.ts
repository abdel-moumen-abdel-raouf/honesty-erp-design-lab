import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {App} from '../../app';
import {Density} from './density';

describe('Density Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<Density>;
  let component: Density;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Density],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Density);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the density specimen component and have data-theme="light" on root', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#density-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.getAttribute('data-theme')).toBe('light');
  });

  it('should not have data-density on the root element itself', () => {
    const root = compiled.querySelector('#density-specimen-root');
    expect(root?.hasAttribute('data-density')).toBe(false);
  });

  it('should have the /foundation/density route defined in routes', () => {
    const densityRoute = routes.find((r) => r.path === 'foundation/density');
    expect(densityRoute).toBeDefined();
  });

  it('should render the density navigation link in App component', () => {
    const appFixture = TestBed.createComponent(App);
    appFixture.detectChanges();
    const appCompiled = appFixture.nativeElement as HTMLElement;
    const densityLink = appCompiled.querySelector('#nav-link-density');

    expect(densityLink).toBeTruthy();
    expect(densityLink?.getAttribute('routerLink')).toBe('/foundation/density');
    expect(densityLink?.textContent?.trim()).toBe('الكثافة');
  });

  describe('Section 1: Primary Density Comparison', () => {
    it('should render all three density context columns with exact data-density attributes', () => {
      const compactCol = compiled.querySelector('#context-compact');
      const comfortableCol = compiled.querySelector('#context-comfortable');
      const spaciousCol = compiled.querySelector('#context-spacious');

      expect(compactCol).toBeTruthy();
      expect(compactCol?.getAttribute('data-density')).toBe('compact');

      expect(comfortableCol).toBeTruthy();
      expect(comfortableCol?.getAttribute('data-density')).toBe('comfortable');

      expect(spaciousCol).toBeTruthy();
      expect(spaciousCol?.getAttribute('data-density')).toBe('spacious');
    });

    it('should have identical repeated data rows and structure in each density column', () => {
      ['compact', 'comfortable', 'spacious'].forEach((mode) => {
        const col = compiled.querySelector(`#context-${mode}`);
        expect(col).toBeTruthy();

        const row1 = col?.querySelector(`#${mode}-row-1`);
        const row2 = col?.querySelector(`#${mode}-row-2`);
        const row3 = col?.querySelector(`#${mode}-row-3`);

        expect(row1).toBeTruthy();
        expect(row2).toBeTruthy();
        expect(row3).toBeTruthy();

        expect(row1?.textContent).toContain('14,500.00 ر.س');
        expect(row2?.textContent).toContain('2,175.00 ر.س');
        expect(row3?.textContent).toContain('16,675.00 ر.س');
      });
    });
  });

  describe('Section 2: Inline Spacing Invariance', () => {
    it('should render inline demo for compact, comfortable, and spacious', () => {
      const section = compiled.querySelector('#section-inline-invariance');
      expect(section).toBeTruthy();

      const compactCard = section?.querySelector('#inline-demo-compact');
      const comfortableCard = section?.querySelector('#inline-demo-comfortable');
      const spaciousCard = section?.querySelector('#inline-demo-spacious');

      expect(compactCard?.getAttribute('data-density')).toBe('compact');
      expect(comfortableCard?.getAttribute('data-density')).toBe('comfortable');
      expect(spaciousCard?.getAttribute('data-density')).toBe('spacious');
    });
  });

  describe('Section 3: Section Gap Invariance', () => {
    it('should render section gap demo for compact, comfortable, and spacious', () => {
      const section = compiled.querySelector('#section-section-gap-invariance');
      expect(section).toBeTruthy();

      const compactCard = section?.querySelector('#section-gap-demo-compact');
      const comfortableCard = section?.querySelector('#section-gap-demo-comfortable');
      const spaciousCard = section?.querySelector('#section-gap-demo-spacious');

      expect(compactCard?.getAttribute('data-density')).toBe('compact');
      expect(comfortableCard?.getAttribute('data-density')).toBe('comfortable');
      expect(spaciousCard?.getAttribute('data-density')).toBe('spacious');
    });
  });

  describe('Section 4: Typography Invariance', () => {
    it('should render typography comparison for compact, comfortable, and spacious', () => {
      const section = compiled.querySelector('#section-typography-invariance');
      expect(section).toBeTruthy();

      const compactCard = section?.querySelector('#typography-demo-compact');
      const comfortableCard = section?.querySelector('#typography-demo-comfortable');
      const spaciousCard = section?.querySelector('#typography-demo-spacious');

      expect(compactCard?.getAttribute('data-density')).toBe('compact');
      expect(comfortableCard?.getAttribute('data-density')).toBe('comfortable');
      expect(spaciousCard?.getAttribute('data-density')).toBe('spacious');
    });
  });

  describe('Section 5: Nested Density Restoration', () => {
    it('should render parent with data-density="compact"', () => {
      const parent = compiled.querySelector('#nested-parent-compact');
      expect(parent).toBeTruthy();
      expect(parent?.getAttribute('data-density')).toBe('compact');
    });

    it('should render child A without data-density (inheriting) and child B with data-density="comfortable" (restoring)', () => {
      const childInherited = compiled.querySelector('#nested-child-inherited');
      const childRestored = compiled.querySelector('#nested-child-restored');

      expect(childInherited).toBeTruthy();
      expect(childInherited?.hasAttribute('data-density')).toBe(false);

      expect(childRestored).toBeTruthy();
      expect(childRestored?.getAttribute('data-density')).toBe('comfortable');
    });
  });
});
