import {booleanAttribute, ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal ERP controls intentionally use the erp prefix.
  selector: 'erp-sort-trigger',
  templateUrl: './sort-trigger.html',
  styleUrl: './sort-trigger.scss',
})
export class ErpSortTrigger {
  readonly label = input.required<string>();
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly activated = output<void>();
}
