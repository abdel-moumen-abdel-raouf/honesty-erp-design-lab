import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpPasswordBox} from './password-box';

describe('ErpPasswordBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpPasswordBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpPasswordBox);
    fixture.componentRef.setInput('label', 'Password');
    fixture.detectChanges();
    return fixture;
  }

  it('creates hidden with the exact password defaults', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpPasswordBox)?.selector).toBe(
      'erp-password-box',
    );
    expect(control.autocomplete()).toBe('current-password');
    expect(control.revealToggle()).toBe(true);
    expect(native.type).toBe('password');
    expect(host.getAttribute('data-password-revealed')).toBe('false');
    expect(host.querySelector('erp-tooltip[field-domain-action]')).toBeTruthy();
  });

  it('reveals and hides by changing only native type while preserving value', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    control.writeValue('secret');
    fixture.detectChanges();

    const action = fixture.debugElement.query(
      (node) => node.componentInstance instanceof ErpIconButton,
    );
    action.componentInstance.pressed.emit();
    fixture.detectChanges();

    expect(native.type).toBe('text');
    expect(native.value).toBe('secret');
    expect(host.getAttribute('data-password-revealed')).toBe('true');
    expect(action.componentInstance.label()).toBe('Hide password');

    action.componentInstance.pressed.emit();
    fixture.detectChanges();
    expect(native.type).toBe('password');
    expect(native.value).toBe('secret');
  });

  it('removes the reveal domain action when revealToggle is false', () => {
    const fixture = create();
    fixture.componentRef.setInput('revealToggle', false);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-password-reveal-action]'),
    ).toBeNull();
  });

  it('publishes user input through the CVA pipeline', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    native.value = 'changed';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('changed');
  });

  it('keeps reveal, trailing adornment, and clear as distinct ordered actions', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('trailingIcon', 'info');
    fixture.componentRef.setInput('clearable', true);
    fixture.componentInstance.writeValue('secret');
    fixture.detectChanges();

    const actions = host.querySelector('.field-frame__actions');
    const children = [...(actions?.children ?? [])];

    expect(children.map((child) => child.tagName)).toEqual([
      'ERP-TOOLTIP',
      'ERP-ICON',
      'ERP-TOOLTIP',
    ]);
    expect(children[0].hasAttribute('field-domain-action')).toBe(true);
    expect(children[1].getAttribute('data-icon-name')).toBe('info');
    expect(children[2].hasAttribute('field-domain-action')).toBe(false);
  });
});
