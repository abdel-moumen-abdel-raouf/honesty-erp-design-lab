import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpStatusBadge} from '../../../controls/status-badge/status-badge';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpReviewShowcaseExactReference} from '../../../review-internals/showcase-exact-reference/showcase-exact-reference';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'status-badge')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "نشط"
        }
      }
    ]
  },
  {
    "id": "variant",
    "label": "الأنماط",
    "cases": [
      {
        "id": "variant-soft",
        "label": "variant: soft",
        "inputs": {
          "label": "نشط",
          "variant": "soft"
        }
      },
      {
        "id": "variant-solid",
        "label": "صلب (solid)",
        "inputs": {
          "label": "نشط",
          "variant": "solid"
        }
      },
      {
        "id": "variant-outline",
        "label": "محاط (outline)",
        "inputs": {
          "label": "نشط",
          "variant": "outline"
        }
      },
      {
        "id": "variant-ghost",
        "label": "شفاف (ghost)",
        "inputs": {
          "label": "نشط",
          "variant": "ghost"
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
          "label": "نشط",
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "label": "نشط",
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "label": "نشط",
          "size": "lg"
        }
      },
      {
        "id": "size-xl",
        "label": "size: xl",
        "inputs": {
          "label": "نشط",
          "size": "xl"
        }
      }
    ]
  },
  {
    "id": "shape",
    "label": "الأشكال",
    "cases": [
      {
        "id": "shape-square",
        "label": "مربع (square)",
        "inputs": {
          "label": "نشط",
          "shape": "square"
        }
      },
      {
        "id": "shape-rounded",
        "label": "مستدير (rounded)",
        "inputs": {
          "label": "نشط",
          "shape": "rounded"
        }
      },
      {
        "id": "shape-pill",
        "label": "shape: pill",
        "inputs": {
          "label": "نشط",
          "shape": "pill"
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
          "label": "نشط",
          "tone": "neutral"
        }
      },
      {
        "id": "tone-success",
        "label": "نجاح (success)",
        "inputs": {
          "label": "نشط",
          "tone": "success"
        }
      },
      {
        "id": "tone-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "label": "نشط",
          "tone": "warning"
        }
      },
      {
        "id": "tone-danger",
        "label": "خطر (danger)",
        "inputs": {
          "label": "نشط",
          "tone": "danger"
        }
      },
      {
        "id": "tone-info",
        "label": "معلومات (info)",
        "inputs": {
          "label": "نشط",
          "tone": "info"
        }
      },
      {
        "id": "tone-brand",
        "label": "tone: brand",
        "inputs": {
          "label": "نشط",
          "tone": "brand"
        }
      },
      {
        "id": "tone-pending",
        "label": "tone: pending",
        "inputs": {
          "label": "نشط",
          "tone": "pending"
        }
      },
      {
        "id": "tone-archived",
        "label": "tone: archived",
        "inputs": {
          "label": "نشط",
          "tone": "archived"
        }
      }
    ]
  },
  {
    "id": "widthMode",
    "label": "العرض",
    "cases": [
      {
        "id": "widthMode-content",
        "label": "widthMode: content",
        "inputs": {
          "label": "نشط",
          "widthMode": "content"
        }
      },
      {
        "id": "widthMode-stretch",
        "label": "ممتد (stretch)",
        "inputs": {
          "label": "نشط",
          "widthMode": "stretch"
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
          "label": "نشط",
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "نشط",
          "disabled": true
        }
      }
    ]
  },
  {
    "id": "selected",
    "label": "الاختيار",
    "cases": [
      {
        "id": "selected-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "label": "نشط",
          "selected": false
        }
      },
      {
        "id": "selected-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "نشط",
          "selected": true
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
          "label": "نشط",
          "disabled": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-status-badge-showcase',
  imports: [ErpStatusBadge, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpReviewShowcaseExactReference],
  templateUrl: './status-badge-showcase.html',
  styleUrl: './status-badge-showcase.scss',
})
export class ErpStatusBadgeShowcase {
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
