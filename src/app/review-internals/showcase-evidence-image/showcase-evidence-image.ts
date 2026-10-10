import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-showcase-evidence-image',
  templateUrl: './showcase-evidence-image.html',
  styleUrl: './showcase-evidence-image.scss',
  host: {'data-review-image-owner': ''},
})
export class ErpReviewShowcaseEvidenceImage {
  readonly source = input.required<string>();
  readonly alternativeText = input.required<string>();
}
