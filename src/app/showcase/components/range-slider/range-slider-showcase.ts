import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpRangeSlider} from '../../../controls/range-slider/range-slider';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'range-slider')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true
        }
      }
    ]
  },
  {
    "id": "size",
    "label": "الأحجام",
    "cases": [
      {
        "id": "size-sm",
        "label": "size: sm",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "lg"
        }
      },
      {
        "id": "size-xl",
        "label": "size: xl",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "xl"
        }
      },
      {
        "id": "size-xxl",
        "label": "size: xxl",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "xxl"
        }
      },
      {
        "id": "size-xxxl",
        "label": "size: xxxl",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "xxxl"
        }
      },
      {
        "id": "size-xxxxl",
        "label": "size: xxxxl",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "size": "xxxxl"
        }
      }
    ]
  },
  {
    "id": "tone",
    "label": "النبرات",
    "cases": [
      {
        "id": "tone-neutral",
        "label": "محايد (neutral)",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "tone": "neutral"
        }
      },
      {
        "id": "tone-primary",
        "label": "رئيسي (primary)",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "tone": "secondary"
        }
      },
      {
        "id": "tone-accent",
        "label": "tone: accent",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "tone": "accent"
        }
      }
    ]
  },
  {
    "id": "appearance",
    "label": "المظهر",
    "cases": [
      {
        "id": "appearance-standard",
        "label": "appearance: standard",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "appearance": "standard"
        }
      },
      {
        "id": "appearance-glass",
        "label": "appearance: glass",
        "inputs": {
          "label": "نطاق الخصم",
          "helperText": "النطاق المسموح من 0 إلى 100",
          "min": 0,
          "max": 100,
          "step": 5,
          "defaultRange": {
            "lower": 20,
            "upper": 80
          },
          "clearable": true,
          "showValueTooltip": true,
          "appearance": "glass"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-range-slider-showcase',
  imports: [ErpRangeSlider, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ReactiveFormsModule],
  templateUrl: './range-slider-showcase.html',
  styleUrl: './range-slider-showcase.scss',
})
export class ErpRangeSliderShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>({"lower":25,"upper":75});
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));
  private readonly galleryControls = new Map<string, FormControl<unknown>>();
  readonly control = new FormControl<unknown>({"value":{"lower":25,"upper":75},"disabled":false});

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.cvaValue.set(value);
      this.recordEvent('valueChange', value);
    });
  }

  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));
  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));

  value(name: string): unknown {
    return this.liveValues()[name];
  }

  galleryValue(showcaseCase: {readonly inputs: Readonly<Record<string, unknown>>}, name: string): unknown {
    if (name === 'open') return false;
    return Object.prototype.hasOwnProperty.call(showcaseCase.inputs, name)
      ? showcaseCase.inputs[name]
      : ENTRY.showcaseInitialValues?.[name];
  }

  galleryControl(id: string, disabled: unknown): FormControl<unknown> {
    const existing = this.galleryControls.get(id);
    if (existing) return existing;
    const control = new FormControl<unknown>({value: {"lower":25,"upper":75}, disabled: Boolean(disabled)});
    this.galleryControls.set(id, control);
    return control;
  }

  applyControl(change: ErpShowcaseControlChange): void {
    if (change.control.source === 'cva') {
      this.control.setValue(change.value);
      return;
    }
    if (change.control.name === 'disabled') {
      this.liveValues.update((current) => ({...current, disabled: change.value}));
      if (change.value) this.control.disable();
      else this.control.enable();
      return;
    }
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.liveValues.update((current) => ({...current, [change.control.name]: value}));
  }

  recordModel(name: string, value: unknown): void {
    this.liveValues.update((current) => ({...current, [name]: value}));
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    let rendered = '';
    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }
    catch { rendered = String(value); }
    this.lastEvent.set(`${name}: ${rendered}`);
  }

  private functionPreset(name: string, value: unknown): unknown {
    if (value !== 'sample') return null;
    if (/comparator/i.test(name)) return () => 0;
    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');
    if (/disabled/i.test(name)) return () => false;
    if (/filter|predicate/i.test(name)) return () => true;
    return (candidate: unknown) => candidate;
  }
}
