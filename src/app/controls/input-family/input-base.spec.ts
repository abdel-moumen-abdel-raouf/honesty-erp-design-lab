import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpInputBase} from './input-base';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-input-base',
  template: '',
})
class TestInputBase extends ErpInputBase<string> {
  constructor() {
    super('');
  }

  get valueForTest(): string {
    return this.currentValue();
  }

  get trimmedLabelForTest(): string {
    return this.trimmedLabel();
  }

  get configurationStateForTest() {
    return this.configurationState();
  }

  get effectiveDisabledForTest(): boolean {
    return this.effectiveDisabled();
  }

  get focusedForTest(): boolean {
    return this.focused();
  }

  commitForTest(value: unknown): boolean {
    return this.commitUserValue(value);
  }

  focusForTest(): void {
    this.handleFocus();
  }

  blurForTest(): void {
    this.handleBlur();
  }

  clearFocusForTest(): void {
    this.clearFocusState();
  }

  protected override normalizeValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }
}

describe('ErpInputBase', () => {
  function createFixture(label = 'Name') {
    const fixture = TestBed.createComponent(TestInputBase);
    fixture.componentRef.setInput('label', label);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestInputBase],
    });
  });

  it('has the exact common defaults and ready configuration with a valid label', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;

    expect(control.label()).toBe('Name');
    expect(control.name()).toBeNull();
    expect(control.form()).toBeNull();
    expect(control.disabled()).toBe(false);
    expect(control.configurationStateForTest).toBe('ready');
    expect(control.effectiveDisabledForTest).toBe(false);
    expect(control.focusedForTest).toBe(false);
    expect(control.valueForTest).toBe('');
  });

  it('treats a blank trimmed label as invalid configuration and blocks user commits', () => {
    const fixture = createFixture('   ');
    const control = fixture.componentInstance;
    const onChange = vi.fn();

    control.registerOnChange(onChange);

    expect(control.trimmedLabelForTest).toBe('');
    expect(control.configurationStateForTest).toBe('invalid');
    expect(control.effectiveDisabledForTest).toBe(true);
    expect(control.commitForTest('blocked')).toBe(false);
    expect(control.valueForTest).toBe('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('normalizes form writes without publishing a user change', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;
    const onChange = vi.fn();

    control.registerOnChange(onChange);
    control.writeValue(42);

    expect(control.valueForTest).toBe('42');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('normalizes and publishes an enabled user commit exactly once', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;
    const onChange = vi.fn();

    control.registerOnChange(onChange);

    expect(control.commitForTest(42)).toBe(true);
    expect(control.valueForTest).toBe('42');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('42');
  });

  it('combines the explicit disabled input with Angular Forms disabled state', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;
    const onChange = vi.fn();

    control.registerOnChange(onChange);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(control.effectiveDisabledForTest).toBe(true);
    expect(control.commitForTest('blocked-explicit')).toBe(false);

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    control.setDisabledState(true);

    expect(control.effectiveDisabledForTest).toBe(true);
    expect(control.commitForTest('blocked-form')).toBe(false);

    control.setDisabledState(false);

    expect(control.effectiveDisabledForTest).toBe(false);
    expect(control.commitForTest('accepted')).toBe(true);
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('accepted');
  });

  it('owns focus state and reports touched on blur', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;
    const onTouched = vi.fn();

    control.registerOnTouched(onTouched);

    control.focusForTest();
    expect(control.focusedForTest).toBe(true);

    control.blurForTest();
    expect(control.focusedForTest).toBe(false);
    expect(onTouched).toHaveBeenCalledOnce();
  });

  it('clears stored focus without reporting touched through the protected helper', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;
    const onTouched = vi.fn();

    control.registerOnTouched(onTouched);
    control.focusForTest();
    control.clearFocusForTest();

    expect(control.focusedForTest).toBe(false);
    expect(onTouched).not.toHaveBeenCalled();
  });

  it('clears stored focus across every effective-disabled transition', () => {
    const fixture = createFixture();
    const control = fixture.componentInstance;

    control.focusForTest();
    expect(control.focusedForTest).toBe(true);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(control.focusedForTest).toBe(false);

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(control.focusedForTest).toBe(false);

    control.focusForTest();
    expect(control.focusedForTest).toBe(true);

    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(control.focusedForTest).toBe(false);

    fixture.componentRef.setInput('label', 'Name');
    fixture.detectChanges();
    expect(control.focusedForTest).toBe(false);

    control.focusForTest();
    expect(control.focusedForTest).toBe(true);

    control.setDisabledState(true);
    fixture.detectChanges();
    expect(control.focusedForTest).toBe(false);

    control.setDisabledState(false);
    fixture.detectChanges();
    expect(control.focusedForTest).toBe(false);
  });
});
