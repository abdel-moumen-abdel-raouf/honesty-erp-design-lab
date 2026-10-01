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

  it('renders exactly four Overlay-only technical groups under the inherited global theme', () => {
    const root = create().nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll('[data-review-group]')];
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual([
      'modal',
      'drawers',
      'nested-stack',
      'dismissal-focus',
    ]);

    expect(root.querySelectorAll('[data-theme-context]')).toHaveLength(0);
    expect(root.querySelector('erp-container.overlay-showcase')?.hasAttribute('data-theme')).toBe(false);
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

  it('contains modal, logical drawer, nested, and policy evidence', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-modal-evidence]').length).toBe(1);
    expect(root.querySelectorAll('[data-drawer-evidence="start"]').length).toBe(1);
    expect(root.querySelectorAll('[data-drawer-evidence="end"]').length).toBe(1);
    expect(root.querySelectorAll('[data-drawer-evidence="top"]').length).toBe(1);
    expect(root.querySelectorAll('[data-drawer-evidence="bottom"]').length).toBe(1);
    expect(root.querySelectorAll('[data-nested-evidence]').length).toBe(1);
    expect(root.querySelectorAll('[data-policy-evidence]').length).toBe(1);
    expect(
      [...root.querySelectorAll('[data-review-group="drawers"] erp-surface')]
        .map((context) => context.getAttribute('dir')),
    ).toEqual(['rtl']);
  });

  it('contains the full dismissal, backdrop, blur, motion, and reduced-motion matrix', () => {
    const root = create().nativeElement as HTMLElement;

    expect(root.querySelectorAll('[data-default-backdrop-evidence]')).toHaveLength(1);
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

  it('contains no repeated Input, selection-picker, temporal-picker, or deferred-composite demos', () => {
    const root = create().nativeElement as HTMLElement;

    for (const selector of [
      'erp-date-box',
      'erp-time-box',
      'erp-date-time-box',
      'erp-date-range-box',
      'erp-color-picker',
      'erp-icon-picker',
      'erp-item-picker',
      'erp-combo-box',
      'erp-radio-group',
      'erp-button-group',
      'erp-split-button',
      'erp-fab-menu',
    ]) {
      expect(root.querySelector(selector)).toBeNull();
    }

    expect(root.querySelector('[data-review-group="temporal-pickers"]')).toBeNull();
    expect(root.querySelector('[data-review-group="selection-pickers"]')).toBeNull();
    expect(root.querySelector('[data-review-group="deferred-composites"]')).toBeNull();
  });

  it('opens exact modal and drawer configurations through the shared manager', () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);

    fixture.componentInstance.openModal();
    fixture.componentInstance.openDrawer('start');
    fixture.componentInstance.openDrawer('end');
    fixture.componentInstance.openDrawer('top');
    fixture.componentInstance.openDrawer('bottom');

    expect(
      manager.entries().map((entry) => ({
        kind: entry.ref.config.kind,
        position: entry.ref.config.position,
      })),
    ).toEqual([
      {kind: 'modal', position: 'center'},
      {kind: 'drawer', position: 'start'},
      {kind: 'drawer', position: 'end'},
      {kind: 'drawer', position: 'top'},
      {kind: 'drawer', position: 'bottom'},
    ]);
  });

  it('opens custom long-body Header Body Footer review evidence', () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll(
        '[data-long-body-frame-evidence]',
      ),
    ).toHaveLength(1);

    fixture.componentInstance.openLongBody();

    expect(manager.entries().at(-1)?.ref.config.frame).toEqual({
      header: {
        title: 'مراجعة الإطار ذي المحتوى الطويل',
        subtitle: 'يبقى الرأس والتذييل ظاهرين بينما يمرر الجسم فقط',
        icon: 'layers',
        closeLabel: 'إغلاق مراجعة الإطار',
      },
      footer: {
        actions: [
          {
            id: 'cancel',
            label: 'إلغاء المراجعة',
            icon: null,
            presentation: 'button',
            role: 'secondary',
            placement: 'end',
            disabled: false,
            loading: false,
          },
          {
            id: 'confirm',
            label: 'اعتماد المراجعة',
            icon: 'check',
            presentation: 'button',
            role: 'primary',
            placement: 'end',
            disabled: false,
            loading: false,
          },
        ],
      },
    });
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
