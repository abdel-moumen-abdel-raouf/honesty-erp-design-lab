import {
  ChangeDetectionStrategy,
  Component,
  Type,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {DOCUMENT, NgComponentOutlet} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {
  ERP_COMPONENT_CATALOG,
  ERP_PUBLIC_SHOWCASE_LOADERS,
} from '../../catalog/erp-component-catalog.generated';
import {ErpPage} from '../../controls/page/page';
import {ErpButton} from '../../controls/button/button';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-component-showcase',
  imports: [
    ErpInline,
    ErpButton,
    ErpPage,
    ErpSection,
    ErpStack,
    ErpText,
    NgComponentOutlet,
  ],
  templateUrl: './component-showcase.html',
  styleUrl: './component-showcase.scss',
})
export class ComponentShowcase {
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
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
  readonly showcaseType = signal<Type<unknown> | null>(null);
  readonly technicalDetailsExpanded = signal(false);

  reviewStatusLabel(status: string): string {
    if (status === 'accepted-frozen') return 'مقبول ومجمّد';
    if (status === 'reopened') return 'أعيد فتحه للمراجعة';
    return 'بانتظار قرار Product Owner';
  }

  referenceLabel(kind: string): string {
    if (kind === 'exact-local') return 'مرجع Product Owner دقيق';
    if (kind === 'external-skodash') return 'مرجع Skodash خارجي';
    return 'تصميم Honesty ERP أصلي';
  }

  scrollTo(sectionId: string): void {
    this.document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  toggleTechnicalDetails(): void {
    this.technicalDetailsExpanded.update((expanded) => !expanded);
  }

  constructor() {
    effect((onCleanup) => {
      const loader = ERP_PUBLIC_SHOWCASE_LOADERS[this.componentId()];
      let current = true;
      this.showcaseType.set(null);

      if (loader) {
        loader().then((showcaseType: Type<unknown>) => {
          if (current) this.showcaseType.set(showcaseType);
        });
      }

      onCleanup(() => {
        current = false;
      });
    });
  }
}
