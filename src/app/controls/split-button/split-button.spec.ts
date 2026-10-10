import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpSplitButton} from './split-button';

describe('ErpSplitButton', () => {
  let animationFrames: FrameRequestCallback[];

  beforeEach(() => {
    vi.useFakeTimers();
    animationFrames = [];
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        animationFrames.push(callback);
        return animationFrames.length;
      }),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    TestBed.configureTestingModule({imports: [ErpSplitButton]});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  function create() {
    const fixture = TestBed.createComponent(ErpSplitButton);
    fixture.componentRef.setInput('label', 'Export');
    fixture.componentRef.setInput('items', [
      {value: 'pdf', label: 'PDF'},
      {value: 'csv', label: 'CSV'},
    ]);
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
  }

  it('renders one visual entity from two logical attached segments', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const primary = host.querySelector('erp-button');
    const trigger = host.querySelector('erp-icon-button');

    expect(fixture.componentInstance).toBeTruthy();
    expect(primary).not.toBeNull();
    expect(trigger).not.toBeNull();
    expect(primary?.getAttribute('data-attached-axis')).toBe('inline');
    expect(primary?.getAttribute('data-attached-position')).toBe('first');
    expect(trigger?.getAttribute('data-attached-axis')).toBe('inline');
    expect(trigger?.getAttribute('data-attached-position')).toBe('last');
    expect(trigger?.getAttribute('data-icon-button-variant')).toBe('solid');
    expect(trigger?.getAttribute('data-icon-button-tone')).toBe('primary');
    expect(trigger?.getAttribute('data-icon-button-shape')).toBe('default');
    expect(host.getAttribute('data-split-button-disabled')).toBe('false');
    expect(host.querySelectorAll('[role="menu"]')).toHaveLength(1);
    expect(host.querySelector('[role="menu"]')?.getAttribute('aria-label'))
      .toBe('Export - القائمة');
    expect(trigger?.querySelector('button')?.getAttribute('aria-haspopup'))
      .toBe('menu');
    expect(trigger?.querySelector('button')?.getAttribute('aria-expanded'))
      .toBe('false');
    expect(trigger?.querySelector('button')?.getAttribute('aria-controls'))
      .toBe(host.querySelector('.split-button__menu')?.id);
    expect(getComputedStyle(host).inlineSize).toBe('fit-content');
  });

  it('preserves the primary action and opens a nonblocking anchored top-layer menu', async () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);
    const primaryPressed = vi.fn();
    const selected = vi.fn();
    fixture.componentInstance.primaryPressed.subscribe(primaryPressed);
    fixture.componentInstance.itemSelected.subscribe(selected);
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector<HTMLElement>('.split-button__menu')!;
    installPopover(surface);
    const buttons = host.querySelectorAll<HTMLButtonElement>(
      '.split-button > erp-button button, .split-button > erp-icon-button button',
    );

    buttons[0].click();
    buttons[1].click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();
    await Promise.resolve();

    expect(primaryPressed).toHaveBeenCalledOnce();
    expect(manager.entries()).toHaveLength(0);
    expect(host.getAttribute('data-split-button-open')).toBe('true');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(surface.getAttribute('popover')).toBe('manual');
    expect(surface.style.left).not.toBe('');
    expect(surface.style.top).not.toBe('');

    surface
      .querySelector<HTMLButtonElement>('[data-action-item] button')
      ?.click();
    fixture.detectChanges();
    await Promise.resolve();

    expect(selected).toHaveBeenCalledWith('pdf');
    expect(host.getAttribute('data-split-button-open')).toBe('false');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('dismisses the anchored menu on Escape and restores the menu trigger', async () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector<HTMLElement>('.split-button__menu')!;
    installPopover(surface);
    const trigger = host.querySelector<HTMLButtonElement>(
      '.split-button > erp-icon-button button',
    );

    trigger?.click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}),
    );
    fixture.detectChanges();
    await Promise.resolve();

    expect(host.getAttribute('data-split-button-open')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });

  it('renders text-only, icon-only, and icon-text menu actions through the shared action owner', () => {
    const fixture = TestBed.createComponent(ErpSplitButton);
    fixture.componentRef.setInput('label', 'Save');
    fixture.componentRef.setInput('items', [
      {value: 'text', label: 'Text only', presentation: 'text'},
      {value: 'icon', label: 'Icon only', icon: 'eye', presentation: 'icon'},
      {value: 'mixed', label: 'Icon and text', icon: 'save', presentation: 'icon-text'},
    ]);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      '.split-button__menu',
    )!;
    const actions = surface.querySelectorAll('[data-action-item]');

    expect(actions).toHaveLength(3);
    expect(actions[0].tagName.toLowerCase()).toBe('erp-button');
    expect(actions[0].querySelector('button')?.getAttribute('role')).toBe('menuitem');
    expect(actions[0].querySelector('erp-icon')).toBeNull();
    expect(actions[1].tagName.toLowerCase()).toBe('erp-icon-button');
    expect(actions[1].closest('erp-tooltip')).not.toBeNull();
    expect(actions[1].querySelector('button')?.getAttribute('role')).toBe('menuitem');
    expect(actions[2].tagName.toLowerCase()).toBe('erp-button');
    expect(actions[2].querySelector('erp-icon')).not.toBeNull();
  });
});
