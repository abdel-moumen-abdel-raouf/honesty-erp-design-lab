import {
  ChangeDetectionStrategy,
  Component,
  Type,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {
  ERP_COMPONENT_CATALOG,
  ERP_PUBLIC_COMPONENT_LOADERS,
} from '../../catalog/erp-component-catalog.generated';
import {ErpPage} from '../../controls/page/page';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewComponentHost} from '../../review-internals/review-component-host/review-component-host';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-component-showcase',
  imports: [
    ErpInline,
    ErpPage,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpReviewComponentHost,
  ],
  templateUrl: './component-showcase.html',
  styleUrl: './component-showcase.scss',
})
export class ComponentShowcase {
  private readonly route = inject(ActivatedRoute);
  private readonly componentId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('componentId') ?? '')),
    {initialValue: ''},
  );

  readonly entry = computed(() =>
    ERP_COMPONENT_CATALOG.find(
      (candidate) =>
        candidate.classification === 'PUBLIC ERP COMPONENT' &&
        candidate.id === this.componentId(),
    ) ?? null,
  );
  readonly componentType = signal<Type<unknown> | null>(null);

  constructor() {
    effect((onCleanup) => {
      const loader = ERP_PUBLIC_COMPONENT_LOADERS[this.componentId()];
      let current = true;
      this.componentType.set(null);

      if (loader) {
        loader().then((componentType) => {
          if (current) this.componentType.set(componentType);
        });
      }

      onCleanup(() => {
        current = false;
      });
    });
  }
}
