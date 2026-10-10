import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpUrlBox} from '../../../controls/url-box/url-box';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'url-box')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "موقع المورد",
          "helperText": "رابط HTTPS المعتمد",
          "clearable": true
        }
      }
    ]
  },
  {
    "id": "disabled",
    "label": "disabled",
    "cases": [
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "disabled": true
        }
      }
    ]
  },
  {
    "id": "tone",
    "label": "النبرات",
    "cases": [
      {
        "id": "tone-primary",
        "label": "رئيسي (primary)",
        "inputs": {
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "tone": "secondary"
        }
      },
      {
        "id": "tone-accent",
        "label": "tone: accent",
        "inputs": {
          "tone": "accent"
        }
      }
    ]
  },
  {
    "id": "status",
    "label": "حالات التحقق",
    "cases": [
      {
        "id": "status-success",
        "label": "نجاح (success)",
        "inputs": {
          "status": "success"
        }
      },
      {
        "id": "status-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "status": "warning"
        }
      },
      {
        "id": "status-danger",
        "label": "خطر (danger)",
        "inputs": {
          "status": "danger"
        }
      },
      {
        "id": "status-info",
        "label": "معلومات (info)",
        "inputs": {
          "status": "info"
        }
      }
    ]
  },
  {
    "id": "variant",
    "label": "الأنماط",
    "cases": [
      {
        "id": "variant-solid",
        "label": "صلب (solid)",
        "inputs": {
          "variant": "solid"
        }
      },
      {
        "id": "variant-subtle",
        "label": "خافت (subtle)",
        "inputs": {
          "variant": "subtle"
        }
      },
      {
        "id": "variant-ghost",
        "label": "شفاف (ghost)",
        "inputs": {
          "variant": "ghost"
        }
      },
      {
        "id": "variant-text",
        "label": "نصي (text)",
        "inputs": {
          "variant": "text"
        }
      }
    ]
  },
  {
    "id": "borderMode",
    "label": "أنماط الحدود",
    "cases": [
      {
        "id": "borderMode-dashed",
        "label": "borderMode: dashed",
        "inputs": {
          "borderMode": "dashed"
        }
      },
      {
        "id": "borderMode-underline",
        "label": "borderMode: underline",
        "inputs": {
          "borderMode": "underline"
        }
      }
    ]
  },
  {
    "id": "shape",
    "label": "الأشكال",
    "cases": [
      {
        "id": "shape-rounded",
        "label": "مستدير (rounded)",
        "inputs": {
          "shape": "rounded"
        }
      },
      {
        "id": "shape-pill",
        "label": "shape: pill",
        "inputs": {
          "shape": "pill"
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
          "size": "sm"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "size": "lg"
        }
      },
      {
        "id": "size-xl",
        "label": "size: xl",
        "inputs": {
          "size": "xl"
        }
      },
      {
        "id": "size-xxl",
        "label": "size: xxl",
        "inputs": {
          "size": "xxl"
        }
      },
      {
        "id": "size-xxxl",
        "label": "size: xxxl",
        "inputs": {
          "size": "xxxl"
        }
      },
      {
        "id": "size-xxxxl",
        "label": "size: xxxxl",
        "inputs": {
          "size": "xxxxl"
        }
      }
    ]
  },
  {
    "id": "appearance",
    "label": "المظهر",
    "cases": [
      {
        "id": "appearance-glass",
        "label": "appearance: glass",
        "inputs": {
          "appearance": "glass"
        }
      }
    ]
  },
  {
    "id": "labelMode",
    "label": "موضع التسمية",
    "cases": [
      {
        "id": "labelMode-floating",
        "label": "labelMode: floating",
        "inputs": {
          "labelMode": "floating"
        }
      },
      {
        "id": "labelMode-visually-hidden",
        "label": "labelMode: visually-hidden",
        "inputs": {
          "labelMode": "visually-hidden"
        }
      }
    ]
  },
  {
    "id": "readonly",
    "label": "للقراءة فقط",
    "cases": [
      {
        "id": "readonly-true",
        "label": "مفعّل (true)",
        "inputs": {
          "readonly": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-url-box-showcase',
  imports: [ErpUrlBox, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ReactiveFormsModule],
  templateUrl: './url-box-showcase.html',
  styleUrl: './url-box-showcase.scss',
})
export class ErpUrlBoxShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>("https://honesty-erp.example");
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));
  private readonly galleryControls = new Map<string, FormControl<unknown>>();
  readonly control = new FormControl<unknown>({"value":"https://honesty-erp.example","disabled":false});

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
    const control = new FormControl<unknown>({value: "https://honesty-erp.example", disabled: Boolean(disabled)});
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
