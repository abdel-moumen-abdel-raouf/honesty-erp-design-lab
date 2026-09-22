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
});
