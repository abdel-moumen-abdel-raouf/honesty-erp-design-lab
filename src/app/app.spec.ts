import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
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
import {ErpReviewAppShellWorkbenchState} from './review-internals/app-shell-workbench/app-shell-workbench-state';

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

  it('renders compact catalog navigation without the legacy link rows', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('#lab-nav')).toBeNull();
    expect(root.querySelector('.lab-component-catalog')).toBeNull();
    expect(root.querySelector('#btn-component-catalog')).not.toBeNull();
    expect(fixture.componentInstance.catalogOpen()).toBe(false);
    const catalogButton = root.querySelector(
      '#btn-component-catalog button',
    ) as HTMLButtonElement;
    catalogButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.catalogOpen()).toBe(true);
  });

  it('registers catalog routes and keeps every legacy route as redirect-only', () => {
    expect(routes.find((route) => route.path === 'components')).toBeDefined();
    expect(routes.find((route) => route.path === 'components/:componentId')).toBeDefined();
    const legacy = routes.filter((route) => route.path?.startsWith('foundation/') || route.path?.startsWith('controls/') || route.path?.startsWith('primitives/'));
    expect(legacy.length).toBeGreaterThan(0);
    expect(legacy.every((route) => typeof route.redirectTo === 'string' && !route.loadComponent)).toBe(true);
    expect(routes.find((route) => route.path === '')).toMatchObject({
      redirectTo: 'components',
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

  it('composes the real Shell owners around the routed Design Lab content', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('erp-app-shell')).toHaveLength(1);
    expect(root.querySelector('erp-sidebar')).not.toBeNull();
    expect(root.querySelector('erp-topbar')).not.toBeNull();
    expect(root.querySelector('erp-applications-menu')).not.toBeNull();
    expect(root.querySelector('erp-messages-menu')).not.toBeNull();
    expect(root.querySelector('erp-notification-bell')).not.toBeNull();
    expect(root.querySelector('erp-global-search')).not.toBeNull();
    expect(root.querySelector('erp-branch-selector')).not.toBeNull();
    expect(root.querySelector('erp-user-menu')).not.toBeNull();
    expect(root.querySelector('erp-quick-actions-bar')).not.toBeNull();
    expect(root.querySelector('erp-app-footer')).not.toBeNull();
  });

  it('should render the full-page screenshot button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const screenshotControl = compiled.querySelector('#btn-full-page-screenshot');
    const screenshotButton = screenshotControl?.querySelector('button');
    expect(screenshotControl).toBeTruthy();
    expect(screenshotControl?.hasAttribute('data-wave-a-screenshot-evidence')).toBe(
      true,
    );
    expect(screenshotControl?.textContent?.trim()).toContain('لقطة كاملة');
    expect(screenshotButton?.disabled).toBe(false);
  });

  it('applies and persists one global Lab theme across route navigation and app recreation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const themeControl = root.querySelector('#btn-lab-theme');
    const themeButton = themeControl?.querySelector('button') as HTMLButtonElement;

    expect(themeControl?.hasAttribute('data-wave-a-theme-evidence')).toBe(true);

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

    await router.navigateByUrl('/components');
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
    expect(captureRoot?.querySelector('#design-lab-app-shell')).toBeTruthy();
    expect(captureRoot?.querySelector('.app-shell__content')).toBeTruthy();
    expect(captureRoot?.querySelector('#app-router-outlet')).toBeTruthy();
    expect(captureRoot?.querySelector('iframe')).toBeNull();
    expect(captureRoot?.querySelector('[id^="btn-preview-"]')).toBeNull();
    expect(root.querySelectorAll('erp-overlay-host')).toHaveLength(1);
  });

  it('uses the real root AppShell as the live AppShell workbench without nesting another shell', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const workbench = TestBed.inject(ErpReviewAppShellWorkbenchState);

    await router.navigateByUrl('/components/app-shell');
    fixture.detectChanges();
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).querySelector(
        '[data-dedicated-showcase="app-shell"]',
      )).not.toBeNull();
    });

    const root = fixture.nativeElement as HTMLElement;
    const shell = root.querySelector('#design-lab-app-shell');
    expect(root.querySelectorAll('erp-app-shell')).toHaveLength(1);
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(shell?.hasAttribute('data-showcase-target')).toBe(true);
    expect(shell?.getAttribute('data-app-shell-root-workbench')).toBe('true');
    expect(root.querySelector('[data-app-shell-root-workbench-panel]')).not.toBeNull();
    expect(shell?.getAttribute('data-app-shell-viewport')).toBe('true');

    workbench.updateControl('sidebarOpen', true);
    fixture.detectChanges();
    expect(shell?.getAttribute('data-app-shell-sidebar-open')).toBe('true');

    await router.navigateByUrl('/components/button');
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).querySelector(
        '[data-dedicated-showcase="button"]',
      )).not.toBeNull();
    });
    expect(workbench.active()).toBe(false);
    expect(workbench.values()).toBeNull();
    expect(root.querySelectorAll('erp-app-shell')).toHaveLength(1);
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(shell?.hasAttribute('data-showcase-target')).toBe(false);

    await router.navigateByUrl('/components/app-shell');
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(workbench.active()).toBe(true);
    });
    expect(workbench.values()?.sidebarOpen).toBe(false);
    expect(root.querySelectorAll('erp-app-shell')).toHaveLength(1);
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(shell?.hasAttribute('data-showcase-target')).toBe(true);

    fixture.destroy();
  });

  it('keeps a visible navigation-intent path and follows real AppShell destinations', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const workbench = TestBed.inject(ErpReviewAppShellWorkbenchState);

    await router.navigateByUrl('/components/app-shell');
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).querySelector(
        '[data-dedicated-showcase="app-shell"]',
      )).not.toBeNull();
    });

    const links = fixture.nativeElement.querySelectorAll(
      'erp-sidebar a[data-sidebar-interactive]',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(links).toHaveLength(3);
    expect(links[0].getAttribute('href')).toBe('#');
    expect(links[1].getAttribute('href')).toBe('/components/table');

    links[0].click();
    fixture.detectChanges();
    expect(router.url).toBe('/components/app-shell');
    expect(workbench.lastEvent()).toContain('navigationActivated');
    expect(workbench.lastEvent()).toContain('intent');

    links[1].click();
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(router.url).toBe('/components/table');
      expect((fixture.nativeElement as HTMLElement).querySelector(
        '[data-dedicated-showcase="table"]',
      )).not.toBeNull();
    });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(workbench.active()).toBe(false);
    expect(workbench.values()).toBeNull();

    fixture.destroy();
  });

  for (const [url, selector] of [
    ['/components', 'app-component-catalog-page'],
    ['/foundation/overview', 'app-component-catalog-page'],
    ['/controls/inputs', 'app-component-showcase'],
    ['/controls/empty-states', 'app-component-showcase'],
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

    await router.navigateByUrl('/components');
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
    const shell = target?.querySelector('#design-lab-app-shell') as HTMLElement;
    const host = target?.querySelector('erp-overlay-host') as HTMLElement;
    expect(shell).toBeTruthy();
    expect(host).toBeTruthy();
    expect(shell.inert).toBe(true);
    expect(shell.getAttribute('aria-hidden')).toBe('true');
    expect(getComputedStyle(host).zIndex).toBe(
      'var(--honesty-overlay-layer)',
    );
    expect(
      getComputedStyle(host).getPropertyValue('--honesty-overlay-layer'),
    ).toBe('var(--honesty-layer-blocking)');
    expect(
      shell.compareDocumentPosition(host) &
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
