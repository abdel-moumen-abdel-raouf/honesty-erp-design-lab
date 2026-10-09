import {TestBed} from '@angular/core/testing';
import {ErpNotificationBell} from './notification-bell';

describe('ErpNotificationBell', () => {
  function installPopover(surface: HTMLElement): void {
    Object.defineProperties(surface, {
      hidePopover: {configurable: true, value: vi.fn()},
      showPopover: {configurable: true, value: vi.fn()},
    });
  }

  it('derives unread count, opens, activates a notification, and restores focus', () => {
    const fixture = TestBed.createComponent(ErpNotificationBell);
    fixture.componentRef.setInput('notifications', [
      {id: 'approval', title: 'فاتورة تحتاج اعتمادًا', read: false},
      {id: 'read', title: 'تم ترحيل القيد', read: true},
    ]);
    const activated = vi.fn();
    fixture.componentInstance.notificationActivated.subscribe(activated);
    fixture.detectChanges();
    installPopover(
      fixture.nativeElement.querySelector('.bell__surface'),
    );

    expect(fixture.nativeElement.querySelector('.bell__badge')?.textContent)
      .toContain('1');
    const trigger = fixture.nativeElement.querySelector(
      '.bell__trigger-wrap button',
    ) as HTMLButtonElement;
    trigger.click();
    expect(fixture.componentInstance.open()).toBe(true);
    (fixture.nativeElement.querySelector('.bell__items erp-shell-menu-action button') as HTMLButtonElement)
      .click();
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'approval'}),
    );
    expect(fixture.componentInstance.open()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('closes on Escape without transport ownership', () => {
    const fixture = TestBed.createComponent(ErpNotificationBell);
    fixture.detectChanges();
    installPopover(
      fixture.nativeElement.querySelector('.bell__surface'),
    );
    (fixture.nativeElement.querySelector('erp-icon-button button') as HTMLButtonElement)
      .click();
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('does not activate disabled notifications', () => {
    const fixture = TestBed.createComponent(ErpNotificationBell);
    fixture.componentRef.setInput('notifications', [
      {id: 'blocked', title: 'إشعار غير متاح', disabled: true},
    ]);
    const activated = vi.fn();
    fixture.componentInstance.notificationActivated.subscribe(activated);
    fixture.detectChanges();
    installPopover(
      fixture.nativeElement.querySelector('.bell__surface'),
    );

    (fixture.nativeElement.querySelector('erp-icon-button button') as HTMLButtonElement)
      .click();
    (fixture.nativeElement.querySelector('.bell__items erp-shell-menu-action button') as HTMLButtonElement)
      .click();
    expect(activated).not.toHaveBeenCalled();
    expect(fixture.componentInstance.open()).toBe(true);
  });

  it('filters notifications and keeps only the item list as the scroll owner', () => {
    const fixture = TestBed.createComponent(ErpNotificationBell);
    fixture.componentRef.setInput('notifications', [
      {id: 'stock', title: 'تنبيه المخزون', description: 'إعادة الطلب', timestamp: 'الآن'},
      {id: 'ledger', title: 'ترحيل القيد', description: 'الحسابات العامة', timestamp: 'أمس'},
    ]);
    fixture.detectChanges();
    fixture.componentInstance.query.set('المخزون');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('erp-shell-menu-action')).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('.bell__items')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.bell__surface')).not.toBeNull();
  });

  it('emits mark-all and view-all intents independently', () => {
    const fixture = TestBed.createComponent(ErpNotificationBell);
    fixture.componentRef.setInput('notifications', [{id: 'one', title: 'تنبيه', read: false}]);
    const markAll = vi.fn();
    const viewAll = vi.fn();
    fixture.componentInstance.markAllReadRequested.subscribe(markAll);
    fixture.componentInstance.viewAllRequested.subscribe(viewAll);
    fixture.detectChanges();
    installPopover(fixture.nativeElement.querySelector('.bell__surface'));

    const buttons = fixture.nativeElement.querySelectorAll('.bell__surface erp-button button');
    (buttons[0] as HTMLButtonElement).click();
    (buttons[1] as HTMLButtonElement).click();
    expect(markAll).toHaveBeenCalledOnce();
    expect(viewAll).toHaveBeenCalledOnce();
  });
});
