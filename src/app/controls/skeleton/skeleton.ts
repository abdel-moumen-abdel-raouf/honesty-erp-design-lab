/* eslint-disable @angular-eslint/component-selector */
import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core';
export type ErpSkeletonVariant = 'line' | 'block' | 'circle';
export type ErpSkeletonSize = 'sm' | 'md' | 'lg';
@Component({changeDetection: ChangeDetectionStrategy.OnPush,   selector: 'erp-skeleton', templateUrl: './skeleton.html', styleUrl: './skeleton.scss', host: {'role': 'status', '[attr.aria-label]': 'label()', '[attr.data-skeleton-variant]': 'variant()', '[attr.data-skeleton-size]': 'size()', '[attr.data-skeleton-animated]': 'animated()'}})
export class ErpSkeleton { readonly variant = input<ErpSkeletonVariant>('line'); readonly size = input<ErpSkeletonSize>('md'); readonly lines = input(1); readonly animated = input(true, {transform: booleanAttribute}); readonly label = input('جارٍ تحميل المحتوى'); }
