import {Component, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpText} from '../../primitives/text/text';
import {ErpStepDefinition} from '../forms-family/forms-contracts';
import {ErpStepPanel, ErpStepper} from './stepper';

const steps: readonly ErpStepDefinition[] = [
  {id: 'identity', label: 'الهوية', completed: true},
  {id: 'details', label: 'التفاصيل', optional: true},
  {id: 'review', label: 'المراجعة', disabled: true},
];

@Component({selector: 'app-stepper-host', imports: [ErpStepPanel, ErpStepper, ErpText], template: '<erp-stepper [steps]="steps" [(activeId)]="active" (changed)="changed.set($event)"><ng-template erpStepPanel="identity" let-step><erp-text data-panel>{{ step.label }}</erp-text></ng-template><ng-template erpStepPanel="details"><erp-text data-details>تفاصيل غنية</erp-text></ng-template></erp-stepper>'})
class StepperHost { readonly steps = steps; readonly active = signal('identity'); readonly changed = signal(''); }

describe('ErpStepper', () => {
  it('renders first/explicit active, completed, optional, disabled, and rich panel states', () => {
    const fixture = TestBed.createComponent(StepperHost); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-panel]').textContent).toContain('الهوية');
    expect(fixture.nativeElement.querySelector('[data-step-completed="true"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-step-optional="true"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('button')[2].disabled).toBe(true);
  });

  it('emits controlled change and navigates enabled steps with keyboard in LTR and RTL', () => {
    const fixture = TestBed.createComponent(StepperHost); fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('erp-stepper') as HTMLElement;
    const first = host.querySelectorAll('button')[0] as HTMLButtonElement;
    first.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); fixture.detectChanges();
    expect(fixture.componentInstance.active()).toBe('details'); expect(fixture.componentInstance.changed()).toBe('details');
    host.style.direction = 'rtl';
    (host.querySelectorAll('button')[1] as HTMLButtonElement).dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); fixture.detectChanges();
    expect(fixture.componentInstance.active()).toBe('identity');
  });
});
