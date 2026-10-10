import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpButton} from '../../../controls/button/button';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'button')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد"
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
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "variant": "solid"
        }
      },
      {
        "id": "variant-outline",
        "label": "محاط (outline)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "variant": "outline"
        }
      },
      {
        "id": "variant-subtle",
        "label": "خافت (subtle)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "variant": "subtle"
        }
      },
      {
        "id": "variant-ghost",
        "label": "شفاف (ghost)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "variant": "ghost"
        }
      },
      {
        "id": "variant-text",
        "label": "نصي (text)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "variant": "text"
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
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "size": "lg"
        }
      }
    ]
  },
  {
    "id": "shape",
    "label": "الأشكال",
    "cases": [
      {
        "id": "shape-default",
        "label": "افتراضي (default)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "shape": "default"
        }
      },
      {
        "id": "shape-rounded",
        "label": "مستدير (rounded)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "shape": "rounded"
        }
      },
      {
        "id": "shape-pill",
        "label": "shape: pill",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
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
        "id": "tone-primary",
        "label": "رئيسي (primary)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "secondary"
        }
      },
      {
        "id": "tone-accent",
        "label": "tone: accent",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "accent"
        }
      },
      {
        "id": "tone-success",
        "label": "نجاح (success)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "success"
        }
      },
      {
        "id": "tone-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "warning"
        }
      },
      {
        "id": "tone-danger",
        "label": "خطر (danger)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "danger"
        }
      },
      {
        "id": "tone-info",
        "label": "معلومات (info)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "info"
        }
      },
      {
        "id": "tone-neutral",
        "label": "محايد (neutral)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "tone": "neutral"
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
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
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
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "loading": false
        }
      },
      {
        "id": "loading-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
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
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "cursor": "pointer"
        }
      },
      {
        "id": "cursor-default",
        "label": "افتراضي (default)",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
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
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "disabled": true
        }
      },
      {
        "id": "loading",
        "label": "حالة تحميل",
        "inputs": {
          "label": "اعتماد طلب الشراء",
          "icon": "check-mark",
          "loadingLabel": "جارٍ الاعتماد",
          "loading": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button-showcase',
  imports: [ErpButton, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './button-showcase.html',
  styleUrl: './button-showcase.scss',
})
export class ErpButtonShowcase {
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
