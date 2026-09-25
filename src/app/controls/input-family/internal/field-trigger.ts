import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-field-trigger',
  templateUrl: './field-trigger.html',
  styleUrl: './field-trigger.scss',
  host: {
    '[attr.data-field-trigger-disabled]': 'disabled()',
  },
})
export class ErpFieldTrigger {
  readonly id = input.required<string>();
  readonly name = input<string | null>(null);
  readonly form = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly ariaDescribedBy = input<string | null>(null);
  readonly ariaErrorMessage = input<string | null>(null);
  readonly ariaInvalid = input<boolean | null>(null);

  readonly activated = output<MouseEvent>();
  readonly keyPressed = output<KeyboardEvent>();
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();
}
