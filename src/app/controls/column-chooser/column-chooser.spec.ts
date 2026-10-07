import {TestBed} from '@angular/core/testing';
import {ErpColumnChooser} from './column-chooser';

describe('ErpColumnChooser', () => {
  const columns = [
    {key: 'name', label: 'الاسم', required: true},
    {key: 'status', label: 'الحالة'},
  ] as const;

  it('keeps required columns visible and emits normalized visibility intent', () => {
    const fixture = TestBed.createComponent(ErpColumnChooser);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('visibleKeys', ['status']);
    const spy = vi.fn();
    fixture.componentInstance.visibilityChange.subscribe(spy);
    fixture.detectChanges();
    const component = fixture.componentInstance as unknown as {updateVisible(value: readonly string[]): void};
    component.updateVisible([]);
    expect(spy).toHaveBeenCalledWith(['name']);
  });

  it('uses ErpSelect and exposes reset intent without native select authoring', () => {
    const fixture = TestBed.createComponent(ErpColumnChooser);
    fixture.componentRef.setInput('columns', columns);
    const spy = vi.fn();
    fixture.componentInstance.resetRequested.subscribe(spy);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('select')).toBeNull();
    const buttons = fixture.nativeElement.querySelectorAll('erp-button button');
    (buttons[buttons.length - 1] as HTMLButtonElement).click();
    expect(spy).toHaveBeenCalledOnce();
  });

  it('composes the exact Table reference trigger and controlled checkbox popover', () => {
    const fixture = TestBed.createComponent(ErpColumnChooser);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('visibleKeys', ['name', 'status']);
    fixture.componentRef.setInput('presentation', 'table-reference');
    const spy = vi.fn();
    fixture.componentInstance.visibilityChange.subscribe(spy);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector('.column-chooser__reference-surface') as HTMLElement;
    Object.assign(surface, {showPopover: vi.fn(), hidePopover: vi.fn()});
    const trigger = host.querySelector('erp-button button') as HTMLButtonElement;

    expect(host.getAttribute('data-column-chooser-presentation')).toBe('table-reference');
    expect(host.querySelector('erp-select')).toBeNull();
    expect(host.querySelectorAll('erp-check-box')).toHaveLength(1);
    expect(trigger.getAttribute('aria-controls')).toBe(surface.id);

    trigger.click();
    fixture.detectChanges();
    expect(surface.showPopover).toHaveBeenCalledOnce();
    expect(host.getAttribute('data-column-chooser-open')).toBe('true');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const checkbox = host.querySelector('erp-check-box input') as HTMLInputElement;
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(['name']);

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();
    expect(surface.hidePopover).toHaveBeenCalledOnce();
    expect(host.getAttribute('data-column-chooser-open')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });
});
