import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpIconButton} from '../../../controls/icon-button/icon-button';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpTooltip} from '../../../controls/tooltip/tooltip';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'icon-button')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings"
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "variant": "solid"
        }
      },
      {
        "id": "variant-outline",
        "label": "محاط (outline)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "variant": "outline"
        }
      },
      {
        "id": "variant-subtle",
        "label": "خافت (subtle)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "variant": "subtle"
        }
      },
      {
        "id": "variant-ghost",
        "label": "شفاف (ghost)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "shape": "default"
        }
      },
      {
        "id": "shape-rounded",
        "label": "مستدير (rounded)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "shape": "rounded"
        }
      },
      {
        "id": "shape-pill",
        "label": "shape: pill",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "secondary"
        }
      },
      {
        "id": "tone-accent",
        "label": "tone: accent",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "accent"
        }
      },
      {
        "id": "tone-success",
        "label": "نجاح (success)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "success"
        }
      },
      {
        "id": "tone-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "warning"
        }
      },
      {
        "id": "tone-danger",
        "label": "خطر (danger)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "danger"
        }
      },
      {
        "id": "tone-info",
        "label": "معلومات (info)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "tone": "info"
        }
      },
      {
        "id": "tone-neutral",
        "label": "محايد (neutral)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "loading": false
        }
      },
      {
        "id": "loading-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "cursor": "pointer"
        }
      },
      {
        "id": "cursor-default",
        "label": "افتراضي (default)",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
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
          "label": "إعدادات النظام",
          "icon": "settings",
          "disabled": true
        }
      },
      {
        "id": "loading",
        "label": "حالة تحميل",
        "inputs": {
          "label": "إعدادات النظام",
          "icon": "settings",
          "loading": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-button-showcase',
  imports: [ErpIconButton, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpTooltip],
  templateUrl: './icon-button-showcase.html',
  styleUrl: './icon-button-showcase.scss',
})
export class ErpIconButtonShowcase {
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
