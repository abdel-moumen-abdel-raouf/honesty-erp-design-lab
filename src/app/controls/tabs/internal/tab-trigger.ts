import {booleanAttribute, ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal ERP controls intentionally use the erp prefix.
  selector: 'erp-tab-trigger',
  templateUrl: './tab-trigger.html',
  styleUrl: './tab-trigger.scss',
  host: {'[attr.data-tab-trigger-fill]': 'fill()'},
})
export class ErpTabTrigger {
  readonly id = input.required<string>();
  readonly controls = input.required<string>();
  readonly label = input.required<string>();
  readonly selected = input(false, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly tabIndex = input(0);
  readonly fill = input(false, {transform: booleanAttribute});
  readonly activated = output<void>();
  readonly keyPressed = output<KeyboardEvent>();
}
