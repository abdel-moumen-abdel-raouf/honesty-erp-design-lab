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
      fixture.nativeElement.querySelector('.notification-bell__surface'),
    );

    expect(fixture.nativeElement.querySelector('.notification-bell__badge')?.textContent)
      .toContain('1');
    const trigger = fixture.nativeElement.querySelector(
      '.notification-bell__trigger-wrap button',
    ) as HTMLButtonElement;
    trigger.click();
    expect(fixture.componentInstance.open()).toBe(true);
    (fixture.nativeElement.querySelector('.notification-bell__surface li erp-button button') as HTMLButtonElement)
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
      fixture.nativeElement.querySelector('.notification-bell__surface'),
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
      fixture.nativeElement.querySelector('.notification-bell__surface'),
    );

    (fixture.nativeElement.querySelector('erp-icon-button button') as HTMLButtonElement)
      .click();
    (fixture.nativeElement.querySelector('.notification-bell__surface erp-button button') as HTMLButtonElement)
      .click();
    expect(activated).not.toHaveBeenCalled();
    expect(fixture.componentInstance.open()).toBe(true);
  });
});
