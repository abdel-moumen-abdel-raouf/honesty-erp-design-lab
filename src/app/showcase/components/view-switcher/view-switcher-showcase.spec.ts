import {TestBed} from '@angular/core/testing';
import {ErpViewSwitcherShowcase} from './view-switcher-showcase';

describe('ErpViewSwitcherShowcase', () => {
  it('renders one selected target and synchronizes its public model', () => {
    const fixture = TestBed.createComponent(ErpViewSwitcherShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(host.querySelectorAll('[data-showcase-control]')).toHaveLength(2);
    const buttons = host.querySelectorAll('[data-showcase-target] button') as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');

    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value('value')).toBe('cards');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('changed: cards');
  });
});
