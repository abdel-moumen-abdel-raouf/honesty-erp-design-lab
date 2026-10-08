import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { ERP_MOTION_PRESETS } from '../../foundation/motion/motion-contracts';
import { TooltipControls } from './tooltip-controls';

describe('TooltipControls showcase', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [TooltipControls], providers: [provideRouter(routes)] }).compileComponents(); });
  function create() { const fixture = TestBed.createComponent(TooltipControls); fixture.detectChanges(); return fixture; }
  it('has the /controls/tooltips route and creates', () => { expect(routes.find((route) => route.path === 'controls/tooltips')).toBeDefined(); expect(create().componentInstance).toBeTruthy(); });
  it('renders exactly seven groups under the inherited global theme', () => {
    const root = create().nativeElement as HTMLElement; const groups = [...root.querySelectorAll('[data-review-group]')]; expect(groups.length).toBe(7);
    expect(groups.map((group) => group.getAttribute('data-review-group'))).toEqual(['plain-basics', 'placements', 'arrow', 'rich-informational', 'rich-interactive', 'activation-controlled-disabled', 'collision-dismissal-keyboard']);
    expect(root.querySelectorAll('[data-theme-context]')).toHaveLength(0);
    expect(root.querySelector('erp-container.tooltip-showcase')?.hasAttribute('data-theme')).toBe(false);
  });
  it('uses only approved ERP visible composition and includes all required evidence', () => {
    const root = create().nativeElement as HTMLElement;
    expect(root.querySelectorAll('erp-tooltip').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('erp-tooltip-content').length).toBe(4);
    expect(root.querySelectorAll('[data-review-group="placements"] erp-tooltip').length).toBe(4);
    expect(root.querySelectorAll('[data-review-group="rich-interactive"] erp-button').length).toBe(2);
    expect(root.querySelectorAll('[data-review-group="activation-controlled-disabled"] erp-tooltip').length).toBe(4);
    expect([...root.querySelectorAll<HTMLElement>('[data-placement-evidence]')].map((item) => item.getAttribute('data-tooltip-placement'))).toEqual(['top', 'bottom', 'start', 'end']);
    expect([...root.querySelectorAll<HTMLElement>('[data-arrow-evidence]')].map((item) => item.getAttribute('data-tooltip-show-arrow'))).toEqual(['true', 'false']);
    expect(root.querySelectorAll('[data-rich-informational-evidence]').length).toBe(1);
    expect(root.querySelectorAll('[data-rich-interactive-evidence]').length).toBe(1);
    expect(root.querySelectorAll('[data-activation-evidence="auto"]').length).toBe(1);
    expect(root.querySelectorAll('[data-activation-evidence="press"]').length).toBe(1);
    expect(root.querySelectorAll('[data-disabled-evidence][data-tooltip-state="disabled"]').length).toBe(1);
    expect(root.querySelectorAll('[data-collision-evidence="start-edge"]').length).toBe(1);
    expect(root.querySelectorAll('[data-collision-evidence="end-edge"]').length).toBe(1);
    expect(root.querySelectorAll('[data-keyboard-evidence]').length).toBe(1);
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
    expect(controlled.map((item) => item.getAttribute('data-tooltip-open'))).toEqual(['true']);
    fixture.componentInstance.controlledOpen.set(false);
    fixture.detectChanges();
    expect(controlled.map((item) => item.getAttribute('data-tooltip-open'))).toEqual(['false']);
  });

  it('provides one shared-catalog motion selector with plain and rich evidence', () => {
    const fixture = create();
    const root = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.motionOptions.map((item) => item.value)).toEqual([
      ...ERP_MOTION_PRESETS,
    ]);
    expect(root.querySelectorAll('[data-motion-selector-evidence]')).toHaveLength(1);
    expect(
      root.querySelectorAll('[data-wave-a-tooltip-motion-evidence]'),
    ).toHaveLength(1);
    expect(root.querySelectorAll('[data-enter-motion-selector]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-exit-motion-selector]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-motion-plain-evidence]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-motion-rich-evidence]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-motion-replay-action]')).toHaveLength(1);
    expect(
      root.querySelector('[data-selected-enter-preset]')?.textContent?.trim(),
    ).toContain('zoom');
    expect(
      root.querySelector('[data-selected-exit-preset]')?.textContent?.trim(),
    ).toContain('zoom');

    fixture.componentInstance.selectEnterAnimation('bounce');
    fixture.componentInstance.selectExitAnimation('swing');
    fixture.detectChanges();
    for (const evidence of root.querySelectorAll<HTMLElement>(
      '[data-motion-plain-evidence], [data-motion-rich-evidence]',
    )) {
      expect(evidence.getAttribute('data-tooltip-enter-animation')).toBe('bounce');
      expect(evidence.getAttribute('data-tooltip-exit-animation')).toBe('swing');
    }
    expect(
      root.querySelector('[data-selected-enter-preset]')?.textContent?.trim(),
    ).toContain('bounce');
    expect(
      root.querySelector('[data-selected-exit-preset]')?.textContent?.trim(),
    ).toContain('swing');
  });

  it('provides an explicit replay action for the controlled plain motion proof', async () => {
    const fixture = create();
    const component = fixture.componentInstance;

    expect(component.motionPreviewOpen()).toBe(true);
    component.replayMotion();
    expect(component.motionPreviewOpen()).toBe(false);

    await Promise.resolve();
    fixture.detectChanges();
    expect(component.motionPreviewOpen()).toBe(true);
  });
});
