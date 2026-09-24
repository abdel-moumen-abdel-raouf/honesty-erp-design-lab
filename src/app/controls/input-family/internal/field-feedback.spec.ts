import {TestBed} from '@angular/core/testing';
import {ErpIconButton} from '../../icon-button/icon-button';
import {ErpFieldFeedback} from './field-feedback';

describe('ErpFieldFeedback', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErpFieldFeedback],
    });
  });

  function createFixture() {
    const fixture = TestBed.createComponent(ErpFieldFeedback);
    fixture.componentRef.setInput('messageId', 'field-feedback-proof');
    fixture.componentRef.setInput('text', 'Invalid value');
    fixture.componentRef.setInput('status', 'danger');
    fixture.detectChanges();
    return fixture;
  }

  it('renders in-flow status feedback with deterministic host evidence', () => {
    const fixture = createFixture();
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector('.field-feedback__surface');

    expect(host.getAttribute('data-field-feedback-status')).toBe('danger');
    expect(host.getAttribute('data-field-feedback-dismissible')).toBe('false');
    expect(surface?.id).toBe('field-feedback-proof');
    expect(surface?.getAttribute('role')).toBe('alert');
    expect(surface?.textContent).toContain('Invalid value');
    expect(host.querySelector('.field-feedback__caret')).toBeTruthy();
    expect(host.querySelector('erp-icon-button')).toBeNull();
  });

  it('emits dismissal through the wrapped close action', () => {
    const fixture = createFixture();
    const dismissed = vi.fn();
    fixture.componentInstance.dismissed.subscribe(dismissed);

    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const action = fixture.debugElement.query(
      (node) => node.componentInstance instanceof ErpIconButton,
    );

    expect(host.getAttribute('data-field-feedback-dismissible')).toBe('true');
    expect(host.querySelector('erp-tooltip')).toBeTruthy();
    expect(action).toBeTruthy();

    action.componentInstance.pressed.emit();
    expect(dismissed).toHaveBeenCalledOnce();
  });
});
