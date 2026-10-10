import {TestBed} from '@angular/core/testing';
import {ErpPageHeaderShowcase} from './page-header-showcase';

describe('ErpPageHeaderShowcase', () => {
  it('projects every named region and records both action intents', () => {
    const fixture = TestBed.createComponent(ErpPageHeaderShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelector('.page-header__breadcrumbs')?.textContent).toContain('دليل الحسابات');
    expect(target.querySelector('.page-header__meta')?.textContent).toContain('آخر تحديث');
    expect(target.querySelector('.page-header__secondary erp-button')).not.toBeNull();
    expect(target.querySelector('.page-header__primary erp-button')).not.toBeNull();

    const buttons = Array.from(target.querySelectorAll('button'));
    buttons.find((button) => button.textContent?.includes('تصدير'))?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('secondaryActionPressed');

    buttons.find((button) => button.textContent?.includes('إضافة حساب'))?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('primaryActionPressed');
  });
});
