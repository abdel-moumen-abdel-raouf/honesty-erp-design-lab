import {TestBed} from '@angular/core/testing';
import {ErpRepeaterShowcase} from './repeater-showcase';

describe('ErpRepeaterShowcase', () => {
  it('renders projected business rows and keeps add/remove state controlled by the workbench', () => {
    const fixture = TestBed.createComponent(ErpRepeaterShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('[role="listitem"]')).toHaveLength(2);
    expect(target.textContent).toContain('أميرة حداد');
    expect(target.textContent).toContain('عمر ناصر');

    const addButton = Array.from(target.querySelectorAll('button'))
      .find((button) => button.textContent?.includes('إضافة جهة اتصال'));
    addButton?.click();
    fixture.detectChanges();
    expect(target.querySelectorAll('[role="listitem"]')).toHaveLength(3);
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('addRequested');

    (target.querySelector('[role="listitem"] button') as HTMLButtonElement | null)?.click();
    fixture.detectChanges();
    expect(target.querySelectorAll('[role="listitem"]')).toHaveLength(2);
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('removeRequested');
  });
});
