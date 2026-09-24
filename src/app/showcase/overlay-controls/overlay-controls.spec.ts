import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
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

  it('has the /controls/overlays route and creates', () => {
    expect(routes.find((route) => route.path === 'controls/overlays')).toBeDefined();
    expect(create().componentInstance).toBeTruthy();
  });

  it('renders four technical groups with equivalent Light and Dark contexts', () => {
    const root = create().nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll('[data-review-group]')];
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual([
      'modal',
      'drawers',
      'nested-stack',
      'dismissal-focus',
    ]);

    for (const group of groups) {
      expect(
        [...group.querySelectorAll('[data-theme-context]')].map((context) =>
          context.getAttribute('data-theme'),
        ),
      ).toEqual(['light', 'dark']);
    }
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
});
