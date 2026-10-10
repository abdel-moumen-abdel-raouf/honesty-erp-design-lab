import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpText} from '../../../primitives/text/text';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'text')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {}
      }
    ]
  },
  {
    "id": "size",
    "label": "الأحجام",
    "cases": [
      {
        "id": "size-auto",
        "label": "تلقائي (auto)",
        "inputs": {
          "size": "auto"
        }
      },
      {
        "id": "size-inherit",
        "label": "size: inherit",
        "inputs": {
          "size": "inherit"
        }
      },
      {
        "id": "size-2xs",
        "label": "size: 2xs",
        "inputs": {
          "size": "2xs"
        }
      },
      {
        "id": "size-xs",
        "label": "size: xs",
        "inputs": {
          "size": "xs"
        }
      },
      {
        "id": "size-sm",
        "label": "size: sm",
        "inputs": {
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "size": "md"
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
        "id": "size-2xl",
        "label": "size: 2xl",
        "inputs": {
          "size": "2xl"
        }
      },
      {
        "id": "size-3xl",
        "label": "size: 3xl",
        "inputs": {
          "size": "3xl"
        }
      },
      {
        "id": "size-4xl",
        "label": "size: 4xl",
        "inputs": {
          "size": "4xl"
        }
      },
      {
        "id": "size-5xl",
        "label": "size: 5xl",
        "inputs": {
          "size": "5xl"
        }
      }
    ]
  },
  {
    "id": "tone",
    "label": "النبرات",
    "cases": [
      {
        "id": "tone-auto",
        "label": "تلقائي (auto)",
        "inputs": {
          "tone": "auto"
        }
      },
      {
        "id": "tone-inherit",
        "label": "tone: inherit",
        "inputs": {
          "tone": "inherit"
        }
      },
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
        "id": "tone-muted",
        "label": "tone: muted",
        "inputs": {
          "tone": "muted"
        }
      },
      {
        "id": "tone-disabled",
        "label": "tone: disabled",
        "inputs": {
          "tone": "disabled"
        }
      },
      {
        "id": "tone-inverse",
        "label": "tone: inverse",
        "inputs": {
          "tone": "inverse"
        }
      },
      {
        "id": "tone-brand-primary",
        "label": "tone: brand-primary",
        "inputs": {
          "tone": "brand-primary"
        }
      },
      {
        "id": "tone-brand-secondary",
        "label": "tone: brand-secondary",
        "inputs": {
          "tone": "brand-secondary"
        }
      },
      {
        "id": "tone-brand-accent",
        "label": "tone: brand-accent",
        "inputs": {
          "tone": "brand-accent"
        }
      },
      {
        "id": "tone-success",
        "label": "نجاح (success)",
        "inputs": {
          "tone": "success"
        }
      },
      {
        "id": "tone-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "tone": "warning"
        }
      },
      {
        "id": "tone-danger",
        "label": "خطر (danger)",
        "inputs": {
          "tone": "danger"
        }
      },
      {
        "id": "tone-info",
        "label": "معلومات (info)",
        "inputs": {
          "tone": "info"
        }
      }
    ]
  },
  {
    "id": "align",
    "label": "المحاذاة",
    "cases": [
      {
        "id": "align-inherit",
        "label": "align: inherit",
        "inputs": {
          "align": "inherit"
        }
      },
      {
        "id": "align-start",
        "label": "البداية (start)",
        "inputs": {
          "align": "start"
        }
      },
      {
        "id": "align-center",
        "label": "الوسط (center)",
        "inputs": {
          "align": "center"
        }
      },
      {
        "id": "align-end",
        "label": "النهاية (end)",
        "inputs": {
          "align": "end"
        }
      },
      {
        "id": "align-justify",
        "label": "align: justify",
        "inputs": {
          "align": "justify"
        }
      }
    ]
  },
  {
    "id": "wrap",
    "label": "الالتفاف",
    "cases": [
      {
        "id": "wrap-auto",
        "label": "تلقائي (auto)",
        "inputs": {
          "wrap": "auto"
        }
      },
      {
        "id": "wrap-normal",
        "label": "wrap: normal",
        "inputs": {
          "wrap": "normal"
        }
      },
      {
        "id": "wrap-nowrap",
        "label": "wrap: nowrap",
        "inputs": {
          "wrap": "nowrap"
        }
      },
      {
        "id": "wrap-pre",
        "label": "wrap: pre",
        "inputs": {
          "wrap": "pre"
        }
      },
      {
        "id": "wrap-pre-wrap",
        "label": "wrap: pre-wrap",
        "inputs": {
          "wrap": "pre-wrap"
        }
      },
      {
        "id": "wrap-break-spaces",
        "label": "wrap: break-spaces",
        "inputs": {
          "wrap": "break-spaces"
        }
      }
    ]
  },
  {
    "id": "direction",
    "label": "الاتجاه النصي",
    "cases": [
      {
        "id": "direction-inherit",
        "label": "direction: inherit",
        "inputs": {
          "direction": "inherit"
        }
      },
      {
        "id": "direction-auto",
        "label": "تلقائي (auto)",
        "inputs": {
          "direction": "auto"
        }
      },
      {
        "id": "direction-rtl",
        "label": "direction: rtl",
        "inputs": {
          "direction": "rtl"
        }
      },
      {
        "id": "direction-ltr",
        "label": "direction: ltr",
        "inputs": {
          "direction": "ltr"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text-showcase',
  imports: [ErpText, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface],
  templateUrl: './text-showcase.html',
  styleUrl: './text-showcase.scss',
})
export class ErpTextShowcase {
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
