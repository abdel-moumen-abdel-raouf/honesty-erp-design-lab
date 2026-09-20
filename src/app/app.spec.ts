import {TestBed} from '@angular/core/testing';
import {provideRouter, RouterLink} from '@angular/router';
import {By} from '@angular/platform-browser';
import {App, isFullyTransparent, resolveVisibleBackgroundColor} from './app';
import {routes} from './app.routes';

describe('App Root Shell & Design Lab Review Utilities', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app root shell', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the temporary Design Lab utility navigation with all 3 review links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const nav = compiled.querySelector('#lab-nav');
    expect(nav).toBeTruthy();

    const colorsLink = compiled.querySelector('#nav-link-colors');
    const themesLink = compiled.querySelector('#nav-link-themes');
    const statusHuesLink = compiled.querySelector('#nav-link-status-hues');

    expect(colorsLink).toBeTruthy();
    expect(themesLink).toBeTruthy();
    expect(statusHuesLink).toBeTruthy();

    expect(colorsLink?.textContent?.trim()).toBe('الألوان المرجعية');
    expect(themesLink?.textContent?.trim()).toBe('السمات الفاتحة والداكنة');
    expect(statusHuesLink?.textContent?.trim()).toBe('صبغات الحالات');
  });

  it('should bind the correct RouterLink routes to the navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const linkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    const linkPaths = linkDebugElements.map((de) => {
      const routerLink = de.injector.get(RouterLink);
      return routerLink.href;
    });

    expect(linkPaths).toContain('/foundation/colors');
    expect(linkPaths).toContain('/foundation/themes');
    expect(linkPaths).toContain('/foundation/colors/status-hues');
  });

  it('should render the full-page screenshot button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const screenshotBtn = compiled.querySelector('#btn-full-page-screenshot') as HTMLButtonElement | null;
    expect(screenshotBtn).toBeTruthy();
    expect(screenshotBtn?.textContent?.trim()).toContain('لقطة كاملة');
    expect(screenshotBtn?.disabled).toBe(false);
  });

  it('should render the dedicated routed-content capture wrapper outside the utility bar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const utilityBar = compiled.querySelector('#lab-utility-bar');
    const captureWrapper = compiled.querySelector('#routed-review-content');
    const routerOutlet = compiled.querySelector('#app-router-outlet');

    expect(utilityBar).toBeTruthy();
    expect(captureWrapper).toBeTruthy();
    expect(routerOutlet).toBeTruthy();

    // Ensure routed content wrapper contains the router outlet
    expect(captureWrapper?.contains(routerOutlet)).toBe(true);

    // Ensure the utility bar is NOT inside the capture wrapper
    expect(captureWrapper?.contains(utilityBar)).toBe(false);
  });
});

describe('Screenshot Visible Background Color Resolution', () => {
  describe('isFullyTransparent', () => {
    it('should identify fully transparent strings correctly', () => {
      expect(isFullyTransparent('transparent')).toBe(true);
      expect(isFullyTransparent('TRANSPARENT')).toBe(true);
      expect(isFullyTransparent('rgba(0, 0, 0, 0)')).toBe(true);
      expect(isFullyTransparent('rgba(255, 255, 255, 0)')).toBe(true);
      expect(isFullyTransparent('rgba(255, 255, 255, 0.0)')).toBe(true);
      expect(isFullyTransparent('rgb(0 0 0 / 0)')).toBe(true);
      expect(isFullyTransparent('')).toBe(true);
      expect(isFullyTransparent(null)).toBe(true);
      expect(isFullyTransparent(undefined)).toBe(true);
    });

    it('should NOT treat partially transparent or opaque colors as fully transparent', () => {
      expect(isFullyTransparent('rgba(0, 0, 0, 0.5)')).toBe(false);
      expect(isFullyTransparent('rgba(255, 255, 255, 0.01)')).toBe(false);
      expect(isFullyTransparent('rgb(255, 255, 255)')).toBe(false);
      expect(isFullyTransparent('#ffffff')).toBe(false);
      expect(isFullyTransparent('#101115')).toBe(false);
    });
  });

  describe('resolveVisibleBackgroundColor', () => {
    let container: HTMLElement;
    let parentEl: HTMLElement;
    let targetEl: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      parentEl = document.createElement('div');
      targetEl = document.createElement('div');

      parentEl.appendChild(targetEl);
      container.appendChild(parentEl);
      document.body.appendChild(container);
    });

    afterEach(() => {
      if (container.parentElement) {
        container.parentElement.removeChild(container);
      }
    });

    it('should use an opaque target background directly', () => {
      targetEl.style.backgroundColor = 'rgb(123, 45, 67)';
      const resolved = resolveVisibleBackgroundColor(targetEl);
      expect(resolved).toBe('rgb(123, 45, 67)');
    });

    it('should resolve an opaque ancestor background when target is transparent', () => {
      targetEl.style.backgroundColor = 'transparent';
      parentEl.style.backgroundColor = 'rgb(40, 50, 60)';
      const resolved = resolveVisibleBackgroundColor(targetEl);
      expect(resolved).toBe('rgb(40, 50, 60)');
    });

    it('should resolve body background when target and immediate ancestors are transparent', () => {
      targetEl.style.backgroundColor = 'transparent';
      parentEl.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      container.style.backgroundColor = 'transparent';

      const originalBodyBg = document.body.style.backgroundColor;
      document.body.style.backgroundColor = 'rgb(250, 250, 250)';

      try {
        const resolved = resolveVisibleBackgroundColor(targetEl);
        expect(resolved).toBe('rgb(250, 250, 250)');
      } finally {
        document.body.style.backgroundColor = originalBodyBg;
      }
    });

    it('should not select fully transparent values and fall back to white if all elements are transparent', () => {
      targetEl.style.backgroundColor = 'transparent';
      parentEl.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      container.style.backgroundColor = 'transparent';

      const originalBodyBg = document.body.style.backgroundColor;
      const originalDocBg = document.documentElement.style.backgroundColor;

      document.body.style.backgroundColor = 'transparent';
      document.documentElement.style.backgroundColor = 'transparent';

      try {
        const resolved = resolveVisibleBackgroundColor(targetEl);
        expect(isFullyTransparent(resolved)).toBe(false);
        expect(resolved).toBe('#ffffff');
      } finally {
        document.body.style.backgroundColor = originalBodyBg;
        document.documentElement.style.backgroundColor = originalDocBg;
      }
    });
  });
});
