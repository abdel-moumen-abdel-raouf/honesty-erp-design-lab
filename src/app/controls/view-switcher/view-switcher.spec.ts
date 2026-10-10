import {TestBed} from '@angular/core/testing';
import {ErpViewSwitcher} from './view-switcher';

describe('ErpViewSwitcher', () => {
  it('identifies the selected view and emits controlled changes', () => {
    const fixture = TestBed.createComponent(ErpViewSwitcher);
    const spy = vi.fn();
    fixture.componentInstance.changed.subscribe(spy);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(fixture.nativeElement.getAttribute('data-view-mode')).toBe('table');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');

    buttons[1].click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('cards');
    expect(fixture.nativeElement.getAttribute('data-view-mode')).toBe('cards');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('passes its disabled state to both owned actions and blocks changes', () => {
    const fixture = TestBed.createComponent(ErpViewSwitcher);
    fixture.componentRef.setInput('disabled', true);
    const spy = vi.fn();
    fixture.componentInstance.changed.subscribe(spy);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect([...buttons].every((button) => button.disabled)).toBe(true);
    buttons[1].click();
    expect(spy).not.toHaveBeenCalled();
  });
});
