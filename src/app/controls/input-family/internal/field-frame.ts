import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpIconName} from '../../../primitives/icon/icon-contracts';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpText} from '../../../primitives/text/text';
import {ErpIconButton} from '../../icon-button/icon-button';
import {ErpTooltip} from '../../tooltip/tooltip';
import {
  ErpFieldAppearance,
  ErpFieldBorderMode,
  ErpFieldFloatingPosition,
  ErpFieldHelperPosition,
  ErpFieldLabelMode,
  ErpFieldShape,
  ErpFieldSize,
  ErpFieldStatus,
  ErpFieldTone,
  ErpFieldVariant,
} from '../field-contracts';
import {ErpFieldFeedback} from './field-feedback';
import {ErpInputConfigurationState} from '../input-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-field-frame',
  imports: [
    ErpFieldFeedback,
    ErpIcon,
    ErpIconButton,
    ErpText,
    ErpTooltip,
  ],
  templateUrl: './field-frame.html',
  styleUrls: ['./field-frame.scss', './field-frame-facets.scss'],
  host: {
    '[attr.data-field-tone]': 'tone()',
    '[attr.data-field-status]': 'status()',
    '[attr.data-field-variant]': 'variant()',
    '[attr.data-field-border-mode]': 'effectiveBorderMode()',
    '[attr.data-field-shape]': 'shape()',
    '[attr.data-field-size]': 'size()',
    '[attr.data-field-appearance]': 'appearance()',
    '[attr.data-field-label-mode]': 'labelMode()',
    '[attr.data-field-floating-position]': 'floatingPosition()',
    '[attr.data-field-helper-position]': 'helperPosition()',
    '[attr.data-field-focused]': 'focused()',
    '[attr.data-field-floating]': 'floatingLabelActive()',
    '[attr.data-field-disabled]': 'disabled()',
    '[attr.data-field-configuration-state]': 'configurationState()',
    '[attr.data-field-multiline]': 'multiline()',
  },
})
export class ErpFieldFrame {
  readonly label = input.required<string>();
  readonly controlId = input.required<string>();
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly variant = input<ErpFieldVariant>('outline');
  readonly borderMode = input<ErpFieldBorderMode>('solid');
  readonly shape = input<ErpFieldShape>('default');
  readonly size = input<ErpFieldSize>('md');
  readonly appearance = input<ErpFieldAppearance>('standard');
  readonly labelMode = input<ErpFieldLabelMode>('static');
  readonly floatingPosition = input<ErpFieldFloatingPosition>('top');
  readonly helperText = input<string | null>(null);
  readonly helperPosition = input<ErpFieldHelperPosition>('below');
  readonly leadingIcon = input<ErpIconName | null>(null);
  readonly trailingIcon = input<ErpIconName | null>(null);
  readonly clearable = input(false, {transform: booleanAttribute});
  readonly clearLabel = input('مسح القيمة');
  readonly feedbackText = input<string | null>(null);
  readonly feedbackDismissible = input(false, {
    transform: booleanAttribute,
  });
  readonly feedbackDismissLabel = input('إغلاق الرسالة');
  readonly feedbackVisible = input(false, {transform: booleanAttribute});
  readonly focused = input(false, {transform: booleanAttribute});
  readonly hasDisplayValue = input(false, {transform: booleanAttribute});
  readonly placeholder = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly configurationState =
    input<ErpInputConfigurationState>('ready');
  readonly multiline = input(false, {transform: booleanAttribute});

  readonly clearRequested = output<void>();
  readonly feedbackDismissed = output<void>();

  readonly trimmedHelperText = computed(
    () => this.helperText()?.trim() ?? '',
  );
  readonly trimmedPlaceholder = computed(
    () => this.placeholder()?.trim() ?? '',
  );
  readonly floatingLabelActive = computed(
    () =>
      this.labelMode() === 'floating' &&
      (this.focused() ||
        this.hasDisplayValue() ||
        this.trimmedPlaceholder().length > 0),
  );
  readonly effectiveBorderMode = computed<ErpFieldBorderMode>(() =>
    this.variant() === 'text' ? 'underline' : this.borderMode(),
  );
  readonly helperId = computed(() => `${this.controlId()}-helper`);
  readonly feedbackId = computed(() => `${this.controlId()}-feedback`);
}
