import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpNumberBox} from '../../controls/number-box/number-box';
import {ErpRangeSlider} from '../../controls/range-slider/range-slider';
import {ErpSelect} from '../../controls/select/select';
import {ErpSelectOption} from '../../controls/select/select-contracts';
import {ErpTextAreaBox} from '../../controls/text-area-box/text-area-box';
import {ErpTextBox} from '../../controls/text-box/text-box';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

export type ErpShowcaseControlKind =
  | 'boolean'
  | 'function'
  | 'json'
  | 'number'
  | 'range'
  | 'select'
  | 'text';

export interface ErpShowcaseControlDefinition {
  readonly name: string;
  readonly label: string;
  readonly source: 'cva' | 'input' | 'model' | 'preview';
  readonly kind: ErpShowcaseControlKind;
  readonly required: boolean;
  readonly type: string;
  readonly options: readonly string[];
  readonly initialValue: unknown;
}

export interface ErpShowcaseControlChange {
  readonly control: ErpShowcaseControlDefinition;
  readonly value: unknown;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-showcase-control-panel',
  imports: [
    ErpCheckBox,
    ErpGrid,
    ErpNumberBox,
    ErpRangeSlider,
    ErpSelect,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpTextAreaBox,
    ErpTextBox,
    ReactiveFormsModule,
  ],
  templateUrl: './showcase-control-panel.html',
  styleUrl: './showcase-control-panel.scss',
})
export class ErpReviewShowcaseControlPanel {
  readonly controls = input.required<readonly ErpShowcaseControlDefinition[]>();
  readonly values = input.required<Readonly<Record<string, unknown>>>();
  readonly controlChanged = output<ErpShowcaseControlChange>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly editors = new Map<string, UntypedFormControl>();
  private readonly optionSets = new Map<string, readonly ErpSelectOption[]>();
  private readonly invalidDrafts = new Set<string>();
  readonly errors = signal<Readonly<Record<string, string>>>({});

  constructor() {
    effect(() => {
      const values = this.values();
      for (const definition of this.controls()) {
        const editor = this.editors.get(definition.name);
        if (!editor || this.invalidDrafts.has(definition.name)) continue;
        const nextValue = this.toEditorValue(definition, values[definition.name]);
        if (!this.sameEditorValue(definition, editor.value, nextValue)) {
          editor.setValue(nextValue, {emitEvent: false});
        }
      }
    });
  }

  editor(definition: ErpShowcaseControlDefinition): UntypedFormControl {
    const existing = this.editors.get(definition.name);
    if (existing) return existing;

    const control = new UntypedFormControl(
      this.toEditorValue(definition, this.values()[definition.name]),
    );
    control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.emitValue(definition, value));
    this.editors.set(definition.name, control);
    return control;
  }

  options(definition: ErpShowcaseControlDefinition): readonly ErpSelectOption[] {
    const existing = this.optionSets.get(definition.name);
    if (existing) return existing;

    const options = definition.kind === 'function'
      ? [
        {value: 'none', label: 'بدون دالة مخصصة'},
        {value: 'sample', label: 'تفعيل دالة العرض التجريبية'},
      ]
      : [
          ...(!definition.required && definition.initialValue === null
            ? [{value: '__null__', label: 'بدون قيمة'}]
            : []),
          ...definition.options.map((value) => ({value, label: value})),
        ];
    this.optionSets.set(definition.name, options);
    return options;
  }

  error(name: string): string | null {
    return this.errors()[name] ?? null;
  }

  private emitValue(
    definition: ErpShowcaseControlDefinition,
    editorValue: unknown,
  ): void {
    if (definition.kind === 'json') {
      try {
        const value = JSON.parse(String(editorValue));
        const structureError = this.structuredValueError(definition, value);
        if (structureError) {
          this.invalidDrafts.add(definition.name);
          this.errors.update((current) => ({
            ...current,
            [definition.name]: structureError,
          }));
          return;
        }
        this.invalidDrafts.delete(definition.name);
        this.clearError(definition.name);
        this.controlChanged.emit({control: definition, value});
      } catch {
        this.invalidDrafts.add(definition.name);
        this.errors.update((current) => ({
          ...current,
          [definition.name]: 'JSON غير صالح؛ لم يُطبق التغيير.',
        }));
      }
      return;
    }

    const value = definition.kind === 'range'
      ? Number((editorValue as {upper?: unknown} | null)?.upper ?? 0)
      : editorValue === '__null__'
        ? null
        : editorValue;
    this.clearError(definition.name);
    this.controlChanged.emit({control: definition, value});
  }

  private toEditorValue(
    definition: ErpShowcaseControlDefinition,
    value: unknown,
  ): unknown {
    if (definition.kind === 'json') {
      return JSON.stringify(value ?? null, null, 2);
    }
    if (definition.kind === 'function') {
      return typeof value === 'function' ? 'sample' : 'none';
    }
    if (definition.kind === 'range') {
      return {lower: 0, upper: Number(value ?? definition.initialValue ?? 0)};
    }
    if (value === null && !definition.required) return '__null__';
    return value ?? definition.initialValue;
  }

  private clearError(name: string): void {
    if (!(name in this.errors())) return;
    this.errors.update((current) => {
      const next = {...current};
      delete next[name];
      return next;
    });
  }

  private structuredValueError(
    definition: ErpShowcaseControlDefinition,
    value: unknown,
  ): string | null {
    const type = definition.type.replaceAll(/\s+/g, ' ').trim();
    if (type === 'ControlValueAccessor value' || /\bunknown\b|\bany\b/.test(type)) {
      return null;
    }
    if (value === null) {
      return definition.required && !/\bnull\b|\bundefined\b/.test(type)
        ? `القيمة ${definition.name} مطلوبة ولا تقبل null.`
        : null;
    }

    const expectsArray = /\[\]|\b(?:Readonly)?Array\s*</.test(type);
    if (expectsArray) {
      if (!Array.isArray(value)) {
        return `القيمة ${definition.name} يجب أن تكون مصفوفة توافق ${type}.`;
      }
      if (/\bstring\s*\[\]/.test(type) && value.some((item) => typeof item !== 'string')) {
        return `كل عناصر ${definition.name} يجب أن تكون نصوصًا.`;
      }
      if (/\bnumber\s*\[\]/.test(type) &&
          value.some((item) => typeof item !== 'number' || !Number.isFinite(item))) {
        return `كل عناصر ${definition.name} يجب أن تكون أرقامًا صالحة.`;
      }
      if (!/\b(?:string|number|boolean|unknown|any)\s*\[\]/.test(type) &&
          value.some((item) => item === null || typeof item !== 'object' || Array.isArray(item))) {
        return `كل عناصر ${definition.name} يجب أن تكون كائنات توافق ${type}.`;
      }
      return null;
    }

    if (/\bboolean\b/.test(type) || typeof definition.initialValue === 'boolean') {
      return typeof value === 'boolean'
        ? null
        : `القيمة ${definition.name} يجب أن تكون منطقية.`;
    }
    if (/\bnumber\b/.test(type) || typeof definition.initialValue === 'number') {
      return typeof value === 'number' && Number.isFinite(value)
        ? null
        : `القيمة ${definition.name} يجب أن تكون رقمًا صالحًا.`;
    }
    if (/\bstring\b|\bkeyof\b|(?:Name|Size|Tone|Variant|Motion|Animation)$/.test(type) ||
        typeof definition.initialValue === 'string') {
      return typeof value === 'string'
        ? null
        : `القيمة ${definition.name} يجب أن تكون نصًا.`;
    }

    const expectsObject = /\bRecord\s*<|\bPartial\s*<|\{/.test(type) ||
      (definition.initialValue !== null &&
        typeof definition.initialValue === 'object' &&
        !Array.isArray(definition.initialValue)) ||
      /^Erp[A-Z].*(?:Config|Definition|Issue|Option|Row|Sort|Value|Values|Schema|Section)$/.test(type);
    if (expectsObject && (typeof value !== 'object' || Array.isArray(value))) {
      return `القيمة ${definition.name} يجب أن تكون كائنًا يوافق ${type}.`;
    }
    return null;
  }

  private sameEditorValue(
    definition: ErpShowcaseControlDefinition,
    current: unknown,
    next: unknown,
  ): boolean {
    if (definition.kind !== 'range') return Object.is(current, next);
    const currentRange = current as {lower?: unknown; upper?: unknown} | null;
    const nextRange = next as {lower?: unknown; upper?: unknown} | null;
    return currentRange?.lower === nextRange?.lower &&
      currentRange?.upper === nextRange?.upper;
  }
}
