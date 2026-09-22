import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpFab} from './fab';

describe('ErpFab', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpFab]}).compileComponents();
  });

  function create(label = 'Add') {
    const fixture = TestBed.createComponent(ErpFab);
    fixture.componentRef.setInput('icon', 'add');
    fixture.componentRef.setInput('label', label);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with required inputs, defaults, one native button, aria-label, and ErpIcon', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const mirror = reflectComponentType(ErpFab);

    expect(component).toBeTruthy();
    expect(mirror?.selector).toBe('erp-fab');
    expect(component.size()).toBe('md');
    expect(component.tone()).toBe('primary');
    expect(host.querySelectorAll('button').length).toBe(1);
    expect(host.querySelector('button')?.getAttribute('aria-label')).toBe('Add');
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe('add');
  });

  it('requires icon and label before rendering', () => {
    const fixture = TestBed.createComponent(ErpFab);

    expect(() => fixture.detectChanges()).toThrow();
  });

  it('maps all sizes and tones', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const size of ['sm', 'md', 'lg']) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(host.getAttribute('data-fab-size')).toBe(size);
    }

    for (const tone of ['primary', 'secondary', 'accent', 'surface']) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(host.getAttribute('data-fab-tone')).toBe(tone);
    }
  });

  it('resolves disabled, loading, and invalid states and emits only while ready', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    let count = 0;
    component.pressed.subscribe(() => count += 1);
    component.handleClick();
    expect(count).toBe(1);

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(component.state()).toBe('loading');
    expect(button.disabled).toBe(true);
    component.handleClick();
    expect(count).toBe(1);

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.state()).toBe('disabled');

    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(component.state()).toBe('invalid');
    expect(button.getAttribute('aria-label')).toBeNull();
  });

  it('has no positioning inputs or positioning styles', () => {
    const fixture = create();
    const component = fixture.componentInstance as unknown as Record<string, unknown>;
    const host = fixture.nativeElement as HTMLElement;

    for (const key of ['position', 'fixed', 'top', 'bottom', 'left', 'right']) {
      expect(key in component).toBe(false);
    }

    expect(host.getAttribute('style')).toBeNull();
  });
});
