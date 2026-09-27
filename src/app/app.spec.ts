import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideRouter, Router, RouterLink} from '@angular/router';
import {By} from '@angular/platform-browser';
import {
  App,
  buildLabPreviewUrl,
  buildScreenshotFilename,
  hasLabPreviewFlag,
  isDirectLabReviewRoute,
  isFullyTransparent,
  normalizeScreenshotColorFunctions,
  persistLabTheme,
  resolveLabScreenshotSources,
  resolveLabScreenshotTarget,
  resolveLabTheme,
  resolveVisibleBackgroundColor,
} from './app';
import {routes} from './app.routes';
import {ErpOverlayManager} from './shared/overlay/overlay-manager';

@Component({template: ''})
class ScreenshotOverlayContent {}

describe('Design Lab preview helpers', () => {
  it('detects only labPreview=1', () => {
    expect(hasLabPreviewFlag('?labPreview=1')).toBe(true);
    expect(hasLabPreviewFlag('?labPreview=0')).toBe(false);
    expect(hasLabPreviewFlag('')).toBe(false);
  });

  it('builds a preview URL while preserving query parameters and fragments', () => {
    expect(buildLabPreviewUrl('/primitives/typography', 'light')).toBe(
      '/primitives/typography?labPreview=1&labTheme=light',
    );
    expect(buildLabPreviewUrl('/primitives/typography?x=1#proof', 'dark')).toBe(
      '/primitives/typography?x=1&labPreview=1&labTheme=dark#proof',
    );
  });

  it('resolves and persists the global Lab theme without requiring storage', () => {
    const storage = {
      getItem: vi.fn(() => 'dark'),
      setItem: vi.fn(),
    };

    expect(resolveLabTheme('', storage)).toBe('dark');
    expect(resolveLabTheme('?labTheme=light', storage)).toBe('light');
    expect(resolveLabTheme('', null)).toBe('light');

    persistLabTheme('dark', storage);
    expect(storage.setItem).toHaveBeenCalledWith('honesty-lab-theme', 'dark');
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

  it('detects the Input and Overlay showcases as direct review routes', () => {
    expect(isDirectLabReviewRoute('/controls/overlays')).toBe(true);
    expect(
      isDirectLabReviewRoute('/controls/overlays?labPreview=1#proof'),
    ).toBe(true);
    expect(isDirectLabReviewRoute('/controls/inputs')).toBe(true);
    expect(isDirectLabReviewRoute('/foundation/overview')).toBe(false);
  });

  it('resolves ordinary and Dark iframe capture roots deterministically', () => {
    const embeddedDocument = document.implementation.createHTMLDocument();
    const embeddedRoot = embeddedDocument.createElement('main');
    embeddedRoot.id = 'lab-capture-root';
    embeddedRoot.dataset['theme'] = 'dark';
    embeddedDocument.body.appendChild(embeddedRoot);

    const outerDocument = document.implementation.createHTMLDocument();
    const outerRoot = outerDocument.createElement('main');
    outerRoot.id = 'lab-capture-root';
    const toolbar = outerDocument.createElement('header');
    toolbar.id = 'lab-utility-bar';
    const frame = outerDocument.createElement('iframe');
    frame.id = 'lab-preview-frame';
    Object.defineProperty(frame, 'contentDocument', {
      configurable: true,
      value: embeddedDocument,
    });
    outerRoot.append(toolbar, frame);
    outerDocument.body.appendChild(outerRoot);

    expect(resolveLabScreenshotTarget(outerDocument, false)).toBe(
      embeddedRoot,
    );
    expect(
      resolveLabScreenshotTarget(outerDocument, false)?.dataset['theme'],
    ).toBe('dark');
    expect(resolveLabScreenshotSources(outerDocument, false)).toEqual({
      outerRoot,
      toolbar,
      embeddedRoot,
    });
  });

  it('resolves only the outer capture root for direct review', () => {
    const directDocument = document.implementation.createHTMLDocument();
    const directRoot = directDocument.createElement('main');
    directRoot.id = 'lab-capture-root';
    directDocument.body.appendChild(directRoot);

    expect(resolveLabScreenshotTarget(directDocument, true)).toBe(directRoot);
    expect(resolveLabScreenshotTarget(directDocument, false)).toBeNull();
  });

  it('normalizes browser color(srgb) serialization for html2canvas parsing', () => {
    expect(
      normalizeScreenshotColorFunctions(
        'color(srgb 0.152941 0.164706 0.196078 / 0.460235)',
      ),
    ).toBe('rgba(39, 42, 50, 0.460235)');
    expect(
      normalizeScreenshotColorFunctions(
        '0 0 0 1px color(srgb 1 0.5 0 / 1)',
      ),
    ).toBe('0 0 0 1px rgba(255, 128, 0, 1)');
    expect(normalizeScreenshotColorFunctions('rgb(1, 2, 3)')).toBe(
      'rgb(1, 2, 3)',
    );
  });
});

describe('App Root Shell & Design Lab Review Utilities', () => {
  beforeEach(async () => {
    window.localStorage.removeItem('honesty-lab-theme');
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
    const buttonControlsLink = compiled.querySelector('#nav-link-button-controls');
    const tooltipControlsLink = compiled.querySelector('#nav-link-tooltip-controls');
    const inputControlsLink = compiled.querySelector('#nav-link-input-controls');
    const overlayControlsLink = compiled.querySelector('#nav-link-overlay-controls');
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
    expect(buttonControlsLink).toBeTruthy();
    expect(tooltipControlsLink).toBeTruthy();
    expect(inputControlsLink).toBeTruthy();
    expect(overlayControlsLink).toBeTruthy();
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
    expect(buttonControlsLink?.textContent?.trim()).toBe('الأزرار الإنتاجية');
    expect(tooltipControlsLink?.textContent?.trim()).toBe('التلميحات الإنتاجية');
    expect(inputControlsLink?.textContent?.trim()).toBe('حقول الإدخال الإنتاجية');
    expect(overlayControlsLink?.textContent?.trim()).toBe('النوافذ الحاجبة');
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
    expect(linkPaths).toContain('/controls/buttons');
    expect(linkPaths).toContain('/controls/tooltips');
    expect(linkPaths).toContain('/controls/inputs');
    expect(linkPaths).toContain('/controls/overlays');
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
      'controls/buttons',
      'controls/tooltips',
      'controls/inputs',
      'controls/overlays',
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

  it('renders exactly one application OverlayHost', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('erp-overlay-host')
        .length,
    ).toBe(1);
  });

  it('should render the full-page screenshot button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const screenshotBtn = compiled.querySelector('#btn-full-page-screenshot') as HTMLButtonElement | null;
    expect(screenshotBtn).toBeTruthy();
    expect(screenshotBtn?.hasAttribute('data-wave-a-screenshot-evidence')).toBe(
      true,
    );
    expect(screenshotBtn?.textContent?.trim()).toContain('لقطة كاملة');
    expect(screenshotBtn?.disabled).toBe(false);
  });

  it('applies and persists one global Lab theme across route navigation and app recreation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const themeButton = root.querySelector('#btn-lab-theme') as HTMLButtonElement;

    expect(themeButton.hasAttribute('data-wave-a-theme-evidence')).toBe(true);

    expect(root.querySelector('#lab-capture-root')?.getAttribute('data-theme')).toBe(
      'light',
    );

    themeButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.theme()).toBe('dark');
    expect(root.querySelector('#lab-capture-root')?.getAttribute('data-theme')).toBe(
      'dark',
    );
    expect(window.localStorage.getItem('honesty-lab-theme')).toBe('dark');

    await router.navigateByUrl('/foundation/colors');
    fixture.detectChanges();
    expect(fixture.componentInstance.theme()).toBe('dark');

    fixture.destroy();
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const recreated = TestBed.createComponent(App);
    recreated.detectChanges();
    expect(recreated.componentInstance.theme()).toBe('dark');
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
    const previewFrame = compiled.querySelector(
      '#lab-preview-frame',
    ) as HTMLIFrameElement;
    expect(previewFrame).toBeTruthy();
    expect(previewFrame.src).toContain('labTheme=light');
    expect(compiled.querySelector('#routed-review-content')).toBeNull();
    expect(compiled.querySelector('#app-router-outlet')).toBeNull();
  });

  it('renders the Overlay route directly with one host and no recursive iframe', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/controls/overlays');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const captureRoot = root.querySelector('#lab-capture-root');

    expect(fixture.componentInstance.isDirectReview()).toBe(true);
    expect(captureRoot?.getAttribute('data-capture-mode')).toBe('direct');
    expect(captureRoot?.querySelector('#app-router-outlet')).toBeTruthy();
    expect(captureRoot?.querySelector('app-overlay-controls')).toBeTruthy();
    expect(captureRoot?.querySelectorAll('erp-overlay-host')).toHaveLength(1);
    expect(root.querySelectorAll('erp-overlay-host')).toHaveLength(1);
    expect(root.querySelector('#lab-preview-frame')).toBeNull();
    expect(root.querySelector('#lab-viewport-controls')).toBeNull();
    expect(resolveLabScreenshotTarget(document, true)).toBe(captureRoot);
  });

  it('keeps modal and logical drawers inside the direct screenshot target', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const manager = TestBed.inject(ErpOverlayManager);

    await router.navigateByUrl('/controls/overlays');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    manager.open(ScreenshotOverlayContent, {label: 'Capture modal'});
    manager.open(ScreenshotOverlayContent, {
      kind: 'drawer',
      position: 'start',
      label: 'Capture start drawer',
    });
    manager.open(ScreenshotOverlayContent, {
      kind: 'drawer',
      position: 'end',
      label: 'Capture end drawer',
    });
    fixture.detectChanges();

    const target = resolveLabScreenshotTarget(document, true);
    const toolbar = target?.querySelector('#lab-utility-bar') as HTMLElement;
    const host = target?.querySelector('erp-overlay-host') as HTMLElement;
    expect(toolbar).toBeTruthy();
    expect(host).toBeTruthy();
    expect(toolbar.inert).toBe(true);
    expect(toolbar.getAttribute('aria-hidden')).toBe('true');
    expect(getComputedStyle(toolbar).zIndex).toBe(
      'var(--honesty-layer-sticky)',
    );
    expect(getComputedStyle(host).zIndex).toBe(
      'var(--honesty-overlay-layer)',
    );
    expect(
      getComputedStyle(host).getPropertyValue('--honesty-overlay-layer'),
    ).toBe('var(--honesty-layer-blocking)');
    expect(
      toolbar.compareDocumentPosition(host) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(target?.querySelector('[data-overlay-kind="modal"]')).toBeTruthy();
    expect(
      target?.querySelector('[data-overlay-position="start"]'),
    ).toBeTruthy();
    expect(
      target?.querySelector('[data-overlay-position="end"]'),
    ).toBeTruthy();
  });

  it('renders Inputs directly and returns to iframe mode for ordinary Foundation review', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/controls/overlays');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        '#lab-preview-frame',
      ),
    ).toBeNull();

    await router.navigateByUrl('/controls/inputs');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    let root = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.isDirectReview()).toBe(true);
    expect(root.querySelector('#lab-preview-frame')).toBeNull();
    expect(root.querySelector('#lab-viewport-controls')).toBeNull();
    expect(root.querySelector('app-input-controls')).toBeTruthy();

    await router.navigateByUrl('/foundation/overview');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    root = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.isDirectReview()).toBe(false);
    expect(root.querySelector('#lab-preview-frame')).toBeTruthy();
    expect(root.querySelector('#lab-viewport-controls')).toBeTruthy();
    expect(
      root.querySelector('#lab-capture-root')?.getAttribute(
        'data-capture-mode',
      ),
    ).toBe('outer');
    expect(root.querySelectorAll('erp-overlay-host')).toHaveLength(1);
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
