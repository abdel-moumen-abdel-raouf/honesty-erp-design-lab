import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpFab} from '../../../controls/fab/fab';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpTooltip} from '../../../controls/tooltip/tooltip';
import {ErpReviewShowcaseFloatingPreview} from '../../../review-internals/showcase-floating-preview/showcase-floating-preview';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'fab')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "إضافة",
          "icon": "add"
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
          "label": "إضافة",
          "icon": "add",
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "size": "lg"
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
          "label": "إضافة",
          "icon": "add",
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "tone": "secondary"
        }
      },
      {
        "id": "tone-accent",
        "label": "tone: accent",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "tone": "accent"
        }
      },
      {
        "id": "tone-surface",
        "label": "tone: surface",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "tone": "surface"
        }
      }
    ]
  },
  {
    "id": "disabled",
    "label": "disabled",
    "cases": [
      {
        "id": "disabled-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "disabled": true
        }
      }
    ]
  },
  {
    "id": "loading",
    "label": "loading",
    "cases": [
      {
        "id": "loading-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "loading": false
        }
      },
      {
        "id": "loading-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "loading": true
        }
      }
    ]
  },
  {
    "id": "cursor",
    "label": "المؤشر",
    "cases": [
      {
        "id": "cursor-pointer",
        "label": "cursor: pointer",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "cursor": "pointer"
        }
      },
      {
        "id": "cursor-default",
        "label": "افتراضي (default)",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "cursor": "default"
        }
      }
    ]
  },
  {
    "id": "states",
    "label": "الحالات",
    "cases": [
      {
        "id": "disabled",
        "label": "حالة معطلة",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "disabled": true
        }
      },
      {
        "id": "loading",
        "label": "حالة تحميل",
        "inputs": {
          "label": "إضافة",
          "icon": "add",
          "loading": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fab-showcase',
  imports: [ErpFab, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpTooltip, ErpReviewShowcaseFloatingPreview],
  templateUrl: './fab-showcase.html',
  styleUrl: './fab-showcase.scss',
})
export class ErpFabShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));

  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));
  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));
  readonly previewDirection = computed(() => this.liveValues()['$previewDirection'] === 'ltr' ? 'ltr' : 'rtl');

  value(name: string): unknown {
    return this.liveValues()[name];
  }

  galleryValue(showcaseCase: {readonly inputs: Readonly<Record<string, unknown>>}, name: string): unknown {
    if (name === 'open') return false;
    return Object.prototype.hasOwnProperty.call(showcaseCase.inputs, name)
      ? showcaseCase.inputs[name]
      : ENTRY.showcaseInitialValues?.[name];
  }

  applyControl(change: ErpShowcaseControlChange): void {
    if (change.control.source === 'cva') {
      this.cvaValue.set(change.value);
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
