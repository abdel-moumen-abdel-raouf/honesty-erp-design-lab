import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
export type ErpSkeletonVariant = 'line' | 'block' | 'circle';
export type ErpSkeletonSize = 'sm' | 'md' | 'lg';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-skeleton',
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  host: {
    role: 'status',
    '[attr.aria-label]': 'label()',
    '[attr.data-skeleton-variant]': 'variant()',
    '[attr.data-skeleton-size]': 'size()',
    '[attr.data-skeleton-animated]': 'animated()',
  },
})
export class ErpSkeleton {
  readonly variant = input<ErpSkeletonVariant>('line');
  readonly size = input<ErpSkeletonSize>('md');
  readonly lines = input(1);
  readonly animated = input(true, {transform: booleanAttribute});
  readonly label = input('جارٍ تحميل المحتوى');

  protected readonly normalizedLines = computed(() => {
    const value = this.lines();
    return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
  });
}
