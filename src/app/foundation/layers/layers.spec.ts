import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {App} from '../../app';
import {Layers} from './layers';

describe('Layers / Z-Index Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<Layers>;
  let component: Layers;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layers],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Layers);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the layers specimen component and have data-theme="light" on root', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#layers-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.getAttribute('data-theme')).toBe('light');
  });

  it('should have the /foundation/layers route defined in routes', () => {
    const layersRoute = routes.find((r) => r.path === 'foundation/layers');
    expect(layersRoute).toBeDefined();
  });

  it('should render the layers navigation link in App component with exact label and route', () => {
    const appFixture = TestBed.createComponent(App);
    appFixture.detectChanges();
    const appCompiled = appFixture.nativeElement as HTMLElement;
    const navLink = appCompiled.querySelector('#nav-link-layers');

    expect(navLink).toBeTruthy();
    expect(navLink?.getAttribute('routerLink')).toBe('/foundation/layers');
    expect(navLink?.textContent?.trim()).toBe('الطبقات');
  });

  describe('Section 1: Semantic Order List', () => {
    it('should render all 6 semantic layer cards in ascending order', () => {
      const cards = compiled.querySelectorAll('.semantic-layer-card');
      expect(cards.length).toBe(6);

      const expectedIds = [
        'layer-base',
        'layer-sticky',
        'layer-floating',
        'layer-overlay',
        'layer-blocking',
        'layer-notification',
      ];

      expectedIds.forEach((id) => {
        const el = compiled.querySelector(`#${id}`);
        expect(el).toBeTruthy();
      });
    });

    it('should display the strict ordering equation banner', () => {
      const banner = compiled.querySelector('#layer-order-equation-banner');
      expect(banner).toBeTruthy();
      expect(banner?.textContent).toContain('base (0) < sticky (10) < floating (20) < overlay (30) < blocking (40) < notification (50)');
    });
  });

  describe('Section 2: Full Stack Overlap Proof', () => {
    it('should render an isolated full-stack stage with exactly 6 positioned sibling layer cards', () => {
      const stage = compiled.querySelector('#full-stack-stage');
      expect(stage).toBeTruthy();

      const layers = stage?.querySelectorAll('.full-stack-layer');
      expect(layers?.length).toBe(6);

      const expectedLayerClasses = [
        'layer-base',
        'layer-sticky',
        'layer-floating',
        'layer-overlay',
        'layer-blocking',
        'layer-notification',
      ];

      expectedLayerClasses.forEach((cls) => {
        const item = stage?.querySelector(`.${cls}`);
        expect(item).toBeTruthy();
      });
    });
  });

  describe('Section 3: Pairwise Order Proof', () => {
    it('should render exactly 5 pairwise comparison cards', () => {
      const pairs = compiled.querySelectorAll('.pairwise-card');
      expect(pairs.length).toBe(5);

      const expectedPairIds = [
        'pair-base-sticky',
        'pair-sticky-floating',
        'pair-floating-overlay',
        'pair-overlay-blocking',
        'pair-blocking-notification',
      ];

      expectedPairIds.forEach((pairId) => {
        const el = compiled.querySelector(`#${pairId}`);
        expect(el).toBeTruthy();
      });
    });

    it('should have exactly two sibling layer regions in each pairwise stage', () => {
      const stages = compiled.querySelectorAll('.pairwise-stage');
      expect(stages.length).toBe(5);

      stages.forEach((stage) => {
        const regions = stage.querySelectorAll('.pairwise-layer-region');
        expect(regions.length).toBe(2);
      });
    });

    it('should include reversed DOM order tests to prove z-index controls visual stacking', () => {
      // Pair 2: Sticky vs Floating (Floating is 1st in DOM, Sticky 2nd)
      const pair2 = compiled.querySelector('#pair-sticky-floating');
      expect(pair2).toBeTruthy();
      const pair2Regions = pair2?.querySelectorAll('.pairwise-layer-region');
      expect(pair2Regions?.[0].classList.contains('layer-floating')).toBe(true);
      expect(pair2Regions?.[1].classList.contains('layer-sticky')).toBe(true);

      // Pair 4: Overlay vs Blocking (Blocking is 1st in DOM, Overlay 2nd)
      const pair4 = compiled.querySelector('#pair-overlay-blocking');
      expect(pair4).toBeTruthy();
      const pair4Regions = pair4?.querySelectorAll('.pairwise-layer-region');
      expect(pair4Regions?.[0].classList.contains('layer-blocking')).toBe(true);
      expect(pair4Regions?.[1].classList.contains('layer-overlay')).toBe(true);

      // Pair 5: Blocking vs Notification (Notification is 1st in DOM, Blocking 2nd)
      const pair5 = compiled.querySelector('#pair-blocking-notification');
      expect(pair5).toBeTruthy();
      const pair5Regions = pair5?.querySelectorAll('.pairwise-layer-region');
      expect(pair5Regions?.[0].classList.contains('layer-notification')).toBe(true);
      expect(pair5Regions?.[1].classList.contains('layer-blocking')).toBe(true);
    });
  });
});
