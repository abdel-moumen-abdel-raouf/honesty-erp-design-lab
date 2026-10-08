import {NgComponentOutlet} from '@angular/common';
import {ChangeDetectionStrategy, Component, Type, input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design Lab review internals use the erp-review prefix.
  selector: 'erp-review-component-host',
  imports: [NgComponentOutlet],
  templateUrl: './review-component-host.html',
})
export class ErpReviewComponentHost {
  readonly componentType = input.required<Type<unknown>>();
  readonly componentInputs = input<Readonly<Record<string, unknown>>>({});
}
