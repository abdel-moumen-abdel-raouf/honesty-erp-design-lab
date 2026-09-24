import {TestBed} from '@angular/core/testing';
import {ErpIconButton} from '../../icon-button/icon-button';
import {ErpFieldFeedback} from './field-feedback';
import {ErpFieldFrame} from './field-frame';

describe('ErpFieldFrame', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErpFieldFrame],
    });
  });

  function createFixture() {
    const fixture = TestBed.createComponent(ErpFieldFrame);
    fixture.componentRef.setInput('label', 'Name');
    fixture.componentRef.setInput('controlId', 'name-control');
    fixture.detectChanges();
    return fixture;
  }

  it('renders exact default facet evidence and a genuine static label', () => {
    const fixture = createFixture();
    const host = fixture.nativeElement as HTMLElement;
    const label = host.querySelector('label');

    expect(host.getAttribute('data-field-tone')).toBe('neutral');
    expect(host.getAttribute('data-field-status')).toBe('none');
    expect(host.getAttribute('data-field-variant')).toBe('outline');
    expect(host.getAttribute('data-field-border-mode')).toBe('solid');
    expect(host.getAttribute('data-field-shape')).toBe('default');
    expect(host.getAttribute('data-field-size')).toBe('md');
    expect(host.getAttribute('data-field-appearance')).toBe('standard');
    expect(host.getAttribute('data-field-label-mode')).toBe('static');
    expect(host.getAttribute('data-field-helper-position')).toBe('below');
    expect(label?.getAttribute('for')).toBe('name-control');
    expect(label?.textContent?.trim()).toBe('Name');
  });

  it('updates every visual contract group through stable host evidence', () => {
    const fixture = createFixture();
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('tone', 'accent');
    fixture.componentRef.setInput('status', 'warning');
    fixture.componentRef.setInput('variant', 'text');
    fixture.componentRef.setInput('borderMode', 'dashed');
    fixture.componentRef.setInput('shape', 'pill');
    fixture.componentRef.setInput('size', 'xxxxl');
    fixture.componentRef.setInput('appearance', 'glass');
    fixture.componentRef.setInput('labelMode', 'floating');
    fixture.componentRef.setInput('floatingPosition', 'bottom');
    fixture.componentRef.setInput('helperPosition', 'above');
    fixture.detectChanges();

    expect(host.getAttribute('data-field-tone')).toBe('accent');
    expect(host.getAttribute('data-field-status')).toBe('warning');
    expect(host.getAttribute('data-field-variant')).toBe('text');
    expect(host.getAttribute('data-field-border-mode')).toBe('underline');
    expect(host.getAttribute('data-field-shape')).toBe('pill');
    expect(host.getAttribute('data-field-size')).toBe('xxxxl');
    expect(host.getAttribute('data-field-appearance')).toBe('glass');
    expect(host.getAttribute('data-field-label-mode')).toBe('floating');
    expect(host.getAttribute('data-field-floating-position')).toBe('bottom');
    expect(host.getAttribute('data-field-helper-position')).toBe('above');
  });

  it('floats the label for focus, display value, or nonblank placeholder', () => {
    const fixture = createFixture();
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('labelMode', 'floating');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-floating')).toBe('false');

    fixture.componentRef.setInput('focused', true);
    fixture.detectChanges();
    expect(host.getAttribute('data-field-floating')).toBe('true');

    fixture.componentRef.setInput('focused', false);
    fixture.componentRef.setInput('hasDisplayValue', true);
    fixture.detectChanges();
    expect(host.getAttribute('data-field-floating')).toBe('true');

    fixture.componentRef.setInput('hasDisplayValue', false);
    fixture.componentRef.setInput('placeholder', 'Example');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-floating')).toBe('true');
  });

  it('renders helper and feedback in the required block order', () => {
    const fixture = createFixture();
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('helperText', 'Guidance');
    fixture.componentRef.setInput('feedbackText', 'Invalid value');
    fixture.componentRef.setInput('feedbackVisible', true);
    fixture.componentRef.setInput('status', 'danger');
    fixture.detectChanges();

    const control = host.querySelector('.field-frame__control');
    const feedback = host.querySelector('erp-field-feedback');
    const helper = host.querySelector('.field-frame__helper');

    expect(control).toBeTruthy();
    expect(feedback).toBeTruthy();
    expect(helper).toBeTruthy();
    expect(helper?.textContent).toContain('Guidance');
    expect(
      control!.compareDocumentPosition(feedback!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      feedback!.compareDocumentPosition(helper!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('publishes clear and feedback dismissal through internal actions', () => {
    const fixture = createFixture();
    const clearRequested = vi.fn();
    const feedbackDismissed = vi.fn();
    fixture.componentInstance.clearRequested.subscribe(clearRequested);
    fixture.componentInstance.feedbackDismissed.subscribe(feedbackDismissed);

    fixture.componentRef.setInput('clearable', true);
    fixture.componentRef.setInput('feedbackText', 'Review value');
    fixture.componentRef.setInput('feedbackVisible', true);
    fixture.componentRef.setInput('feedbackDismissible', true);
    fixture.componentRef.setInput('status', 'warning');
    fixture.detectChanges();

    const clearAction = fixture.debugElement.query(
      (node) => node.componentInstance instanceof ErpIconButton,
    );
    const feedback = fixture.debugElement.query(
      (node) => node.componentInstance instanceof ErpFieldFeedback,
    );

    clearAction.componentInstance.pressed.emit();
    feedback.componentInstance.dismissed.emit();

    expect(clearRequested).toHaveBeenCalledOnce();
    expect(feedbackDismissed).toHaveBeenCalledOnce();
  });
});
