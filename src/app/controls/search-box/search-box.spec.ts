import {Component, reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ErpSearchBox} from './search-box';

@Component({
  imports: [ErpSearchBox],
  selector: 'app-search-box-projection-test',
  template: `
    <erp-search-box label="Search">
      <div id="projected-result" search-results>Projected result</div>
    </erp-search-box>
  `,
})
class SearchBoxProjectionTest {}

@Component({
  imports: [ErpSearchBox],
  selector: 'app-search-box-stack-test',
  template: `
    <erp-search-box id="first-search" label="First search" />
    <erp-search-box id="second-search" label="Second search" />
  `,
})
class SearchBoxStackTest {}

describe('ErpSearchBox', () => {
  let animationFrames: FrameRequestCallback[];

  beforeEach(() => {
    animationFrames = [];
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        animationFrames.push(callback);
        return animationFrames.length;
      }),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    TestBed.configureTestingModule({
      imports: [
        ErpSearchBox,
        SearchBoxProjectionTest,
        SearchBoxStackTest,
      ],
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function create() {
    const fixture = TestBed.createComponent(ErpSearchBox);
    fixture.componentRef.setInput('label', 'Search');
    fixture.detectChanges();
    return fixture;
  }

  function flushAnimationFrames(): void {
    while (animationFrames.length > 0) {
      animationFrames.shift()?.(performance.now());
    }
  }

  function installPopover(surface: HTMLElement): void {
    Object.assign(surface, {
      showPopover: vi.fn(() =>
        surface.setAttribute('data-popover-open', ''),
      ),
      hidePopover: vi.fn(() =>
        surface.removeAttribute('data-popover-open'),
      ),
    });
    const nativeMatches = surface.matches.bind(surface);
    vi.spyOn(surface, 'matches').mockImplementation((selector) =>
      selector === ':popover-open'
        ? surface.hasAttribute('data-popover-open')
        : nativeMatches(selector),
    );
  }

  function openPopup(fixture: ReturnType<typeof create>) {
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector(
      '.search-box__popup',
    ) as HTMLElement;
    installPopover(surface);
    (host.querySelector('erp-field-trigger button') as HTMLButtonElement).click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();
    return surface;
  }

  it('creates with exact popup defaults and search semantics', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpSearchBox)?.selector).toBe('erp-search-box');
    expect(control.autocomplete()).toBe('off');
    expect(control.popupMode()).toBe(true);
    expect(control.dismissOnOutside()).toBe(true);
    expect(control.dismissOnEscape()).toBe(true);
    expect(control.showDefaultSearchIcon()).toBe(true);
    expect(control.enterAnimation()).toBe('fade-scale');
    expect(control.exitAnimation()).toBe('fade-scale');
    expect(native.type).toBe('search');
    expect(native.autocomplete).toBe('off');
    expect(host.getAttribute('data-search-box-popup-open')).toBe('false');
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe(
      'search',
    );
  });

  it('keeps inline mode as a direct native search editor', () => {
    const fixture = create();
    fixture.componentRef.setInput('popupMode', false);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('erp-field-trigger')).toBeNull();
    expect(host.querySelector('.search-box__popup')).toBeNull();
    expect((host.querySelector('input') as HTMLInputElement).type).toBe('search');
  });

  it('publishes search typing without a search-submit output', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    native.value = 'invoice';
    native.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('invoice');
    expect(
      'searchSubmitted' in
        (control as unknown as Record<string, unknown>),
    ).toBe(false);
  });

  it('projects generic results into the popup container', () => {
    const fixture = TestBed.createComponent(SearchBoxProjectionTest);
    fixture.detectChanges();
    const searchBox = fixture.debugElement.query(By.directive(ErpSearchBox));

    expect(
      searchBox.nativeElement.querySelector(
        '.search-box__results > #projected-result',
      ),
    ).not.toBeNull();
  });

  it('preserves one continuous query across popup close and reopen', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const surface = openPopup(fixture);
    const input = host.querySelector('input') as HTMLInputElement;
    input.value = 'customer';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    surface.dispatchEvent(new Event('transitionend', {bubbles: true}));
    fixture.detectChanges();
    (host.querySelector('erp-field-trigger button') as HTMLButtonElement).click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();

    expect((host.querySelector('input') as HTMLInputElement).value).toBe(
      'customer',
    );
  });

  it('honors outside-pointer dismissal on and off', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const surface = openPopup(fixture);

    fixture.componentRef.setInput('dismissOnOutside', false);
    fixture.detectChanges();
    document.body.dispatchEvent(new Event('pointerdown', {bubbles: true}));
    fixture.detectChanges();
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('open');

    fixture.componentRef.setInput('dismissOnOutside', true);
    fixture.detectChanges();
    document.body.dispatchEvent(new Event('pointerdown', {bubbles: true}));
    fixture.detectChanges();
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('leaving');
    surface.dispatchEvent(new Event('transitionend', {bubbles: true}));
  });

  it('honors Escape dismissal on and off', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const surface = openPopup(fixture);

    fixture.componentRef.setInput('dismissOnEscape', false);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('open');

    fixture.componentRef.setInput('dismissOnEscape', true);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('leaving');
    surface.dispatchEvent(new Event('transitionend', {bubbles: true}));
  });

  it('allows only the active SearchBox popup to respond to dismissal', () => {
    const fixture = TestBed.createComponent(SearchBoxStackTest);
    fixture.detectChanges();
    const first = fixture.nativeElement.querySelector(
      '#first-search',
    ) as HTMLElement;
    const second = fixture.nativeElement.querySelector(
      '#second-search',
    ) as HTMLElement;
    for (const control of [first, second]) {
      installPopover(
        control.querySelector('.search-box__popup') as HTMLElement,
      );
      (control.querySelector('button') as HTMLButtonElement).click();
      fixture.detectChanges();
      flushAnimationFrames();
      fixture.detectChanges();
    }

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();

    expect(first.getAttribute('data-search-box-popup-phase')).toBe('open');
    expect(second.getAttribute('data-search-box-popup-phase')).toBe('leaving');
  });

  it('exposes all seven motion presets and the active exit preset', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    for (const animation of [
      'fade',
      'scale',
      'fade-scale',
      'slide-up',
      'slide-down',
      'slide-start',
      'slide-end',
    ] as const) {
      fixture.componentRef.setInput('enterAnimation', animation);
      fixture.detectChanges();
      expect(host.getAttribute('data-search-box-animation')).toBe(animation);
    }

    fixture.componentRef.setInput('exitAnimation', 'slide-end');
    fixture.detectChanges();
    const surface = openPopup(fixture);
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('leaving');
    expect(host.getAttribute('data-search-box-animation')).toBe('slide-end');
    surface.dispatchEvent(new Event('transitionend', {bubbles: true}));
  });

  it('hands focus to the editor and restores it to the trigger on Escape', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;
    const surface = openPopup(fixture);
    const input = host.querySelector('input') as HTMLInputElement;

    expect(document.activeElement).toBe(input);
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    surface.dispatchEvent(new Event('transitionend', {bubbles: true}));
    fixture.detectChanges();
    expect(document.activeElement).toBe(trigger);
  });

  it('uses anchored collision placement in an RTL context', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    host.setAttribute('dir', 'rtl');
    const trigger = host.querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;
    const surface = host.querySelector(
      '.search-box__popup',
    ) as HTMLElement;
    trigger.style.direction = 'rtl';
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      bottom: 760,
      height: 40,
      left: 100,
      right: 300,
      top: 720,
      width: 200,
      x: 100,
      y: 720,
      toJSON: () => undefined,
    });
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      bottom: 200,
      height: 200,
      left: 0,
      right: 320,
      top: 0,
      width: 320,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    });
    installPopover(surface);
    trigger.click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();

    expect(host.getAttribute('data-search-box-resolved-placement')).toBe('top');
    expect(getComputedStyle(trigger).direction).toBe('rtl');
  });

  it('applies custom, default, and hidden icon priority exactly', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('leadingIcon', 'filter');
    fixture.componentRef.setInput('showDefaultSearchIcon', false);
    fixture.detectChanges();
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe(
      'filter',
    );

    fixture.componentRef.setInput('leadingIcon', null);
    fixture.detectChanges();
    expect(host.querySelector('erp-icon')).toBeNull();

    fixture.componentRef.setInput('showDefaultSearchIcon', true);
    fixture.detectChanges();
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe(
      'search',
    );
  });
});
