import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {ErpComboBox} from './combo-box';

describe('ErpComboBox', () => {
  const items = [
    {value: 'alpha', label: 'Alpha'},
    {value: 'beta', label: 'Beta'},
  ] as const;

  beforeEach(() => TestBed.configureTestingModule({imports: [ErpComboBox]}));

  function create() {
    const fixture = TestBed.createComponent(ErpComboBox);
    fixture.componentRef.setInput('label', 'Combo');
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    return fixture;
  }

  it('is editable but does not commit free-form query text', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    expect(reflectComponentType(ErpComboBox)?.selector).toBe('erp-combo-box');
    expect(control.overlayConfig()).toBeNull();
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'free form';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(onChange).not.toHaveBeenCalled();
    expect(
      (fixture.nativeElement as HTMLElement).hasAttribute(
        'data-combo-box-value',
      ),
    ).toBe(false);
  });

  it('opens from a normal pointer click', () => {
    const fixture = create();
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.click();

    expect(TestBed.inject(ErpOverlayManager).entries()).toHaveLength(1);
  });

  it('opens from ArrowDown and commits only a matched overlay selection', async () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const manager = TestBed.inject(ErpOverlayManager);
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    const ref = manager.entries()[0].ref;
    ref.close('beta');
    manager.completeTransition(ref.id, 'leaving');
    await Promise.resolve();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('beta');
    expect(
      (fixture.nativeElement as HTMLElement).getAttribute(
        'data-combo-box-value',
      ),
    ).toBe('beta');
  });

  it('opens from typing and seeds the overlay with the complete first query', () => {
    const fixture = create();
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'be';

    input.dispatchEvent(new Event('input'));

    const entry = TestBed.inject(ErpOverlayManager).entries()[0];
    expect((entry.ref.config.data as ErpSelectionPickerData).query).toBe('be');
  });

  it('dismisses without committing and clears a committed selection explicitly', async () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const manager = TestBed.inject(ErpOverlayManager);
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.click();
    const ref = manager.entries()[0].ref;
    ref.dismiss('cancel');
    manager.completeTransition(ref.id, 'leaving');
    await Promise.resolve();
    expect(onChange).not.toHaveBeenCalled();

    control.writeValue('alpha');
    fixture.detectChanges();
    const clear = fixture.debugElement.query(By.directive(ErpIconButton));
    clear.componentInstance.pressed.emit();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(null);
    expect(input.value).toBe('');
  });

  it('does not open while effectively disabled', () => {
    const fixture = create();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.click();
    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));

    expect(TestBed.inject(ErpOverlayManager).entries()).toEqual([]);
  });

  it('passes the typed overlay behavior subset', () => {
    const fixture = create();
    fixture.componentRef.setInput('overlayConfig', {
      dismissOnBackdrop: false,
      blur: 'high',
      enterAnimation: 'fade',
    });
    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLInputElement>('input')
      ?.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    const config = TestBed.inject(ErpOverlayManager).entries()[0].ref.config;
    expect(config.dismissOnBackdrop).toBe(false);
    expect(config.blur).toBe('high');
    expect(config.enterAnimation).toBe('fade');
  });
});
