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
  });

  it('preserves the primary action and opens a nonblocking anchored top-layer menu', async () => {
    const fixture = create();
    const manager = TestBed.inject(ErpOverlayManager);
    const primaryPressed = vi.fn();
    const selected = vi.fn();
    fixture.componentInstance.primaryPressed.subscribe(primaryPressed);
    fixture.componentInstance.itemSelected.subscribe(selected);
    const host = fixture.nativeElement as HTMLElement;
    const buttons = host.querySelectorAll<HTMLButtonElement>(
      '.split-button > erp-button button, .split-button > erp-icon-button button',
    );

    buttons[0].click();
    buttons[1].click();
    fixture.detectChanges();
    await Promise.resolve();

    expect(primaryPressed).toHaveBeenCalledOnce();
    expect(manager.entries()).toHaveLength(0);
    expect(host.getAttribute('data-split-button-open')).toBe('true');

    const surface = host.querySelector<HTMLElement>('.split-button__menu');
    expect(surface?.getAttribute('popover')).toBe('manual');
    expect(surface?.style.left).not.toBe('');
    expect(surface?.style.top).not.toBe('');

    surface
      ?.querySelector<HTMLButtonElement>('[data-action-item] button')
      ?.click();
    fixture.detectChanges();
    await Promise.resolve();

    expect(selected).toHaveBeenCalledWith('pdf');
    expect(host.getAttribute('data-split-button-open')).toBe('false');
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('dismisses the anchored menu on Escape and restores the menu trigger', async () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector<HTMLButtonElement>(
      '.split-button > erp-icon-button button',
    );

    trigger?.click();
    fixture.detectChanges();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}),
    );
    fixture.detectChanges();
    await Promise.resolve();

    expect(host.getAttribute('data-split-button-open')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });
});
