import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {ErpText} from '../../primitives/text/text';

let nextFormSectionId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-form-section',
  imports: [ErpText],
  templateUrl: './form-section.html',
  styleUrl: './form-section.scss',
  host: {'[attr.data-form-section-compact]': 'compact()'},
})
export class ErpFormSection {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly compact = input(false, {transform: booleanAttribute});
  protected readonly titleId = `erp-form-section-${++nextFormSectionId}-title`;
  protected readonly trimmedTitle = computed(() => this.title().trim());
  protected readonly trimmedDescription = computed(() => this.description()?.trim() ?? '');
}
