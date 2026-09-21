import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {App} from '../../app';
import {Motion} from './motion';

describe('Motion Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<Motion>;
  let component: Motion;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Motion],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Motion);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the motion specimen component and have data-theme="light" on root', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#motion-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.getAttribute('data-theme')).toBe('light');
  });

  it('should have the /foundation/motion route defined in routes', () => {
    const motionRoute = routes.find((r) => r.path === 'foundation/motion');
    expect(motionRoute).toBeDefined();
  });

  it('should render the motion navigation link in App component', () => {
    const appFixture = TestBed.createComponent(App);
    appFixture.detectChanges();
    const appCompiled = appFixture.nativeElement as HTMLElement;
    const motionLink = appCompiled.querySelector('#nav-link-motion');

    expect(motionLink).toBeTruthy();
    expect(motionLink?.getAttribute('routerLink')).toBe('/foundation/motion');
    expect(motionLink?.textContent?.trim()).toBe('الحركة');
  });

  describe('Section 1: Duration Comparison', () => {
    it('should render all 5 duration tracks and their markers', () => {
      const instantTrack = compiled.querySelector('#duration-track-instant');
      const fastTrack = compiled.querySelector('#duration-track-fast');
      const defaultTrack = compiled.querySelector('#duration-track-default');
      const slowTrack = compiled.querySelector('#duration-track-slow');
      const deliberateTrack = compiled.querySelector('#duration-track-deliberate');

      expect(instantTrack).toBeTruthy();
      expect(fastTrack).toBeTruthy();
      expect(defaultTrack).toBeTruthy();
      expect(slowTrack).toBeTruthy();
      expect(deliberateTrack).toBeTruthy();

      expect(instantTrack?.textContent).toContain('--honesty-motion-duration-instant');
      expect(fastTrack?.textContent).toContain('--honesty-motion-duration-fast');
      expect(defaultTrack?.textContent).toContain('--honesty-motion-duration-default');
      expect(slowTrack?.textContent).toContain('--honesty-motion-duration-slow');
      expect(deliberateTrack?.textContent).toContain('--honesty-motion-duration-deliberate');

      const instantMarker = compiled.querySelector('#duration-marker-instant');
      const fastMarker = compiled.querySelector('#duration-marker-fast');
      const defaultMarker = compiled.querySelector('#duration-marker-default');
      const slowMarker = compiled.querySelector('#duration-marker-slow');
      const deliberateMarker = compiled.querySelector('#duration-marker-deliberate');

      expect(instantMarker).toBeTruthy();
      expect(fastMarker).toBeTruthy();
      expect(defaultMarker).toBeTruthy();
      expect(slowMarker).toBeTruthy();
      expect(deliberateMarker).toBeTruthy();
    });

    it('should provide Play and Reset controls and not auto-play on initial render', () => {
      const playBtn = compiled.querySelector('#btn-play-durations') as HTMLButtonElement | null;
      const resetBtn = compiled.querySelector('#btn-reset-durations') as HTMLButtonElement | null;

      expect(playBtn).toBeTruthy();
      expect(resetBtn).toBeTruthy();
      expect(playBtn?.textContent?.trim()).toBe('تشغيل المقارنة');
      expect(resetBtn?.textContent?.trim()).toBe('إعادة الضبط');

      // Initial resting state: not moved
      expect(component.durationActive()).toBe(false);
      const instantMarker = compiled.querySelector('#duration-marker-instant');
      expect(instantMarker?.classList.contains('is-moved')).toBe(false);
    });

    it('should respond to resetDurations call', () => {
      component.resetDurations();
      fixture.detectChanges();
      expect(component.durationActive()).toBe(false);
    });
  });

  describe('Section 2: Easing Comparison', () => {
    it('should render all 4 easing tracks and their markers', () => {
      const linearTrack = compiled.querySelector('#easing-track-linear');
      const standardTrack = compiled.querySelector('#easing-track-standard');
      const enterTrack = compiled.querySelector('#easing-track-enter');
      const exitTrack = compiled.querySelector('#easing-track-exit');

      expect(linearTrack).toBeTruthy();
      expect(standardTrack).toBeTruthy();
      expect(enterTrack).toBeTruthy();
      expect(exitTrack).toBeTruthy();

      expect(linearTrack?.textContent).toContain('--honesty-motion-easing-linear');
      expect(linearTrack?.textContent).toContain('linear');

      expect(standardTrack?.textContent).toContain('--honesty-motion-easing-standard');
      expect(standardTrack?.textContent).toContain('cubic-bezier(0.2, 0, 0, 1)');

      expect(enterTrack?.textContent).toContain('--honesty-motion-easing-enter');
      expect(enterTrack?.textContent).toContain('cubic-bezier(0, 0, 0, 1)');

      expect(exitTrack?.textContent).toContain('--honesty-motion-easing-exit');
      expect(exitTrack?.textContent).toContain('cubic-bezier(0.3, 0, 1, 1)');

      const linearMarker = compiled.querySelector('#easing-marker-linear');
      const standardMarker = compiled.querySelector('#easing-marker-standard');
      const enterMarker = compiled.querySelector('#easing-marker-enter');
      const exitMarker = compiled.querySelector('#easing-marker-exit');

      expect(linearMarker).toBeTruthy();
      expect(standardMarker).toBeTruthy();
      expect(enterMarker).toBeTruthy();
      expect(exitMarker).toBeTruthy();
    });

    it('should provide Play and Reset controls for easings and not auto-play on initial render', () => {
      const playBtn = compiled.querySelector('#btn-play-easings') as HTMLButtonElement | null;
      const resetBtn = compiled.querySelector('#btn-reset-easings') as HTMLButtonElement | null;

      expect(playBtn).toBeTruthy();
      expect(resetBtn).toBeTruthy();
      expect(playBtn?.textContent?.trim()).toBe('تشغيل المنحنيات');
      expect(resetBtn?.textContent?.trim()).toBe('إعادة الضبط');

      // Initial resting state: not moved
      expect(component.easingActive()).toBe(false);
      const standardMarker = compiled.querySelector('#easing-marker-standard');
      expect(standardMarker?.classList.contains('is-moved')).toBe(false);
    });

    it('should respond to resetEasings call', () => {
      component.resetEasings();
      fixture.detectChanges();
      expect(component.easingActive()).toBe(false);
    });
  });

  describe('Section 3: Functional State Change Sample', () => {
    it('should render functional indicator and toggle button with initial untoggled state', () => {
      const toggleBtn = compiled.querySelector('#btn-toggle-functional-state') as HTMLButtonElement | null;
      const indicator = compiled.querySelector('#functional-state-indicator');

      expect(toggleBtn).toBeTruthy();
      expect(indicator).toBeTruthy();
      expect(component.functionalToggled()).toBe(false);
      expect(indicator?.classList.contains('is-toggled')).toBe(false);
    });

    it('should toggle functional state on click', () => {
      const toggleBtn = compiled.querySelector('#btn-toggle-functional-state') as HTMLButtonElement | null;
      toggleBtn?.click();
      fixture.detectChanges();

      expect(component.functionalToggled()).toBe(true);
      const indicator = compiled.querySelector('#functional-state-indicator');
      expect(indicator?.classList.contains('is-toggled')).toBe(true);

      toggleBtn?.click();
      fixture.detectChanges();
      expect(component.functionalToggled()).toBe(false);
      expect(indicator?.classList.contains('is-toggled')).toBe(false);
    });
  });

  describe('Section 4: Enter / Exit Pair Review', () => {
    it('should render enter/exit box in visible resting state without auto-play', () => {
      const toggleBtn = compiled.querySelector('#btn-toggle-enter-exit') as HTMLButtonElement | null;
      const box = compiled.querySelector('#enter-exit-box');

      expect(toggleBtn).toBeTruthy();
      expect(box).toBeTruthy();
      expect(component.enterExitVisible()).toBe(true);
      expect(box?.classList.contains('is-visible')).toBe(true);
      expect(box?.classList.contains('is-hidden')).toBe(false);
    });

    it('should toggle enter/exit visibility state on click', () => {
      const toggleBtn = compiled.querySelector('#btn-toggle-enter-exit') as HTMLButtonElement | null;
      toggleBtn?.click();
      fixture.detectChanges();

      expect(component.enterExitVisible()).toBe(false);
      const box = compiled.querySelector('#enter-exit-box');
      expect(box?.classList.contains('is-hidden')).toBe(true);
      expect(box?.classList.contains('is-visible')).toBe(false);

      toggleBtn?.click();
      fixture.detectChanges();
      expect(component.enterExitVisible()).toBe(true);
      expect(box?.classList.contains('is-visible')).toBe(true);
    });
  });
});
