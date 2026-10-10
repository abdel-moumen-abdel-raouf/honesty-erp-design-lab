import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpImagePicker} from '../../../controls/image-picker/image-picker';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ErpButton} from '../../../controls/button/button';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'image-picker')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "صور الصنف",
          "helperText": "أضف صورًا واضحة لبطاقة الصنف",
          "accept": "image/*",
          "maxFileSize": 2097152,
          "maxFiles": 4,
          "previewSize": "lg",
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
    "id": "previewSize",
    "label": "حجم المعاينة",
    "cases": [
      {
        "id": "previewSize-sm",
        "label": "previewSize: sm",
        "inputs": {
          "previewSize": "sm"
        }
      },
      {
        "id": "previewSize-md",
        "label": "previewSize: md",
        "inputs": {
          "previewSize": "md"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-image-picker-showcase',
  imports: [ErpImagePicker, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ReactiveFormsModule, ErpButton],
  templateUrl: './image-picker-showcase.html',
  styleUrl: './image-picker-showcase.scss',
})
export class ErpImagePickerShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': null,
  }));
  private readonly galleryControls = new Map<string, FormControl<unknown>>();
  readonly control = new FormControl<unknown>({"value":null,"disabled":false});

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
    const control = new FormControl<unknown>({value: null, disabled: Boolean(disabled)});
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

  loadSampleFiles(): void {
    this.control.setValue([new File(['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#4f46e5"/><circle cx="32" cy="32" r="18" fill="#ffffff"/></svg>'], 'صورة-الصنف.svg', {type: 'image/svg+xml', lastModified: 1})]);
  }

  recordModel(name: string, value: unknown): void {
    this.liveValues.update((current) => ({...current, [name]: value}));
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    const rendered = this.fileSummary(value);
    this.lastEvent.set(`${name}: ${rendered}`);
  }

  fileSummary(value: unknown): string {
    if (!Array.isArray(value)) return value === null ? 'لا ملفات' : String(value);
    const names = value
      .filter((entry): entry is {readonly name: string} => Boolean(entry) && typeof entry === 'object' && typeof (entry as {name?: unknown}).name === 'string')
      .map((entry) => entry.name);
    return names.length > 0 ? names.join('، ') : 'لا ملفات';
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
