import {TestBed} from '@angular/core/testing';
import {ErpEntitySchemaFieldsShowcase} from './entity-schema-fields-showcase';

describe('ErpEntitySchemaFieldsShowcase', () => {
  it('renders every built-in field kind plus a working custom outlet on one controlled target', () => {
    const fixture = TestBed.createComponent(ErpEntitySchemaFieldsShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.getAttribute('data-entity-schema-field-count')).toBe('14');
    for (const selector of [
      'erp-text-box', 'erp-text-area-box', 'erp-password-box', 'erp-url-box',
      'erp-tel-box', 'erp-number-box', 'erp-money-box', 'erp-check-box',
      'erp-radio-group', 'erp-select', 'erp-date-box', 'erp-time-box',
      'erp-date-time-box',
    ]) {
      expect(target.querySelector(selector), `${selector} should render`).not.toBeNull();
    }

    const customAction = Array.from(target.querySelectorAll('button'))
      .find((button) => button.textContent?.includes('تعيين كمورد استراتيجي'));
    customAction?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('fieldValueChanged');
    expect(fixture.componentInstance.value('values')).toEqual(expect.objectContaining({classification: 'strategic'}));
  });
});
