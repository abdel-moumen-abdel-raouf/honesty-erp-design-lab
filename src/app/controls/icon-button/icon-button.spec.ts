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
    expect(host.querySelectorAll('button').length).toBe(1);
    expect(host.querySelector('button')?.getAttribute('aria-label')).toBe('Settings');
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe('settings');
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
    ] as const;

    for (const [inputName, attribute, values] of groups) {
      for (const value of values) {
        fixture.componentRef.setInput(inputName, value);
        fixture.detectChanges();
        expect(host.getAttribute(attribute)).toBe(value);
      }
    }
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
});
