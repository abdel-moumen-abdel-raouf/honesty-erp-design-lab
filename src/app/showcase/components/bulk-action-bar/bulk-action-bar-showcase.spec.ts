import {TestBed} from '@angular/core/testing';
import {ErpBulkActionBarShowcase} from './bulk-action-bar-showcase';

describe('ErpBulkActionBarShowcase', () => {
  it('renders projected actions and clears the same controlled target', () => {
    const fixture = TestBed.createComponent(ErpBulkActionBarShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.textContent).toContain('تم تحديد 2 سجل');
    expect(target.textContent).toContain('تصدير المحدد');
    expect(target.textContent).toContain('أرشفة المحدد');

    const clearButton = [...target.querySelectorAll<HTMLButtonElement>('erp-button button')]
      .find((button) => button.textContent?.includes('إلغاء التحديد'))!;
    clearButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value('selectedCount')).toBe(0);
    expect(target.textContent?.trim()).toBe('');
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('clearSelection');
  });
});
