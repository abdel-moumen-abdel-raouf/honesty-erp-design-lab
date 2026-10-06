import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
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
  styleUrls: ['./field-frame.scss', './field-frame-part-2.scss', './field-frame-part-3.scss', './field-frame-part-4.scss', './field-frame-part-5.scss', './field-frame-part-6.scss', './field-frame-part-7.scss', './field-frame-part-8.scss', './field-frame-facets.scss', './field-frame-facets-part-2.scss', './field-frame-facets-part-3.scss', './field-frame-facets-part-4.scss', './field-frame-facets-part-5.scss', './field-frame-custom.scss'],
  host: {
    '(click)': 'handleControlSurfaceClick($event)',
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
    '[attr.data-field-control-presentation]': 'controlPresentation()',
  },
})
export class ErpFieldFrame implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

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
  readonly controlPresentation = input<'standard' | 'custom'>('standard');

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

  ngAfterViewInit(): void {
    this.host.nativeElement.setAttribute(
      'data-field-interaction',
      this.controlInteraction(),
    );
  }

  handleControlSurfaceClick(event: MouseEvent): void {
    if (this.disabled() || this.configurationState() !== 'ready') {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('.field-frame__control') === null) {
      return;
    }

    const interactive = target.closest(
      '[field-leading-action], [field-domain-action], [field-trailing], button, input, textarea, select, a[href], [role="button"], [tabindex]',
    );

    if (interactive !== null) {
      return;
    }

    const control = this.owningControl();

    if (
      control instanceof HTMLInputElement ||
      control instanceof HTMLTextAreaElement
    ) {
      if (!control.disabled) {
        control.focus();
      }
      return;
    }

    if (control instanceof HTMLButtonElement && !control.disabled) {
      control.focus();
      control.click();
    }
  }

  private controlInteraction(): 'editor' | 'trigger' | 'none' {
    const control = this.owningControl();

    if (
      control instanceof HTMLInputElement ||
      control instanceof HTMLTextAreaElement
    ) {
      return 'editor';
    }

    return control instanceof HTMLButtonElement ? 'trigger' : 'none';
  }

  private owningControl(): HTMLElement | undefined {
    const controlId = this.controlId();

    return [
      ...this.host.nativeElement.querySelectorAll<HTMLElement>('[id]'),
    ].find((candidate) => candidate.id === controlId);
  }
}
