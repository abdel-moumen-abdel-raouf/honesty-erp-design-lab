import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpFieldBase} from './field-base';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-field-base',
  template: '',
})
class TestFieldBase extends ErpFieldBase<string> {
  constructor() {
    super('');
  }

  get helperForTest(): string {
    return this.trimmedHelperText();
  }

  get feedbackForTest(): string {
    return this.trimmedFeedbackText();
  }

  get feedbackVisibleForTest(): boolean {
    return this.feedbackVisible();
  }

  dismissFeedbackForTest(): boolean {
    return this.dismissFeedback();
  }

  protected override normalizeValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }
}

describe('ErpFieldBase', () => {
  function createFixture() {
    const fixture = TestBed.createComponent(TestFieldBase);
    fixture.componentRef.setInput('label', 'Name');
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFieldBase],
    });
  });

  it('exposes the exact Field Family defaults', () => {
    const control = createFixture().componentInstance;

    expect(control.tone()).toBe('neutral');
    expect(control.status()).toBe('none');
    expect(control.variant()).toBe('outline');
    expect(control.borderMode()).toBe('solid');
    expect(control.shape()).toBe('default');
    expect(control.size()).toBe('md');
    expect(control.appearance()).toBe('standard');
    expect(control.labelMode()).toBe('static');
    expect(control.floatingPosition()).toBe('top');
    expect(control.helperText()).toBeNull();
    expect(control.helperPosition()).toBe('below');
    expect(control.leadingIcon()).toBeNull();
    expect(control.trailingIcon()).toBeNull();
    expect(control.clearable()).toBe(false);
    expect(control.feedbackText()).toBeNull();
    expect(control.feedbackDismissible()).toBe(false);
  });

  it('normalizes helper and feedback text and requires status for feedback', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;

    fixture.componentRef.setInput('helperText', '  Guidance  ');
    fixture.componentRef.setInput('feedbackText', '  Invalid value  ');
    fixture.detectChanges();

    expect(control.helperForTest).toBe('Guidance');
    expect(control.feedbackForTest).toBe('Invalid value');
    expect(control.feedbackVisibleForTest).toBe(false);

    fixture.componentRef.setInput('status', 'danger');
    fixture.detectChanges();

    expect(control.feedbackVisibleForTest).toBe(true);
  });

  it('dismisses only dismissible visible feedback and resets on text or status changes', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;

    fixture.componentRef.setInput('status', 'warning');
    fixture.componentRef.setInput('feedbackText', 'Review value');
    fixture.detectChanges();

    expect(control.dismissFeedbackForTest()).toBe(false);
    expect(control.feedbackVisibleForTest).toBe(true);

    fixture.componentRef.setInput('feedbackDismissible', true);
    fixture.detectChanges();

    expect(control.dismissFeedbackForTest()).toBe(true);
    expect(control.feedbackVisibleForTest).toBe(false);
    expect(control.status()).toBe('warning');

    fixture.componentRef.setInput('feedbackText', 'Review updated value');
    fixture.detectChanges();
    expect(control.feedbackVisibleForTest).toBe(true);

    expect(control.dismissFeedbackForTest()).toBe(true);
    fixture.componentRef.setInput('status', 'danger');
    fixture.detectChanges();
    expect(control.feedbackVisibleForTest).toBe(true);
  });
});
