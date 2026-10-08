import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';

import {ErpButton} from '../../controls/button/button';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {
  CoreBatch,
} from '../exact-core-showcase/core-batch';

type ErpCoreBatchFocus =
  | 'avatar'
  | 'avatar-picker'
  | 'select'
  | 'status-badge'
  | 'table'
  | 'tabs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-showcase-exact-reference',
  imports: [CoreBatch, ErpButton, ErpStack, ErpSurface, ErpText],
  templateUrl: './showcase-exact-reference.html',
  styleUrl: './showcase-exact-reference.scss',
})
export class ErpReviewShowcaseExactReference {
  readonly focus = input.required<ErpCoreBatchFocus>();
  readonly expanded = signal(false);

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
