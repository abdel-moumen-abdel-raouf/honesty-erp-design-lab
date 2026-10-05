import {NgTemplateOutlet} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  ElementRef,
  inject,
  input,
  model,
  output,
  TemplateRef,
} from '@angular/core';
import {ErpStepDefinition, ErpStepPanelContext} from '../forms-family/forms-contracts';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpTabTrigger} from '../tabs/internal/tab-trigger';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpStepPanel]',
})
export class ErpStepPanel {
  readonly id = input.required<string>({alias: 'erpStepPanel'});
  readonly template = inject<TemplateRef<ErpStepPanelContext>>(TemplateRef);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-stepper',
  imports: [ErpIcon, ErpTabTrigger, ErpText, NgTemplateOutlet],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
  host: {'[attr.data-stepper-active]': 'resolvedActiveId()'},
})
export class ErpStepper {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly panelTemplates = contentChildren(ErpStepPanel);
  readonly steps = input.required<readonly ErpStepDefinition[]>();
  readonly activeId = model('');
  readonly changed = output<string>();

  protected readonly resolvedActiveId = computed(() => {
    const requested = this.activeId();
    return this.steps().some((step) => step.id === requested && !step.disabled)
      ? requested
      : this.steps().find((step) => !step.disabled)?.id ?? '';
  });

  protected activate(step: ErpStepDefinition): void {
    if (step.disabled) return;
    this.activeId.set(step.id);
    this.changed.emit(step.id);
  }

  protected panelTemplate(id: string): TemplateRef<ErpStepPanelContext> | null {
    return this.panelTemplates().find((panel) => panel.id() === id)?.template ?? null;
  }

  protected panelContext(step: ErpStepDefinition): ErpStepPanelContext {
    return {$implicit: step, step};
  }

  protected keydown(event: KeyboardEvent, index: number): void {
    const direction = getComputedStyle(this.host.nativeElement).direction;
    const logicalNext =
      (event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0) *
      (direction === 'rtl' ? -1 : 1);
    if (!logicalNext && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const enabled = this.steps().map((step, stepIndex) => ({step, stepIndex})).filter(({step}) => !step.disabled);
    const current = enabled.findIndex(({stepIndex}) => stepIndex === index);
    const target = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled.at(-1) : enabled[(current + logicalNext + enabled.length) % enabled.length];
    if (target) {
      this.activate(target.step);
      this.host.nativeElement.querySelectorAll<HTMLButtonElement>('[role="tab"]')[target.stepIndex]?.focus();
    }
  }
}
