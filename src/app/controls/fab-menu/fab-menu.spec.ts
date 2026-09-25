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

  it('creates closed with block-start placement and a frozen ERP FAB trigger', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(fixture.componentInstance).toBeTruthy();
    expect(host.getAttribute('data-fab-menu-open')).toBe('false');
    expect(host.getAttribute('data-fab-menu-placement')).toBe('block-start');
    expect(host.querySelectorAll('erp-fab')).toHaveLength(1);
    expect(host.querySelectorAll('erp-extended-fab')).toHaveLength(0);
  });

  it('opens the action collection, emits a selection, and closes', async () => {
    const fixture = create();
    const selected = vi.fn();
    fixture.componentInstance.itemSelected.subscribe(selected);
    const trigger = (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('erp-fab button');

    trigger?.click();
    fixture.detectChanges();
    await Promise.resolve();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-fab-menu-open')).toBe('true');
    expect(host.querySelectorAll('erp-extended-fab')).toHaveLength(2);
    host.querySelector<HTMLButtonElement>('erp-extended-fab button')?.click();
    fixture.detectChanges();

    expect(selected).toHaveBeenCalledWith('invoice');
    expect(host.getAttribute('data-fab-menu-open')).toBe('false');
  });

  it('updates placement and closes from Escape while restoring trigger focus', async () => {
    const fixture = create();
    fixture.componentRef.setInput('placement', 'block-end');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector<HTMLButtonElement>('erp-fab button');
    trigger?.click();
    fixture.detectChanges();

    host.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    fixture.detectChanges();
    await Promise.resolve();

    expect(host.getAttribute('data-fab-menu-placement')).toBe('block-end');
    expect(host.getAttribute('data-fab-menu-open')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });
});
