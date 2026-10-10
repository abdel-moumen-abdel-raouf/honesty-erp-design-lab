import {TestBed} from '@angular/core/testing';
import {ErpColumnChooserShowcase} from './column-chooser-showcase';

describe('ErpColumnChooserShowcase', () => {
  it('renders one meaningful target and applies controlled visibility output', () => {
    const fixture = TestBed.createComponent(ErpColumnChooserShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(host.querySelectorAll('[data-showcase-control]')).toHaveLength(4);
    expect(host.querySelectorAll('[data-showcase-target] [role="option"]')).toHaveLength(5);

    fixture.componentInstance.recordVisibleKeys(['accountNumber', 'accountName', 'type']);
    fixture.detectChanges();
    expect(fixture.componentInstance.value('visibleKeys')).toEqual(['accountNumber', 'accountName', 'type']);
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('visibilityChange');
  });
});
