import {TestBed} from '@angular/core/testing';
import {ErpFabMenu} from './fab-menu';

describe('ErpFabMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpFabMenu]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpFabMenu);
    fixture.componentRef.setInput('label', 'Create');
    fixture.componentRef.setInput('items', [
      {value: 'invoice', label: 'Invoice', icon: 'document'},
      {value: 'customer', label: 'Customer', icon: 'customer'},
    ]);
    fixture.detectChanges();
    return fixture;
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
    const trigger = host.querySelector<HTMLButtonElement>(
      '[data-fab-menu-trigger] button',
    );

    trigger?.click();
    fixture.detectChanges();
    await Promise.resolve();

    expect(host.getAttribute('data-fab-menu-open')).toBe('true');
    expect(host.querySelector<HTMLButtonElement>(
      '[data-fab-menu-trigger] button',
    )).toBe(trigger);

    const surface = host.querySelector<HTMLElement>('.fab-menu__actions');
    expect(surface?.style.left).not.toBe('');
    expect(surface?.style.top).not.toBe('');

    surface
      ?.querySelector<HTMLButtonElement>('[data-fab-menu-action] button')
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
    const trigger = host.querySelector<HTMLButtonElement>(
      '[data-fab-menu-trigger] button',
    );

    trigger?.click();
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
});
