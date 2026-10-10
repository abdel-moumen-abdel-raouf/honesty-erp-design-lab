import {TestBed} from '@angular/core/testing';
import {ErpStandardEntityFormShowcase} from './standard-entity-form-showcase';

describe('ErpStandardEntityFormShowcase', () => {
  it('renders a complete stepped entity form and synchronizes custom value and submit intents', () => {
    const fixture = TestBed.createComponent(ErpStandardEntityFormShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('[role="tab"]')).toHaveLength(4);
    expect(target.querySelector('erp-validation-summary')).not.toBeNull();
    expect(target.querySelector('erp-form-actions')).not.toBeNull();

    const commercialTab = target.querySelector('[role="tab"][aria-label="التعامل"]') as HTMLButtonElement;
    commercialTab.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('activeStepIdChange');

    const customAction = Array.from(target.querySelectorAll('button'))
      .find((button) => button.textContent?.includes('اعتماد التصنيف الاستراتيجي'));
    customAction?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('valueChanged');
    expect(fixture.componentInstance.value('values')).toEqual(expect.objectContaining({classification: 'strategic'}));

    Array.from(target.querySelectorAll('button'))
      .find((button) => button.textContent?.includes('حفظ المورد'))
      ?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('submitRequested');
  });
});
