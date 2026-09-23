import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { TooltipControls } from './tooltip-controls';

describe('TooltipControls showcase', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [TooltipControls], providers: [provideRouter(routes)] }).compileComponents(); });
  function create() { const fixture = TestBed.createComponent(TooltipControls); fixture.detectChanges(); return fixture; }
  it('has the /controls/tooltips route and creates', () => { expect(routes.find((route) => route.path === 'controls/tooltips')).toBeDefined(); expect(create().componentInstance).toBeTruthy(); });
  it('renders exactly seven groups with exactly equivalent light and dark contexts', () => {
    const root = create().nativeElement as HTMLElement; const groups = [...root.querySelectorAll('[data-review-group]')]; expect(groups.length).toBe(7);
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual(['plain-basics', 'placements', 'arrow', 'rich-informational', 'rich-interactive', 'activation-controlled-disabled', 'collision-dismissal-keyboard']);
    for (const group of groups) expect([...group.querySelectorAll('[data-theme-context]')].map((context) => context.getAttribute('data-theme'))).toEqual(['light', 'dark']);
  });
  it('uses only approved ERP visible composition and includes all required evidence', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('erp-tooltip').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('erp-tooltip-content').length).toBe(6);
    expect(root.querySelectorAll('[data-review-group="placements"] erp-tooltip').length).toBe(8);
    expect(root.querySelectorAll('[data-review-group="rich-interactive"] erp-button').length).toBe(4);
    expect(root.querySelectorAll('[data-review-group="activation-controlled-disabled"] erp-tooltip').length).toBe(8);
    expect([...root.querySelectorAll<HTMLElement>('[data-placement-evidence]')].map((item) => item.getAttribute('data-tooltip-placement'))).toEqual(['top', 'bottom', 'start', 'end', 'top', 'bottom', 'start', 'end']);
    expect([...root.querySelectorAll<HTMLElement>('[data-arrow-evidence]')].map((item) => item.getAttribute('data-tooltip-show-arrow'))).toEqual(['true', 'false', 'true', 'false']);
    expect(root.querySelectorAll('[data-rich-informational-evidence]').length).toBe(2);
    expect(root.querySelectorAll('[data-rich-interactive-evidence]').length).toBe(2);
    expect(root.querySelectorAll('[data-activation-evidence="auto"]').length).toBe(2);
    expect(root.querySelectorAll('[data-activation-evidence="press"]').length).toBe(2);
    expect(root.querySelectorAll('[data-disabled-evidence][data-tooltip-state="disabled"]').length).toBe(2);
    expect(root.querySelectorAll('[data-collision-evidence="start-edge"]').length).toBe(2);
    expect(root.querySelectorAll('[data-collision-evidence="end-edge"]').length).toBe(2);
    expect(root.querySelectorAll('[data-keyboard-evidence]').length).toBe(2);
  });

  it('binds controlled open to genuine Tooltip model state', () => {
    Object.assign(HTMLElement.prototype, {
      showPopover: () => undefined,
      hidePopover: () => undefined,
    });
    const fixture = create();
    fixture.componentInstance.controlledOpen.set(true);
    fixture.detectChanges();
    const controlled = [...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[data-controlled-evidence]')];
    expect(controlled.map((item) => item.getAttribute('data-tooltip-open'))).toEqual(['true', 'true']);
    fixture.componentInstance.controlledOpen.set(false);
    fixture.detectChanges();
    expect(controlled.map((item) => item.getAttribute('data-tooltip-open'))).toEqual(['false', 'false']);
  });
});
