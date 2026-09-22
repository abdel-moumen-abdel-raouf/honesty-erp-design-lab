import {TestBed} from '@angular/core/testing';
import {provideRouter, RouterLink} from '@angular/router';
import {By} from '@angular/platform-browser';
import {
  App,
  buildLabPreviewUrl,
  buildScreenshotFilename,
  hasLabPreviewFlag,
  isFullyTransparent,
  resolveVisibleBackgroundColor,
} from './app';
import {routes} from './app.routes';

describe('Design Lab preview helpers', () => {
  it('detects only labPreview=1', () => {
    expect(hasLabPreviewFlag('?labPreview=1')).toBe(true);
    expect(hasLabPreviewFlag('?labPreview=0')).toBe(false);
    expect(hasLabPreviewFlag('')).toBe(false);
  });

  it('builds a preview URL while preserving query parameters and fragments', () => {
    expect(buildLabPreviewUrl('/primitives/typography')).toBe(
      '/primitives/typography?labPreview=1',
    );
    expect(buildLabPreviewUrl('/primitives/typography?x=1#proof')).toBe(
      '/primitives/typography?x=1&labPreview=1#proof',
    );
  });

  it('builds mode-specific screenshot filenames', () => {
    expect(buildScreenshotFilename('/primitives/typography', 'desktop')).toBe(
      'primitives-typography-desktop-view.png',
    );
    expect(buildScreenshotFilename('/primitives/typography', 'tablet')).toBe(
      'primitives-typography-tablet-view.png',
    );
    expect(buildScreenshotFilename('/primitives/typography', 'mobile')).toBe(
      'primitives-typography-mobile-view.png',
    );
    expect(buildScreenshotFilename('/', 'desktop')).toBe(
      'foundation-review-desktop-view.png',
    );
  });
});

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

  it('should render the temporary Design Lab utility navigation with all review links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const nav = compiled.querySelector('#lab-nav');
    expect(nav).toBeTruthy();

    const overviewLink = compiled.querySelector('#nav-link-overview');
    const structuralPrimitivesLink = compiled.querySelector('#nav-link-structural-primitives');
    const typographyPrimitivesLink = compiled.querySelector('#nav-link-typography-primitives');
    const iconPrimitivesLink = compiled.querySelector('#nav-link-icon-primitives');
    const colorsLink = compiled.querySelector('#nav-link-colors');
    const themesLink = compiled.querySelector('#nav-link-themes');
    const statusHuesLink = compiled.querySelector('#nav-link-status-hues');
    const feedbackColorsLink = compiled.querySelector('#nav-link-feedback-colors');
    const typographyLink = compiled.querySelector('#nav-link-typography');
    const chartsLink = compiled.querySelector('#nav-link-charts');
    const preferencesLink = compiled.querySelector('#nav-link-preferences');
    const spacingLink = compiled.querySelector('#nav-link-spacing');
    const bordersRadiusLink = compiled.querySelector('#nav-link-borders-radius');

    expect(overviewLink).toBeTruthy();
    expect(structuralPrimitivesLink).toBeTruthy();
    expect(typographyPrimitivesLink).toBeTruthy();
    expect(iconPrimitivesLink).toBeTruthy();
    expect(colorsLink).toBeTruthy();
    expect(themesLink).toBeTruthy();
    expect(statusHuesLink).toBeTruthy();
    expect(feedbackColorsLink).toBeTruthy();
    expect(typographyLink).toBeTruthy();
    expect(chartsLink).toBeTruthy();
    expect(preferencesLink).toBeTruthy();
    expect(spacingLink).toBeTruthy();
    expect(bordersRadiusLink).toBeTruthy();

    expect(overviewLink?.textContent?.trim()).toBe('نظرة عامة');
    expect(nav?.querySelector('a')).toBe(overviewLink);
    expect(structuralPrimitivesLink?.textContent?.trim()).toBe('البدائيات الهيكلية');
    expect(typographyPrimitivesLink?.textContent?.trim()).toBe('النصوص الإنتاجية');
    expect(iconPrimitivesLink?.textContent?.trim()).toBe('الأيقونات الإنتاجية');
    expect(colorsLink?.textContent?.trim()).toBe('الألوان المرجعية');
    expect(themesLink?.textContent?.trim()).toBe('السمات الفاتحة والداكنة');
    expect(statusHuesLink?.textContent?.trim()).toBe('صبغات الحالات');
    expect(feedbackColorsLink?.textContent?.trim()).toBe('ألوان الحالات الدلالية');
    expect(typographyLink?.textContent?.trim()).toBe('الطباعة');
    expect(chartsLink?.textContent?.trim()).toBe('الرسوم البيانية');
    expect(preferencesLink?.textContent?.trim()).toBe('التفضيلات');
    expect(spacingLink?.textContent?.trim()).toBe('المسافات');
    expect(bordersRadiusLink?.textContent?.trim()).toBe('الحدود والزوايا');
  });

  it('should bind the correct RouterLink routes to the navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const linkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    const linkPaths = linkDebugElements.map((de) => {
      const routerLink = de.injector.get(RouterLink);
      return routerLink.href;
    });

    expect(linkPaths).toContain('/foundation/overview');
    expect(linkPaths).toContain('/primitives/structural');
    expect(linkPaths).toContain('/primitives/typography');
    expect(linkPaths).toContain('/primitives/icons');
    expect(linkPaths).toContain('/foundation/colors');
    expect(linkPaths).toContain('/foundation/themes');
    expect(linkPaths).toContain('/foundation/colors/status-hues');
    expect(linkPaths).toContain('/foundation/feedback-colors');
    expect(linkPaths).toContain('/foundation/typography');
    expect(linkPaths).toContain('/foundation/charts');
    expect(linkPaths).toContain('/foundation/preferences');
    expect(linkPaths).toContain('/foundation/spacing');
    expect(linkPaths).toContain('/foundation/borders-radius');
  });

  it('should define the Overview route, preserve existing routes, and redirect root to Overview', () => {
    expect(routes.map((route) => route.path)).toEqual([
      'foundation/overview',
      'primitives/structural',
      'primitives/typography',
      'primitives/icons',
      'foundation/colors',
      'foundation/colors/status-hues',
      'foundation/themes',
      'foundation/feedback-colors',
      'foundation/typography',
      'foundation/charts',
      'foundation/preferences',
      'foundation/spacing',
      'foundation/borders-radius',
      'foundation/elevation',
      'foundation/motion',
      'foundation/density',
      'foundation/layout-grid',
      'foundation/layers',
      '',
    ]);
    expect(routes.find((route) => route.path === 'foundation/overview')).toBeDefined();
    expect(routes.find((route) => route.path === '')).toMatchObject({
      redirectTo: 'foundation/overview',
      pathMatch: 'full',
    });
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

  it('should render the viewport controls and iframe preview in outer mode', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#lab-viewport-controls')).toBeTruthy();
    expect(compiled.querySelector('#btn-preview-desktop')).toBeTruthy();
    expect(compiled.querySelector('#btn-preview-tablet')).toBeTruthy();
    expect(compiled.querySelector('#btn-preview-mobile')).toBeTruthy();
    expect(compiled.querySelector('#lab-preview-stage')).toBeTruthy();
    expect(compiled.querySelector('#lab-preview-frame')).toBeTruthy();
    expect(compiled.querySelector('#routed-review-content')).toBeNull();
    expect(compiled.querySelector('#app-router-outlet')).toBeNull();
  });

  it('switches deterministically between desktop, tablet, and mobile preview modes', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const app = fixture.componentInstance;
    const stage = compiled.querySelector('#lab-preview-stage') as HTMLElement;
    const desktop = compiled.querySelector('#btn-preview-desktop') as HTMLButtonElement;
    const tablet = compiled.querySelector('#btn-preview-tablet') as HTMLButtonElement;
    const mobile = compiled.querySelector('#btn-preview-mobile') as HTMLButtonElement;

    expect(app.currentPreviewMode()).toBe('desktop');
    expect(desktop.getAttribute('aria-pressed')).toBe('true');
    expect(stage.getAttribute('data-preview-mode')).toBe('desktop');

    tablet.click();
    fixture.detectChanges();
    expect(app.currentPreviewMode()).toBe('tablet');
    expect(tablet.getAttribute('aria-pressed')).toBe('true');
    expect(stage.getAttribute('data-preview-mode')).toBe('tablet');

    mobile.click();
    fixture.detectChanges();
    expect(app.currentPreviewMode()).toBe('mobile');
    expect(mobile.getAttribute('aria-pressed')).toBe('true');
    expect(stage.getAttribute('data-preview-mode')).toBe('mobile');

    desktop.click();
    fixture.detectChanges();
    expect(app.currentPreviewMode()).toBe('desktop');
    expect(desktop.getAttribute('aria-pressed')).toBe('true');
    expect(stage.getAttribute('data-preview-mode')).toBe('desktop');
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
