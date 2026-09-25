import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpSplitButton} from './split-button';

describe('ErpSplitButton', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpSplitButton]});
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

  it('creates with one ERP Button and one ERP IconButton', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(fixture.componentInstance).toBeTruthy();
    expect(host.querySelectorAll('erp-button')).toHaveLength(1);
    expect(host.querySelectorAll('erp-icon-button')).toHaveLength(1);
    expect(host.getAttribute('data-split-button-disabled')).toBe('false');
  });

  it('preserves the primary action and opens a blocking compact menu through OverlayManager', async () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);
    const primary = vi.fn();
    const selected = vi.fn();
    fixture.componentInstance.primaryPressed.subscribe(primary);
    fixture.componentInstance.itemSelected.subscribe(selected);
    const buttons = (fixture.nativeElement as HTMLElement)
      .querySelectorAll<HTMLButtonElement>('button');

    buttons[0].click();
    buttons[1].click();

    expect(primary).toHaveBeenCalledOnce();
    expect(manager.entries()).toHaveLength(1);
    expect(manager.entries()[0].ref.config.blocking).toBe(true);
    expect(manager.entries()[0].ref.config.size).toBe('sm');

    const ref = manager.entries()[0].ref;
    ref.close('csv');
    manager.completeTransition(ref.id, 'leaving');
    await Promise.resolve();
    expect(selected).toHaveBeenCalledWith('csv');
  });
});
