import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpQuickActionsBar} from './quick-actions-bar';

@Component({
  imports: [ErpQuickActionsBar],
  template: `
    <erp-quick-actions-bar
      [groups]="groups"
      (actionActivated)="activated = $event"
    />
  `,
})
class QuickActionsBarTestHost {
  readonly groups = [
    {
      id: 'daily',
      label: 'يومي',
      actions: [
        {id: 'task', label: 'مهمة جديدة', icon: 'add' as const, priority: 'primary' as const},
        {id: 'help', label: 'المساعدة', icon: 'help' as const},
        {id: 'settings', label: 'الإعدادات', icon: 'settings' as const, disabled: true},
      ],
    },
  ];
  activated = '';
}

describe('ErpQuickActionsBar', () => {
  it('renders consumer-provided groups and emits enabled action intent', () => {
    const fixture = TestBed.createComponent(QuickActionsBarTestHost);
    fixture.detectChanges();

    const toolbar = fixture.nativeElement.querySelector('[role="toolbar"]');
    expect(toolbar?.getAttribute('aria-label')).toBe('الإجراءات السريعة');
    expect(toolbar?.textContent).toContain('يومي');
    const buttons = toolbar.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activated).toBe('task');
    expect(buttons[2].disabled).toBe(true);
  });

  it('does not render an empty complementary landmark', () => {
    const fixture = TestBed.createComponent(ErpQuickActionsBar);
    fixture.componentRef.setInput('groups', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('aside')).toBeNull();
  });

  it('keeps category names consumer-controlled', () => {
    const fixture = TestBed.createComponent(ErpQuickActionsBar);
    fixture.componentRef.setInput('groups', [{
      id: 'custom',
      label: 'إجراءات الإقفال',
      actions: [{id: 'close', label: 'إقفال الفترة', icon: 'calendar'}],
    }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('إجراءات الإقفال');
  });
});
