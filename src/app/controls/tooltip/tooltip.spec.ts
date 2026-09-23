import {Component, reflectComponentType, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpTooltip} from './tooltip';
import {ErpTooltipContent} from './tooltip-content';

@Component({imports: [ErpTooltip, ErpTooltipContent], template: `
  <erp-tooltip [text]="text()" [variant]="variant()" [interactive]="interactive()" [activation]="activation()" [showArrow]="showArrow()" [disabled]="disabled()" [(open)]="open">
    <button id="trigger" aria-describedby="existing">Trigger</button>
    @if (variant() === 'rich') { <erp-tooltip-content>@if (interactive()) { <button id="inside">Action</button> } @else { Information }</erp-tooltip-content> }
  </erp-tooltip>
`})
class TooltipHost {
  readonly text = signal<string | null>('Helpful text');
  readonly variant = signal<'plain' | 'rich'>('plain');
  readonly interactive = signal(false);
  readonly activation = signal<'auto' | 'press'>('auto');
  readonly disabled = signal(false);
  readonly showArrow = signal(true);
  readonly open = signal(false);
}

@Component({imports: [ErpTooltip, ErpTooltipContent], template: `
  <erp-tooltip [text]="text()" [variant]="variant()" [interactive]="interactive()" [(open)]="open">
    @if (triggerCount() === 0) { <span>Not focusable</span> }
    @if (triggerCount() >= 1) { <button id="primary-trigger">Primary</button> }
    @if (triggerCount() >= 2) { <button id="secondary-trigger">Secondary</button> }
    @if (contentCount() >= 1) {
      <erp-tooltip-content>
        @if (contentFocusable()) { <button>Rich action</button> } @else { Rich information }
      </erp-tooltip-content>
    }
    @if (contentCount() >= 2) { <erp-tooltip-content>Second content</erp-tooltip-content> }
  </erp-tooltip>
`})
class TooltipValidationHost {
  readonly text = signal<string | null>('Name');
  readonly variant = signal<'plain' | 'rich'>('plain');
  readonly interactive = signal(false);
  readonly triggerCount = signal(1);
  readonly contentCount = signal(0);
  readonly contentFocusable = signal(false);
  readonly open = signal(false);
}

describe('ErpTooltip', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    Object.assign(HTMLElement.prototype, {
      showPopover: vi.fn(function(this: HTMLElement) { this.setAttribute('data-popover-open', ''); }),
      hidePopover: vi.fn(function(this: HTMLElement) { this.removeAttribute('data-popover-open'); }),
    });
    vi.spyOn(HTMLElement.prototype, 'matches').mockImplementation(function(this: HTMLElement, selector: string) { return selector === ':popover-open' ? this.hasAttribute('data-popover-open') : false; });
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => setTimeout(() => callback(0), 0));
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
    await TestBed.configureTestingModule({imports: [TooltipHost, TooltipValidationHost]}).compileComponents();
  });
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });

  function create() { const fixture = TestBed.createComponent(TooltipHost); fixture.detectChanges(); return fixture; }

  it('has the exact selector, defaults, model, evidence attributes, and plain semantics', () => {
    const fixture = create();
    const tooltip = fixture.nativeElement.querySelector('erp-tooltip') as HTMLElement;
    const instance = fixture.debugElement.children[0].componentInstance as ErpTooltip;
    expect(reflectComponentType(ErpTooltip)?.selector).toBe('erp-tooltip');
    expect(instance.variant()).toBe('plain'); expect(instance.placement()).toBe('top'); expect(instance.activation()).toBe('auto');
    expect(instance.interactive()).toBe(false); expect(instance.showArrow()).toBe(true); expect(instance.disabled()).toBe(false); expect(instance.open()).toBe(false);
    expect(tooltip.getAttribute('data-tooltip-state')).toBe('ready');
    expect(tooltip.querySelector('[role="tooltip"]')).toBeTruthy();
    expect(tooltip.querySelector('erp-text')?.getAttribute('data-text-tone')).toBe('inherit');
    expect(tooltip.querySelectorAll('.erp-tooltip__arrow').length).toBe(1);
  });

  it('enforces invalid then disabled then ready state and forces open false', () => {
    const fixture = create(); const host = fixture.componentInstance; const tooltip = fixture.nativeElement.querySelector('erp-tooltip') as HTMLElement;
    host.text.set(' '); host.disabled.set(true); fixture.detectChanges(); vi.runAllTimers(); fixture.detectChanges();
    expect(tooltip.getAttribute('data-tooltip-state')).toBe('invalid'); expect(host.open()).toBe(false);
    host.text.set('valid'); fixture.detectChanges(); vi.runAllTimers(); fixture.detectChanges(); expect(tooltip.getAttribute('data-tooltip-state')).toBe('disabled');
    host.disabled.set(false); fixture.detectChanges(); vi.runAllTimers(); fixture.detectChanges(); expect(tooltip.getAttribute('data-tooltip-state')).toBe('ready');
  });

  it('validates every plain and rich content grammar branch', () => {
    const fixture = TestBed.createComponent(TooltipValidationHost);
    const host = fixture.componentInstance;
    const state = () => (fixture.nativeElement as HTMLElement).querySelector('erp-tooltip')?.getAttribute('data-tooltip-state');
    fixture.detectChanges();
    expect(state()).toBe('ready');

    host.text.set('  '); fixture.detectChanges(); expect(state()).toBe('invalid');
    host.text.set('Plain'); host.interactive.set(true); fixture.detectChanges(); expect(state()).toBe('invalid');
    host.interactive.set(false); host.contentCount.set(1); fixture.detectChanges(); expect(state()).toBe('invalid');

    host.variant.set('rich'); host.contentCount.set(0); fixture.detectChanges(); expect(state()).toBe('invalid');
    host.contentCount.set(1); host.text.set(null); fixture.detectChanges(); expect(state()).toBe('ready');
    host.contentFocusable.set(true); fixture.detectChanges(); fixture.detectChanges(); expect(state()).toBe('invalid');
    host.interactive.set(true); fixture.detectChanges(); expect(state()).toBe('invalid');
    host.text.set('  Dialog name  '); fixture.detectChanges(); expect(state()).toBe('ready');
    host.contentCount.set(2); fixture.detectChanges(); expect(state()).toBe('invalid');
  });

  it('requires exactly one focusable trigger and invalid configurations never open', () => {
    const fixture = TestBed.createComponent(TooltipValidationHost);
    const host = fixture.componentInstance;
    const tooltip = () => (fixture.nativeElement as HTMLElement).querySelector('erp-tooltip') as HTMLElement;
    fixture.detectChanges();
    host.triggerCount.set(0); host.open.set(true); fixture.detectChanges();
    expect(tooltip().getAttribute('data-tooltip-state')).toBe('invalid'); expect(host.open()).toBe(false);
    host.triggerCount.set(2); host.open.set(true); fixture.detectChanges();
    expect(tooltip().getAttribute('data-tooltip-state')).toBe('invalid'); expect(host.open()).toBe(false);
    expect(tooltip().querySelector('.erp-tooltip__trigger')?.hasAttribute('tabindex')).toBe(false);
  });

  it('opens at 500ms on hover and closes plain at 100ms while preserving aria-describedby', () => {
    const fixture = create(); const root = fixture.nativeElement as HTMLElement; const wrapper = root.querySelector('.erp-tooltip__trigger')!; const trigger = root.querySelector('#trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'mouse'})); vi.advanceTimersByTime(499); expect(fixture.componentInstance.open()).toBe(false);
    vi.advanceTimersByTime(1); fixture.detectChanges(); expect(fixture.componentInstance.open()).toBe(true); expect(trigger.getAttribute('aria-describedby')).toContain('existing'); expect(trigger.getAttribute('aria-describedby')).toContain('honesty-tooltip-');
    wrapper.dispatchEvent(new PointerEvent('pointerleave', {pointerType: 'mouse'})); vi.advanceTimersByTime(99); expect(fixture.componentInstance.open()).toBe(true);
    vi.advanceTimersByTime(1); expect(fixture.componentInstance.open()).toBe(false); expect(trigger.getAttribute('aria-describedby')).toBe('existing');
  });

  it('cancels pending hover and close timers on precision-pointer re-entry', () => {
    const fixture = create(); const host = fixture.componentInstance; const root = fixture.nativeElement as HTMLElement; const wrapper = root.querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'pen'}));
    vi.advanceTimersByTime(250);
    wrapper.dispatchEvent(new PointerEvent('pointerleave', {pointerType: 'pen'}));
    vi.advanceTimersByTime(500);
    expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'mouse'}));
    vi.advanceTimersByTime(500);
    expect(host.open()).toBe(true);
    wrapper.dispatchEvent(new PointerEvent('pointerleave', {pointerType: 'mouse'}));
    vi.advanceTimersByTime(50);
    wrapper.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'mouse'}));
    vi.advanceTimersByTime(100);
    expect(host.open()).toBe(true);
  });

  it('opens immediately on focus and press activation consumes the action', () => {
    const fixture = create(); const host = fixture.componentInstance; const root = fixture.nativeElement as HTMLElement; const wrapper = root.querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true})); expect(host.open()).toBe(true);
    fixture.destroy();
    const pressFixture = create(); const pressHost = pressFixture.componentInstance; pressHost.activation.set('press'); pressFixture.detectChanges();
    const pressWrapper = (pressFixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    const click = new MouseEvent('click', {bubbles: true, cancelable: true}); pressWrapper.dispatchEvent(click); expect(click.defaultPrevented).toBe(true); expect(pressHost.open()).toBe(true);
  });

  it('validates rich interaction, dialog semantics, and the 200ms bridge', () => {
    const fixture = create(); const host = fixture.componentInstance; host.variant.set('rich'); host.interactive.set(true); fixture.detectChanges(); vi.runAllTimers(); fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement; const wrapper = root.querySelector('.erp-tooltip__trigger')!; const trigger = root.querySelector('#trigger')!;
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true})); fixture.detectChanges();
    expect(root.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe('Helpful text'); expect(trigger.getAttribute('aria-haspopup')).toBe('dialog'); expect(trigger.getAttribute('aria-expanded')).toBe('true');
    wrapper.dispatchEvent(new PointerEvent('pointerleave', {pointerType: 'mouse'})); vi.advanceTimersByTime(199); expect(host.open()).toBe(true); vi.advanceTimersByTime(1); expect(host.open()).toBe(false);
  });

  it('cancels the interactive bridge timer on surface entry and tracks aria-expanded', () => {
    const fixture = create(); const host = fixture.componentInstance; host.variant.set('rich'); host.interactive.set(true); fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement; const wrapper = root.querySelector('.erp-tooltip__trigger')!; const surface = root.querySelector('.erp-tooltip__surface')!; const trigger = root.querySelector('#trigger')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true})); expect(trigger.getAttribute('aria-expanded')).toBe('true');
    wrapper.dispatchEvent(new PointerEvent('pointerleave', {pointerType: 'mouse'})); vi.advanceTimersByTime(100);
    surface.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'mouse'})); vi.advanceTimersByTime(200);
    expect(host.open()).toBe(true);
    host.open.set(false); fixture.detectChanges(); expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(surface.hasAttribute('aria-modal')).toBe(false);
  });

  it('uses 700ms touch long press, movement cancellation, click suppression, and 1500ms release lifetime', () => {
    const fixture = create(); const host = fixture.componentInstance; const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch', clientX: 0, clientY: 0})); vi.advanceTimersByTime(699); expect(host.open()).toBe(false); vi.advanceTimersByTime(1); expect(host.open()).toBe(true);
    wrapper.dispatchEvent(new PointerEvent('pointerup', {pointerType: 'touch'})); vi.advanceTimersByTime(1499); expect(host.open()).toBe(true); vi.advanceTimersByTime(1); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch', clientX: 0, clientY: 0})); wrapper.dispatchEvent(new PointerEvent('pointermove', {pointerType: 'touch', clientX: 9, clientY: 0})); vi.advanceTimersByTime(700); expect(host.open()).toBe(false);
  });

  it('preserves short taps and cancels long press on release, cancel, or scroll', () => {
    const fixture = create(); const host = fixture.componentInstance; const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch'}));
    vi.advanceTimersByTime(699);
    wrapper.dispatchEvent(new PointerEvent('pointerup', {pointerType: 'touch'}));
    const shortClick = new MouseEvent('click', {bubbles: true, cancelable: true}); wrapper.dispatchEvent(shortClick);
    expect(shortClick.defaultPrevented).toBe(false); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch'})); wrapper.dispatchEvent(new PointerEvent('pointercancel', {pointerType: 'touch'})); vi.advanceTimersByTime(700); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch'})); window.dispatchEvent(new Event('scroll')); vi.advanceTimersByTime(700); expect(host.open()).toBe(false);
  });

  it('suppresses only the successful long-press click and its context menu path', () => {
    const fixture = create(); const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch'})); vi.advanceTimersByTime(700);
    const contextMenu = new MouseEvent('contextmenu', {bubbles: true, cancelable: true}); wrapper.dispatchEvent(contextMenu); expect(contextMenu.defaultPrevented).toBe(true);
    const associated = new MouseEvent('click', {bubbles: true, cancelable: true}); wrapper.dispatchEvent(associated); expect(associated.defaultPrevented).toBe(true);
    const next = new MouseEvent('click', {bubbles: true, cancelable: true}); wrapper.dispatchEvent(next); expect(next.defaultPrevented).toBe(false);
  });

  it('keeps an interactive rich long press open after release until ordinary dismissal', () => {
    const fixture = create(); const host = fixture.componentInstance; host.variant.set('rich'); host.interactive.set(true); fixture.detectChanges();
    const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch'})); vi.advanceTimersByTime(700);
    wrapper.dispatchEvent(new PointerEvent('pointerup', {pointerType: 'touch'})); vi.advanceTimersByTime(1500);
    expect(host.open()).toBe(true);
    document.body.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
    expect(host.open()).toBe(false);
  });

  it('press mode ignores hover/focus, toggles twice, and closes on Escape or outside pointer', () => {
    const fixture = create(); const host = fixture.componentInstance; host.activation.set('press'); fixture.detectChanges();
    const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    wrapper.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'mouse'})); vi.advanceTimersByTime(500);
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true})); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true})); expect(host.open()).toBe(true);
    wrapper.dispatchEvent(new PointerEvent('pointerleave', {pointerType: 'mouse'})); vi.advanceTimersByTime(500); expect(host.open()).toBe(true);
    wrapper.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true})); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
    document.body.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true})); expect(host.open()).toBe(false);
  });

  it('keeps focus bridge open, does not trap Tab, closes on focus exit, and returns focus only for surface Escape', () => {
    const fixture = create(); const host = fixture.componentInstance; host.variant.set('rich'); host.interactive.set(true); fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement; const wrapper = root.querySelector('.erp-tooltip__trigger')!; const surface = root.querySelector('.erp-tooltip__surface')!; const trigger = root.querySelector('#trigger') as HTMLButtonElement; const inside = root.querySelector('#inside') as HTMLButtonElement;
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true})); expect(host.open()).toBe(true);
    wrapper.dispatchEvent(new FocusEvent('focusout', {bubbles: true, relatedTarget: inside})); expect(host.open()).toBe(true);
    const tab = new KeyboardEvent('keydown', {key: 'Tab', bubbles: true, cancelable: true}); inside.dispatchEvent(tab); expect(tab.defaultPrevented).toBe(false);
    surface.dispatchEvent(new FocusEvent('focusout', {bubbles: true, relatedTarget: document.body})); expect(host.open()).toBe(false);
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true}));
    const focus = vi.spyOn(trigger, 'focus'); inside.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})); expect(focus).toHaveBeenCalledOnce();
    wrapper.dispatchEvent(new FocusEvent('focusin', {bubbles: true})); focus.mockClear(); document.body.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true})); expect(focus).not.toHaveBeenCalled();
  });

  it('honors programmatic model changes without focus movement and outside dismissal', () => {
    const fixture = create(); const host = fixture.componentInstance; const trigger = (fixture.nativeElement as HTMLElement).querySelector('#trigger') as HTMLButtonElement;
    const focus = vi.spyOn(trigger, 'focus'); host.open.set(true); fixture.detectChanges(); vi.runAllTimers(); expect(host.open()).toBe(true); host.open.set(false); fixture.detectChanges(); vi.runAllTimers(); expect(focus).not.toHaveBeenCalled();
    host.open.set(true); fixture.detectChanges(); vi.runAllTimers(); document.body.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true})); expect(host.open()).toBe(false);
  });

  it('disabled Tooltip does not consume press or auto-touch trigger actions', () => {
    const fixture = create();
    const host = fixture.componentInstance;
    host.disabled.set(true);
    host.activation.set('press');
    fixture.detectChanges();

    const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.erp-tooltip__trigger')!;
    const pressClick = new MouseEvent('click', {bubbles: true, cancelable: true});
    wrapper.dispatchEvent(pressClick);
    expect(pressClick.defaultPrevented).toBe(false);
    expect(host.open()).toBe(false);

    host.activation.set('auto');
    fixture.detectChanges();
    wrapper.dispatchEvent(new PointerEvent('pointerdown', {pointerType: 'touch', clientX: 0, clientY: 0}));
    vi.advanceTimersByTime(700);
    const touchClick = new MouseEvent('click', {bubbles: true, cancelable: true});
    wrapper.dispatchEvent(touchClick);
    expect(touchClick.defaultPrevented).toBe(false);
    expect(host.open()).toBe(false);
  });

  it('converts rem geometry tokens to pixels and uses physical arrow offsets', () => {
    const fixture = create();
    const instance = fixture.debugElement.children[0].componentInstance as ErpTooltip;
    const root = fixture.nativeElement as HTMLElement;
    const surface = root.querySelector('.erp-tooltip__surface') as HTMLElement;
    const originalGetComputedStyle = window.getComputedStyle.bind(window);

    const styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation((element: Element) => {
      if (element === surface) {
        return {
          direction: 'ltr',
          fontSize: '16px',
          getPropertyValue: () => '0.5rem',
        } as unknown as CSSStyleDeclaration;
      }
      if (element === document.documentElement) {
        return {
          fontSize: '20px',
          getPropertyValue: () => '',
        } as unknown as CSSStyleDeclaration;
      }
      return originalGetComputedStyle(element);
    });

    expect((instance as unknown as {cssLengthPx(name: string): number}).cssLengthPx('--test')).toBe(10);
    styleSpy.mockRestore();

    const arrow = document.createElement('span');
    (instance as unknown as {
      applyArrowGeometry(
        arrowElement: HTMLElement,
        result: {x: number; y: number; placement: 'top' | 'bottom' | 'left' | 'right'; arrowCrossAxisCenter: number},
      ): void;
    }).applyArrowGeometry(arrow, {x: 0, y: 0, placement: 'top', arrowCrossAxisCenter: 40});

    expect(arrow.style.left).toContain('40px');
    expect(arrow.style.right).toBe('');
    expect(arrow.style.bottom).toContain('--honesty-tooltip-arrow-height');
  });

  it('renders the private nonsemantic arrow only when requested', () => {
    const fixture = create();
    const instance = fixture.debugElement.children[0].componentInstance as ErpTooltip;
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.erp-tooltip__arrow')?.getAttribute('aria-hidden')).toBe('true');
    fixture.componentInstance.showArrow.set(false);
    fixture.detectChanges();
    expect(instance.showArrow()).toBe(false);
    expect(root.querySelector('.erp-tooltip__arrow')).toBeNull();
  });
});
