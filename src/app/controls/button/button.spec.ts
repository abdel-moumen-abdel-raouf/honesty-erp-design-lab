import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpButton} from './button';

describe('ErpButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpButton]}).compileComponents();
  });

  function create(label = 'Save') {
    const fixture = TestBed.createComponent(ErpButton);
    fixture.componentRef.setInput('label', label);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with the exact selector, required label, defaults, and one native button', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const mirror = reflectComponentType(ErpButton);

    expect(component).toBeTruthy();
    expect(mirror?.selector).toBe('erp-button');
    expect(component.variant()).toBe('solid');
    expect(component.tone()).toBe('primary');
    expect(component.size()).toBe('md');
    expect(component.shape()).toBe('default');
    expect(component.borderStyle()).toBe('solid');
    expect(component.icon()).toBeNull();
    expect(component.iconPosition()).toBe('start');
    expect(component.type()).toBe('button');
    expect(component.cursor()).toBe('pointer');
    expect(component.rippleSpeed()).toBe('normal');
    expect(component.state()).toBe('ready');
    expect(host.getAttribute('data-button-cursor')).toBe('pointer');
    expect(host.getAttribute('data-button-ripple-speed')).toBe('normal');
    expect(host.querySelectorAll('button').length).toBe(1);
    expect(host.querySelector('erp-text')?.textContent?.trim()).toBe('Save');
  });

  it('requires label before rendering', () => {
    const fixture = TestBed.createComponent(ErpButton);

    expect(() => fixture.detectChanges()).toThrow();
  });

  it('updates all variants, tones, sizes, shapes, border styles, and full width evidence', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const variant of ['solid', 'outline', 'subtle', 'ghost', 'text']) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-variant')).toBe(variant);
    }

    for (const tone of ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info', 'neutral']) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-tone')).toBe(tone);
    }

    for (const size of ['sm', 'md', 'lg']) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-size')).toBe(size);
    }

    for (const shape of ['default', 'rounded', 'pill']) {
      fixture.componentRef.setInput('shape', shape);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-shape')).toBe(shape);
    }

    for (const borderStyle of ['solid', 'dashed']) {
      fixture.componentRef.setInput('borderStyle', borderStyle);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-border-style')).toBe(borderStyle);
    }

    for (const cursor of ['pointer', 'default']) {
      fixture.componentRef.setInput('cursor', cursor);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-cursor')).toBe(cursor);
    }

    for (const rippleSpeed of ['fast', 'normal', 'slow']) {
      fixture.componentRef.setInput('rippleSpeed', rippleSpeed);
      fixture.detectChanges();
      expect(host.getAttribute('data-button-ripple-speed')).toBe(rippleSpeed);
    }

    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    expect(host.getAttribute('data-button-full-width')).toBe('true');
    expect(host.className).toBe('');
  });

  it('renders optional ErpIcon in logical start and end positions', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('icon', 'save');
    fixture.detectChanges();

    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe('save');
    expect(host.querySelector('[data-icon-slot="start"]')).toBeTruthy();

    fixture.componentRef.setInput('iconPosition', 'end');
    fixture.detectChanges();
    expect(host.getAttribute('data-button-icon-position')).toBe('end');
    expect(host.querySelector('[data-icon-slot="end"]')).toBeTruthy();
    expect(host.querySelector('[data-icon-slot="end"]')?.classList.contains('i')).toBe(true);
  });

  it('forwards native type, name, value, and form', () => {
    const fixture = create();
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('name', 'action');
    fixture.componentRef.setInput('value', 'save');
    fixture.componentRef.setInput('form', 'editor');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.type).toBe('submit');
    expect(button.name).toBe('action');
    expect(button.value).toBe('save');
    expect(button.getAttribute('form')).toBe('editor');
  });

  it('resolves invalid, loading, disabled, and ready state precedence exactly', () => {
    const fixture = create('   ');
    const component = fixture.componentInstance;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.state()).toBe('invalid');
    expect(button.disabled).toBe(true);

    fixture.componentRef.setInput('label', 'Save');
    fixture.detectChanges();
    expect(component.state()).toBe('loading');
    expect(button.getAttribute('aria-busy')).toBe('true');

    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    expect(component.state()).toBe('disabled');

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(component.state()).toBe('ready');
    expect(button.disabled).toBe(false);
  });

  it('uses a trimmed loading label and falls back to the valid normal label', () => {
    const fixture = create(' Save ');
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingLabel', ' Saving ');
    fixture.detectChanges();
    expect(host.querySelector('erp-text')?.textContent?.trim()).toBe('Saving');

    fixture.componentRef.setInput('loadingLabel', '   ');
    fixture.detectChanges();
    expect(host.querySelector('erp-text')?.textContent?.trim()).toBe('Save');
    expect(fixture.componentInstance.state()).toBe('loading');
  });

  it('emits pressed only in ready state', () => {
    const fixture = create();
    let count = 0;
    fixture.componentInstance.pressed.subscribe(() => count += 1);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    expect(count).toBe(1);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    fixture.componentInstance.handleClick();
    expect(count).toBe(1);
  });

  it('creates and clears a non-zero pointer ripple from the press location', () => {
    const fixture = create();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      left: 10, top: 20, width: 100, height: 40, right: 110, bottom: 60,
      x: 10, y: 20, toJSON: () => ({}),
    });

    fixture.componentInstance.handlePointerDown({
      button: 0, currentTarget: button, clientX: 35, clientY: 35,
    } as unknown as PointerEvent);
    fixture.detectChanges();
    const ripple = fixture.nativeElement.querySelector('.erp-pressable__ripple') as HTMLElement;
    expect(ripple).toBeTruthy();
    expect(Number.parseFloat(ripple.style.inlineSize)).toBeGreaterThan(0);
    expect(Number.parseFloat(ripple.style.blockSize)).toBeGreaterThan(0);

    ripple.dispatchEvent(new Event('animationend'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.erp-pressable__ripple')).toBeNull();
  });

  it('creates centered Enter and Space ripples and replaces the active ripple', () => {
    const fixture = create();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 80, height: 40, right: 80, bottom: 40,
      x: 0, y: 0, toJSON: () => ({}),
    });

    fixture.componentInstance.handleKeyDown({
      key: 'Enter', repeat: false, currentTarget: button,
    } as unknown as KeyboardEvent);
    fixture.detectChanges();
    let ripple = fixture.nativeElement.querySelector('.erp-pressable__ripple') as HTMLElement;
    expect(ripple.style.left).toBe('40px');
    expect(ripple.style.top).toBe('20px');

    fixture.componentInstance.handleKeyDown({
      key: ' ', repeat: false, currentTarget: button,
    } as unknown as KeyboardEvent);
    fixture.detectChanges();
    ripple = fixture.nativeElement.querySelector('.erp-pressable__ripple') as HTMLElement;
    expect(ripple.style.left).toBe('40px');
    expect(fixture.nativeElement.querySelectorAll('.erp-pressable__ripple').length).toBe(1);
  });

  it('suppresses ripple while disabled, loading, or invalid', () => {
    for (const inputs of [
      {label: 'Save', disabled: true, loading: false},
      {label: 'Save', disabled: false, loading: true},
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
      fixture.detectChanges();
      fixture.componentInstance.handleClick();
      expect(button.disabled).toBe(true);
      expect(fixture.nativeElement.getAttribute('data-button-state')).toBe(
        inputs.label.trim().length === 0 ? 'invalid' : inputs.loading ? 'loading' : 'disabled',
      );
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
      expect(fixture.nativeElement.getAttribute('data-button-ripple-speed')).toBe(rippleSpeed);
      expect(fixture.nativeElement.querySelector('.erp-pressable__spinner')).toBeTruthy();
    }
  });
});
