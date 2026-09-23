import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpExtendedFab} from './extended-fab';

describe('ErpExtendedFab', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpExtendedFab]}).compileComponents();
  });

  function create(label = 'إنشاء جديد') {
    const fixture = TestBed.createComponent(ErpExtendedFab);
    fixture.componentRef.setInput('label', label);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with required label, defaults, one native button, and ErpText label', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const mirror = reflectComponentType(ErpExtendedFab);

    expect(component).toBeTruthy();
    expect(mirror?.selector).toBe('erp-extended-fab');
    expect(component.icon()).toBeNull();
    expect(component.size()).toBe('md');
    expect(component.tone()).toBe('primary');
    expect(component.cursor()).toBe('pointer');
    expect(component.rippleSpeed()).toBe('slow');
    expect(host.getAttribute('data-extended-fab-cursor')).toBe('pointer');
    expect(host.getAttribute('data-extended-fab-ripple-speed')).toBe('slow');
    expect(host.querySelectorAll('button').length).toBe(1);
    expect(host.querySelector('erp-text')?.textContent?.trim()).toBe('إنشاء جديد');
  });

  it('requires label before rendering', () => {
    const fixture = TestBed.createComponent(ErpExtendedFab);

    expect(() => fixture.detectChanges()).toThrow();
  });

  it('renders an optional icon through ErpIcon', () => {
    const fixture = create();
    fixture.componentRef.setInput('icon', 'add');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe('add');
  });

  it('maps all sizes and tones', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const size of ['md', 'lg', 'xl']) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(host.getAttribute('data-extended-fab-size')).toBe(size);
    }

    for (const tone of ['primary', 'secondary', 'accent', 'surface']) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(host.getAttribute('data-extended-fab-tone')).toBe(tone);
    }

    for (const cursor of ['pointer', 'default']) {
      fixture.componentRef.setInput('cursor', cursor);
      fixture.detectChanges();
      expect(host.getAttribute('data-extended-fab-cursor')).toBe(cursor);
    }

    for (const rippleSpeed of ['fast', 'normal', 'slow']) {
      fixture.componentRef.setInput('rippleSpeed', rippleSpeed);
      fixture.detectChanges();
      expect(host.getAttribute('data-extended-fab-ripple-speed')).toBe(rippleSpeed);
    }
  });

  it('keeps its visible label while loading and resolves disabled and invalid states', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(component.state()).toBe('loading');
    expect(button.disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('erp-text')?.textContent?.trim()).toBe('إنشاء جديد');

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.state()).toBe('disabled');

    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(component.state()).toBe('invalid');
  });

  it('emits only while ready and has no positioning API', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    let count = 0;
    component.pressed.subscribe(() => count += 1);
    component.handleClick();
    expect(count).toBe(1);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.handleClick();
    expect(count).toBe(1);

    const api = component as unknown as Record<string, unknown>;
    for (const key of ['position', 'fixed', 'top', 'bottom', 'left', 'right']) {
      expect(key in api).toBe(false);
    }
  });

  it('suppresses pressed and ripple while disabled, loading, or invalid', () => {
    for (const inputs of [
      {label: 'Create', disabled: true, loading: false},
      {label: 'Create', disabled: false, loading: true},
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
      expect(fixture.nativeElement.getAttribute('data-extended-fab-ripple-speed')).toBe(rippleSpeed);
      expect(fixture.nativeElement.querySelector('.erp-pressable__spinner')).toBeTruthy();
    }
  });
});
