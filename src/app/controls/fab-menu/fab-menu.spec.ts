import {TestBed} from '@angular/core/testing';
import {ErpFabMenu} from './fab-menu';

describe('ErpFabMenu', () => {
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
    TestBed.configureTestingModule({imports: [ErpFabMenu]});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  function create() {
    const fixture = TestBed.createComponent(ErpFabMenu);
    fixture.componentRef.setInput('label', 'Create');
    fixture.componentRef.setInput('items', [
      {value: 'invoice', label: 'Invoice', icon: 'file'},
      {value: 'customer', label: 'Customer', icon: 'customer'},
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

  it('creates closed with one stable FAB trigger and a hidden top-layer action surface', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector<HTMLElement>('.fab-menu__actions');

    expect(fixture.componentInstance).toBeTruthy();
    expect(host.getAttribute('data-fab-menu-open')).toBe('false');
    expect(host.getAttribute('data-fab-menu-placement')).toBe('block-start');
    expect(host.querySelectorAll('erp-fab')).toHaveLength(1);
    expect(host.querySelectorAll('erp-extended-fab')).toHaveLength(2);
    expect(surface?.getAttribute('popover')).toBe('manual');
  });

  it('opens actions in the anchored top layer without replacing the trigger, emits, and closes', async () => {
    const fixture = create();
    const selected = vi.fn();
    fixture.componentInstance.itemSelected.subscribe(selected);
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector<HTMLElement>('.fab-menu__actions')!;
    installPopover(surface);
    const trigger = host.querySelector<HTMLButtonElement>(
      '[data-fab-menu-trigger] button',
    );

    trigger?.click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();
    await Promise.resolve();

    expect(host.getAttribute('data-fab-menu-open')).toBe('true');
    expect(host.querySelector<HTMLButtonElement>(
      '[data-fab-menu-trigger] button',
    )).toBe(trigger);
    expect(surface.style.left).not.toBe('');
    expect(surface.style.top).not.toBe('');

    surface
      .querySelector<HTMLButtonElement>('[data-fab-menu-action] button')
      ?.click();
    fixture.detectChanges();
    await Promise.resolve();

    expect(selected).toHaveBeenCalledWith('invoice');
    expect(host.getAttribute('data-fab-menu-open')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });

  it('maps logical placement to the anchored side and closes from Escape', async () => {
    const fixture = create();
    fixture.componentRef.setInput('placement', 'block-end');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector<HTMLElement>('.fab-menu__actions')!;
    installPopover(surface);
    const trigger = host.querySelector<HTMLButtonElement>(
      '[data-fab-menu-trigger] button',
    );

    trigger?.click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();

    host.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}),
    );
    fixture.detectChanges();
    await Promise.resolve();

    expect(host.getAttribute('data-fab-menu-placement')).toBe('block-end');
    expect(host.getAttribute('data-fab-menu-open')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });

  it('composes text-only, icon-only, and icon-text action presentations', () => {
    const fixture = TestBed.createComponent(ErpFabMenu);
    fixture.componentRef.setInput('label', 'Actions');
    fixture.componentRef.setInput('items', [
      {value: 'text', label: 'Text only', presentation: 'text'},
      {value: 'icon', label: 'Icon only', icon: 'eye', presentation: 'icon'},
      {value: 'mixed', label: 'Icon and text', icon: 'save', presentation: 'icon-text'},
    ]);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      '.fab-menu__actions',
    )!;
    const actions = surface.querySelectorAll('[data-fab-menu-action]');

    expect(actions).toHaveLength(3);
    expect(actions[0].tagName.toLowerCase()).toBe('erp-extended-fab');
    expect(actions[0].querySelector('erp-icon')).toBeNull();
    expect(actions[1].tagName.toLowerCase()).toBe('erp-fab');
    expect(actions[1].closest('erp-tooltip')).not.toBeNull();
    expect(actions[2].tagName.toLowerCase()).toBe('erp-extended-fab');
    expect(actions[2].querySelector('erp-icon')).not.toBeNull();
  });
});
