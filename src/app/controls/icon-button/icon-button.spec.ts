import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpIconButton} from './icon-button';

describe('ErpIconButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpIconButton]}).compileComponents();
  });

  function create(label = 'Settings') {
    const fixture = TestBed.createComponent(ErpIconButton);
    fixture.componentRef.setInput('icon', 'settings');
    fixture.componentRef.setInput('label', label);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with required inputs, defaults, one native button, aria-label, and ErpIcon', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const mirror = reflectComponentType(ErpIconButton);

    expect(component).toBeTruthy();
    expect(mirror?.selector).toBe('erp-icon-button');
    expect(component.variant()).toBe('ghost');
    expect(component.tone()).toBe('neutral');
    expect(component.size()).toBe('md');
    expect(component.shape()).toBe('rounded');
    expect(component.cursor()).toBe('pointer');
    expect(component.rippleSpeed()).toBe('normal');
    expect(host.getAttribute('data-icon-button-cursor')).toBe('pointer');
    expect(host.getAttribute('data-icon-button-ripple-speed')).toBe('normal');
    expect(host.querySelectorAll('button').length).toBe(1);
    expect(host.querySelector('button')?.getAttribute('aria-label')).toBe('Settings');
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe('settings');
    expect(host.querySelector('.c')).toBeTruthy();
    expect(host.querySelector('.i')).toBeTruthy();
  });

  it('requires icon and label before rendering', () => {
    const fixture = TestBed.createComponent(ErpIconButton);

    expect(() => fixture.detectChanges()).toThrow();
  });

  it('maps every variant, tone, size, shape, and border style', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const groups = [
      ['variant', 'data-icon-button-variant', ['solid', 'outline', 'subtle', 'ghost']],
      ['tone', 'data-icon-button-tone', ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info', 'neutral']],
      ['size', 'data-icon-button-size', ['sm', 'md', 'lg']],
      ['shape', 'data-icon-button-shape', ['default', 'rounded', 'pill']],
      ['borderStyle', 'data-icon-button-border-style', ['solid', 'dashed']],
      ['cursor', 'data-icon-button-cursor', ['pointer', 'default']],
      ['rippleSpeed', 'data-icon-button-ripple-speed', ['fast', 'normal', 'slow']],
    ] as const;

    for (const [inputName, attribute, values] of groups) {
      for (const value of values) {
        fixture.componentRef.setInput(inputName, value);
        fixture.detectChanges();
        expect(host.getAttribute(attribute)).toBe(value);
      }
    }

    expect(host.className).toBe('');
  });

  it('forwards native form fields and resolves disabled, loading, and invalid states', () => {
    const fixture = create();
    fixture.componentRef.setInput('type', 'reset');
    fixture.componentRef.setInput('name', 'action');
    fixture.componentRef.setInput('value', 'reset');
    fixture.componentRef.setInput('form', 'editor');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.type).toBe('reset');
    expect(button.name).toBe('action');
    expect(button.value).toBe('reset');
    expect(button.getAttribute('form')).toBe('editor');

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.state()).toBe('loading');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-label')).toBe('Settings');

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.state()).toBe('disabled');

    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(fixture.componentInstance.state()).toBe('invalid');
    expect(button.getAttribute('aria-label')).toBeNull();
  });

  it('emits pressed only while ready', () => {
    const fixture = create();
    let count = 0;
    fixture.componentInstance.pressed.subscribe(() => count += 1);
    fixture.componentInstance.handleClick();
    expect(count).toBe(1);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance.handleClick();
    expect(count).toBe(1);
  });

  it('suppresses pressed and ripple while disabled, loading, or invalid', () => {
    for (const inputs of [
      {label: 'Settings', disabled: true, loading: false},
      {label: 'Settings', disabled: false, loading: true},
      {label: '   ', disabled: false, loading: false},
    ]) {
      const fixture = create(inputs.label);
      fixture.componentRef.setInput('disabled', inputs.disabled);
      fixture.componentRef.setInput('loading', inputs.loading);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      let count = 0;
      fixture.componentInstance.pressed.subscribe(() => count += 1);
      fixture.componentInstance.handlePointerDown({
        button: 0, currentTarget: button, clientX: 1, clientY: 1,
      } as unknown as PointerEvent);
      fixture.componentInstance.handleClick();
      fixture.detectChanges();

      expect(button.disabled).toBe(true);
      expect(button.getAttribute('aria-busy')).toBe(inputs.loading ? 'true' : null);
      expect(count).toBe(0);
      expect(fixture.nativeElement.querySelector('.erp-pressable__ripple')).toBeNull();
    }
  });

  it('changes ripple speed without changing loading state or spinner presence', () => {
    const fixture = create();
    fixture.componentRef.setInput('loading', true);

    for (const rippleSpeed of ['fast', 'normal', 'slow']) {
      fixture.componentRef.setInput('rippleSpeed', rippleSpeed);
      fixture.detectChanges();
      expect(fixture.componentInstance.state()).toBe('loading');
      expect(fixture.nativeElement.getAttribute('data-icon-button-ripple-speed')).toBe(rippleSpeed);
      expect(fixture.nativeElement.querySelector('.erp-pressable__spinner')).toBeTruthy();
    }
  });
});
