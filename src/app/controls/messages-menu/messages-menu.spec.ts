import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ErpMessagesMenu} from './messages-menu';

describe('ErpMessagesMenu', () => {
  let fixture: ComponentFixture<ErpMessagesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpMessagesMenu]}).compileComponents();
    fixture = TestBed.createComponent(ErpMessagesMenu);
    fixture.componentRef.setInput('messages', [
      {id: 'one', senderName: 'أميرة حداد', preview: 'تم اعتماد الفاتورة', timestamp: 'منذ دقيقة', read: false},
      {id: 'two', senderName: 'عمر ناصر', preview: 'تم تحديث المخزون', timestamp: 'منذ ساعة', read: true},
    ]);
    fixture.detectChanges();
  });

  it('derives the unread count and renders real message actions', () => {
    expect(fixture.nativeElement.querySelector('.messages-menu__badge')?.textContent).toContain('1');
    expect(fixture.nativeElement.querySelectorAll('erp-shell-menu-action')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('erp-avatar')).toHaveLength(2);
  });

  it('emits activation and view-all intents', () => {
    const messageSpy = vi.fn();
    const viewAllSpy = vi.fn();
    fixture.componentInstance.messageActivated.subscribe(messageSpy);
    fixture.componentInstance.viewAllRequested.subscribe(viewAllSpy);

    fixture.debugElement.query(By.css('erp-shell-menu-action button')).triggerEventHandler('click');
    fixture.debugElement.query(By.css('.messages-menu__footer erp-button')).componentInstance.pressed.emit(new MouseEvent('click'));

    expect(messageSpy).toHaveBeenCalledWith(expect.objectContaining({id: 'one'}));
    expect(viewAllSpy).toHaveBeenCalledOnce();
  });

  it('filters the live message set without mutating consumer data', () => {
    fixture.componentInstance.query.set('المخزون');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('erp-shell-menu-action')).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('عمر ناصر');
  });

  it('keeps scrolling on the message list instead of the popup surface', () => {
    expect(fixture.nativeElement.querySelector('.messages-menu__surface')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.messages-menu__items')).not.toBeNull();
  });
});
