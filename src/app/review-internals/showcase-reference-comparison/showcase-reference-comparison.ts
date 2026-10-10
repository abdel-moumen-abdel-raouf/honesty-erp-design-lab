import {DOCUMENT} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {ErpComponentCatalogEntry} from '../../catalog/erp-component-catalog.generated';
import {ErpButton} from '../../controls/button/button';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewShowcaseEvidenceImage} from '../showcase-evidence-image/showcase-evidence-image';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-showcase-reference-comparison',
  imports: [ErpButton, ErpReviewShowcaseEvidenceImage, ErpStack, ErpSurface, ErpText],
  templateUrl: './showcase-reference-comparison.html',
  styleUrl: './showcase-reference-comparison.scss',
})
export class ErpReviewShowcaseReferenceComparison {
  private readonly document = inject(DOCUMENT);
  readonly entry = input.required<ErpComponentCatalogEntry>();
  readonly reference = computed(() => this.entry().reviewReference);

  openUrl(url: string): void {
    this.document.defaultView?.open(url, '_blank', 'noopener,noreferrer');
  }
}
