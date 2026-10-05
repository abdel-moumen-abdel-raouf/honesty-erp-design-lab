import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideRouter, Router, RouterLink} from '@angular/router';
import {By} from '@angular/platform-browser';
import {
  App,
  buildScreenshotFilename,
  isFullyTransparent,
  normalizeScreenshotColorFunctions,
  persistLabTheme,
  resolveLabScreenshotTarget,
  resolveLabTheme,
  resolveVisibleBackgroundColor,
} from './app';
import {routes} from './app.routes';
import {ErpOverlayManager} from './shared/overlay/overlay-manager';

@Component({template: ''})
class ScreenshotOverlayContent {}

function screenshotFrame(title: string) {
  return {
    header: {title, subtitle: 'Screenshot proof', icon: 'info' as const},
    footer: {
      actions: [
        {id: 'cancel', label: 'Cancel', role: 'secondary' as const, placement: 'end' as const},
        {id: 'confirm', label: 'Confirm', role: 'primary' as const, placement: 'end' as const},
      ],
    },
  };
}

describe('Design Lab App helpers', () => {
  it('resolves and persists the global Lab theme without query propagation', () => {
    const storage = {
      getItem: vi.fn(() => 'dark'),
      setItem: vi.fn(),
    };

    expect(resolveLabTheme(storage)).toBe('dark');
    expect(resolveLabTheme(null)).toBe('light');

    persistLabTheme('dark', storage);
    expect(storage.setItem).toHaveBeenCalledWith('honesty-lab-theme', 'dark');
  });

  it('builds theme-specific screenshot filenames', () => {
    expect(buildScreenshotFilename('/primitives/typography', 'light')).toBe(
      'primitives-typography-light-view.png',
    );
    expect(buildScreenshotFilename('/primitives/typography', 'dark')).toBe(
      'primitives-typography-dark-view.png',
    );
    expect(buildScreenshotFilename('/', 'light')).toBe(
      'foundation-review-light-view.png',
    );
  });

  it('resolves the single-document capture root deterministically', () => {
    const rootDocument = document.implementation.createHTMLDocument();
    const captureRoot = rootDocument.createElement('main');
    captureRoot.id = 'lab-capture-root';
    rootDocument.body.appendChild(captureRoot);

    expect(resolveLabScreenshotTarget(rootDocument)).toBe(captureRoot);
    captureRoot.remove();
    expect(resolveLabScreenshotTarget(rootDocument)).toBeNull();
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
    const emptyStateControlsLink = compiled.querySelector('#nav-link-empty-state-controls');
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
    expect(emptyStateControlsLink).toBeTruthy();
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
    expect(emptyStateControlsLink?.textContent?.trim()).toBe('الحالات الفارغة');
    expect(overlayControlsLink?.textContent?.trim()).toBe('النوافذ الحاجبة');
    expect(colorsLink?.textContent?.trim()).toBe('الألوان المرجعية');
    expect(themesLink?.textContent?.trim()).toBe('السمات الدلالية');
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
    expect(linkPaths).toContain('/controls/empty-states');
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
      'controls/empty-states',
      'controls/overlays',
      'controls/core-batch',
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

  it('renders one direct router outlet with no preview browsing context', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const captureRoot = root.querySelector('#lab-capture-root');

    expect(captureRoot).toBeTruthy();
    expect(captureRoot?.querySelector('#lab-utility-bar')).toBeTruthy();
    expect(captureRoot?.querySelector('#routed-review-content')).toBeTruthy();
    expect(captureRoot?.querySelector('#app-router-outlet')).toBeTruthy();
    expect(captureRoot?.querySelector('iframe')).toBeNull();
    expect(captureRoot?.querySelector('[id^="btn-preview-"]')).toBeNull();
    expect(root.querySelectorAll('erp-overlay-host')).toHaveLength(1);
  });

  for (const [url, selector] of [
    ['/foundation/overview', 'app-foundation-overview'],
    ['/controls/inputs', 'app-input-controls'],
    ['/controls/empty-states', 'app-empty-state-controls'],
    ['/controls/overlays', 'app-overlay-controls'],
  ] as const) {
    it(`renders ${url} through the direct single-document model`, async () => {
      const fixture = TestBed.createComponent(App);
      const router = TestBed.inject(Router);

      await router.navigateByUrl(url);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const root = fixture.nativeElement as HTMLElement;
      const captureRoot = root.querySelector('#lab-capture-root');

      expect(captureRoot?.querySelector('#app-router-outlet')).toBeTruthy();
      expect(captureRoot?.querySelector(selector)).toBeTruthy();
      expect(root.querySelector('iframe')).toBeNull();
      expect(root.querySelector('[id^="btn-preview-"]')).toBeNull();
      expect(root.querySelectorAll('erp-overlay-host')).toHaveLength(1);
      expect(resolveLabScreenshotTarget(document)).toBe(captureRoot);
    });
  }

  it('keeps modal and logical drawers inside the direct screenshot target', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const manager = TestBed.inject(ErpOverlayManager);

    await router.navigateByUrl('/controls/overlays');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    manager.open(ScreenshotOverlayContent, {
      frame: screenshotFrame('Capture modal'),
    });
    manager.open(ScreenshotOverlayContent, {
      kind: 'drawer',
      position: 'start',
      frame: screenshotFrame('Capture start drawer'),
    });
    manager.open(ScreenshotOverlayContent, {
      kind: 'drawer',
      position: 'end',
      frame: screenshotFrame('Capture end drawer'),
    });
    fixture.detectChanges();

    const target = resolveLabScreenshotTarget(document);
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
