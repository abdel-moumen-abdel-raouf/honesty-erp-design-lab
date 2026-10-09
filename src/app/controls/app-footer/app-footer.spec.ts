import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpAppFooter} from './app-footer';

@Component({
  imports: [ErpAppFooter],
  template: `
    <erp-app-footer
      applicationLabel="Honesty ERP"
      versionLabel="الإصدار 1.0"
      statusLabel="تعمل الأنظمة"
      statusTone="success"
      [actions]="actions"
      (actionActivated)="activated = $event"
    />
  `,
})
class AppFooterTestHost {
  readonly actions = [
    {id: 'support', label: 'الدعم', icon: 'help' as const},
    {id: 'policy', label: 'السياسات', disabled: true},
  ];
  activated = '';
}

describe('ErpAppFooter', () => {
  it('renders optional application information and emits enabled action intent', () => {
    const fixture = TestBed.createComponent(AppFooterTestHost);
    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer?.textContent).toContain('Honesty ERP');
    expect(footer?.textContent).toContain('الإصدار 1.0');
    expect(footer?.textContent).toContain('تعمل الأنظمة');
    const buttons = footer.querySelectorAll('button');
    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activated).toBe('support');
    expect(buttons[1].disabled).toBe(true);
  });

  it('does not render an empty application footer landmark', () => {
    const fixture = TestBed.createComponent(ErpAppFooter);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('footer')).toBeNull();
  });

  it('updates dynamically when optional content arrives', () => {
    const fixture = TestBed.createComponent(ErpAppFooter);
    fixture.detectChanges();
    fixture.componentRef.setInput('applicationLabel', 'نظام العمليات');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('footer')?.textContent)
      .toContain('نظام العمليات');
  });
});
