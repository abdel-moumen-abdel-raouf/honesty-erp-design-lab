import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {ERP_MOTION_PRESETS} from '../../foundation/motion/motion-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {OverlayControls} from './overlay-controls';

describe('OverlayControls showcase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayControls],
      providers: [provideRouter(routes)],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(OverlayControls);
    fixture.detectChanges();
    return fixture;
  }

  it('provides concise full-application and backdrop review evidence', () => {
    const root = create().nativeElement as HTMLElement;
    const fullApp = root.querySelector('[data-full-app-overlay-evidence]');
    const backdrop = root.querySelector('[data-backdrop-review-evidence]');

    expect(fullApp).toBeTruthy();
    expect(backdrop).toBe(fullApp);
    expect(fullApp?.textContent).toContain('شريط المختبر');
    expect(fullApp?.textContent).toContain('الخلفية');
  });

  it('has the /controls/overlays route and creates', () => {
    expect(routes.find((route) => route.path === 'controls/overlays')).toBeDefined();
    expect(create().componentInstance).toBeTruthy();
  });

  it('renders seven technical groups with equivalent Light and Dark contexts', () => {
    const root = create().nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll('[data-review-group]')];
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual([
      'modal',
      'drawers',
      'nested-stack',
      'dismissal-focus',
      'temporal-pickers',
      'selection-pickers',
      'deferred-composites',
    ]);

    for (const group of groups) {
      expect(
        [...group.querySelectorAll('[data-theme-context]')].map((context) =>
          context.getAttribute('data-theme'),
        ),
      ).toEqual(['light', 'dark']);
    }
  });

  it('provides internal wide and narrow responsive review evidence', () => {
    const root = create().nativeElement as HTMLElement;
    const evidence = [
      ...root.querySelectorAll<HTMLElement>(
        '[data-overlay-responsive-evidence]',
      ),
    ];

    expect(
      evidence.map((item) => item.dataset['overlayResponsiveEvidence']),
    ).toEqual(['wide', 'narrow']);
    expect(evidence.map((item) => item.getAttribute('data-width'))).toEqual([
      'wide',
      'narrow',
    ]);
  });

  it('contains all four deferred composites in both themes', () => {
    const root = create().nativeElement as HTMLElement;
    const evidence = [
      ...root.querySelectorAll<HTMLElement>('[data-composite-evidence]'),
    ];

    expect(evidence.map((item) => item.dataset['compositeEvidence'])).toEqual([
      'radio-group',
      'button-group',
      'split-button',
      'fab-menu',
      'radio-group',
      'button-group',
      'split-button',
      'fab-menu',
    ]);
    expect(root.querySelectorAll('erp-radio-group')).toHaveLength(2);
    expect(root.querySelectorAll('erp-button-group')).toHaveLength(2);
    expect(root.querySelectorAll('erp-split-button')).toHaveLength(2);
    expect(root.querySelectorAll('erp-fab-menu')).toHaveLength(2);
  });

  it('contains the complete OverlayManager-backed selection evidence in both themes', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-selection-overlay-evidence]').length).toBe(10);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-selection-overlay-evidence]')]
        .map((item) => item.getAttribute('data-selection-overlay-evidence')),
    ).toEqual([
      'color-system',
      'color-free',
      'icon',
      'item',
      'combo',
      'color-system',
      'color-free',
      'icon',
      'item',
      'combo',
    ]);
  });

  it('contains all four OverlayManager-backed temporal triggers in both themes', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-temporal-overlay-evidence]').length).toBe(8);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-temporal-overlay-evidence]')]
        .map((item) => item.getAttribute('data-temporal-overlay-evidence')),
    ).toEqual(['date', 'time', 'datetime', 'range', 'date', 'time', 'datetime', 'range']);
  });

  it('contains modal, logical drawer, nested, and policy evidence', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-modal-evidence]').length).toBe(2);
    expect(root.querySelectorAll('[data-drawer-evidence="start"]').length).toBe(2);
    expect(root.querySelectorAll('[data-drawer-evidence="end"]').length).toBe(2);
    expect(root.querySelectorAll('[data-drawer-evidence="bottom"]').length).toBe(2);
    expect(root.querySelectorAll('[data-nested-evidence]').length).toBe(2);
    expect(root.querySelectorAll('[data-policy-evidence]').length).toBe(2);
    expect(
      [...root.querySelectorAll('[data-review-group="drawers"] [data-theme-context]')]
        .map((context) => context.getAttribute('dir')),
    ).toEqual(['rtl', 'rtl']);
  });

  it('contains the full dismissal, backdrop, blur, motion, and reduced-motion matrix', () => {
    const root = create().nativeElement as HTMLElement;

    expect(root.querySelectorAll('[data-default-backdrop-evidence]')).toHaveLength(2);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-backdrop-dismiss-evidence]')]
        .map((item) => item.dataset['backdropDismissEvidence']),
    ).toEqual(['true', 'false']);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-escape-dismiss-evidence]')]
        .map((item) => item.dataset['escapeDismissEvidence']),
    ).toEqual(['true', 'false']);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-blur-evidence]')]
        .map((item) => item.dataset['blurValue']),
    ).toEqual(['low', 'medium', 'high']);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-backdrop-tone-evidence]')]
        .map((item) => item.dataset['backdropToneValue']),
    ).toEqual(['neutral', 'primary', 'secondary', 'accent']);
    expect(
      [...root.querySelectorAll<HTMLElement>('[data-animation-evidence]')]
        .map((item) => item.dataset['animationValue']),
    ).toEqual([...ERP_MOTION_PRESETS]);
    expect(root.querySelectorAll('[data-reduced-motion-evidence]')).toHaveLength(1);
  });

  it('contains selected DateRange hover-preview evidence in Light and Dark RTL contexts', async () => {
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const contexts = [
      ...root.querySelectorAll<HTMLElement>(
        '[data-review-group="temporal-pickers"] [data-theme-context]',
      ),
    ];
    const ranges = [
      ...root.querySelectorAll<HTMLElement>('[data-date-range-selected-evidence]'),
    ];

    expect(contexts.map((context) => [context.dataset['theme'], context.dir])).toEqual([
      ['light', 'rtl'],
      ['dark', 'rtl'],
    ]);
    expect(ranges).toHaveLength(2);
    expect(
      ranges.map((range) => [
        range.dataset['dateRangeStart'],
        range.dataset['dateRangeEnd'],
      ]),
    ).toEqual([
      ['2026-09-24', '2026-09-30'],
      ['2026-09-24', '2026-09-30'],
    ]);
  });

  it('opens exact modal and drawer configurations through the shared manager', () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);

    fixture.componentInstance.openModal('light');
    fixture.componentInstance.openDrawer('start', 'dark');

    expect(
      manager.entries().map((entry) => ({
        kind: entry.ref.config.kind,
        position: entry.ref.config.position,
      })),
    ).toEqual([
      {kind: 'modal', position: 'center'},
      {kind: 'drawer', position: 'start'},
    ]);
  });

  it('opens the explicit dismissal and visual configuration through the shared manager', () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);

    fixture.componentInstance.openConfigured('دليل الإعدادات', {
      dismissOnBackdrop: false,
      dismissOnEscape: false,
      blur: 'high',
      backdropTone: 'accent',
      enterAnimation: 'slide-start',
      exitAnimation: 'slide-end',
    });

    expect(manager.entries().at(-1)?.ref.config).toEqual(
      expect.objectContaining({
        dismissOnBackdrop: false,
        dismissOnEscape: false,
        blur: 'high',
        backdropTone: 'accent',
        enterAnimation: 'slide-start',
        exitAnimation: 'slide-end',
      }),
    );
  });
});
