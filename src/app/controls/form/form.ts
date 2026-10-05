import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpText} from '../../primitives/text/text';

let nextFormId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-form',
  imports: [ErpText],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  host: {
    '[attr.data-form-disabled]': 'disabled()',
    '[attr.data-form-busy]': 'busy()',
  },
})
export class ErpForm {
  readonly label = input.required<string>();
  readonly description = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly busy = input(false, {transform: booleanAttribute});
  readonly submitRequested = output<void>();
  readonly resetRequested = output<void>();

  protected readonly formId = `erp-form-${++nextFormId}`;
  protected readonly labelId = `${this.formId}-label`;
  protected readonly descriptionId = `${this.formId}-description`;
  protected readonly trimmedLabel = computed(() => this.label().trim());
  protected readonly trimmedDescription = computed(
    () => this.description()?.trim() ?? '',
  );
  protected readonly blocked = computed(() =>
    this.disabled() || this.busy() || this.trimmedLabel().length === 0,
  );

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    if (!this.blocked()) this.submitRequested.emit();
  }

  protected reset(event: Event): void {
    event.preventDefault();
    if (!this.blocked()) this.resetRequested.emit();
  }
}
