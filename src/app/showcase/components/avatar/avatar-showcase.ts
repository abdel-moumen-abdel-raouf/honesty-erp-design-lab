import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpAvatar} from '../../../controls/avatar/avatar';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpReviewShowcaseExactReference} from '../../../review-internals/showcase-exact-reference/showcase-exact-reference';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'avatar')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "name": "أميرة حداد"
        }
      }
    ]
  },
  {
    "id": "size",
    "label": "الأحجام",
    "cases": [
      {
        "id": "size-xs",
        "label": "size: xs",
        "inputs": {
          "name": "أميرة حداد",
          "size": "xs"
        }
      },
      {
        "id": "size-sm",
        "label": "size: sm",
        "inputs": {
          "name": "أميرة حداد",
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "name": "أميرة حداد",
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "name": "أميرة حداد",
          "size": "lg"
        }
      },
      {
        "id": "size-xl",
        "label": "size: xl",
        "inputs": {
          "name": "أميرة حداد",
          "size": "xl"
        }
      },
      {
        "id": "size-2xl",
        "label": "size: 2xl",
        "inputs": {
          "name": "أميرة حداد",
          "size": "2xl"
        }
      },
      {
        "id": "size-3xl",
        "label": "size: 3xl",
        "inputs": {
          "name": "أميرة حداد",
          "size": "3xl"
        }
      },
      {
        "id": "size-4xl",
        "label": "size: 4xl",
        "inputs": {
          "name": "أميرة حداد",
          "size": "4xl"
        }
      },
      {
        "id": "size-5xl",
        "label": "size: 5xl",
        "inputs": {
          "name": "أميرة حداد",
          "size": "5xl"
        }
      }
    ]
  },
  {
    "id": "shape",
    "label": "الأشكال",
    "cases": [
      {
        "id": "shape-circle",
        "label": "دائري (circle)",
        "inputs": {
          "name": "أميرة حداد",
          "shape": "circle"
        }
      },
      {
        "id": "shape-rounded",
        "label": "مستدير (rounded)",
        "inputs": {
          "name": "أميرة حداد",
          "shape": "rounded"
        }
      },
      {
        "id": "shape-square",
        "label": "مربع (square)",
        "inputs": {
          "name": "أميرة حداد",
          "shape": "square"
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
          "name": "أميرة حداد",
          "tone": "neutral"
        }
      },
      {
        "id": "tone-brand",
        "label": "tone: brand",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "brand"
        }
      },
      {
        "id": "tone-success",
        "label": "نجاح (success)",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "success"
        }
      },
      {
        "id": "tone-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "warning"
        }
      },
      {
        "id": "tone-danger",
        "label": "خطر (danger)",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "danger"
        }
      },
      {
        "id": "tone-info",
        "label": "معلومات (info)",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "info"
        }
      },
      {
        "id": "tone-purple",
        "label": "tone: purple",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "purple"
        }
      },
      {
        "id": "tone-slate",
        "label": "tone: slate",
        "inputs": {
          "name": "أميرة حداد",
          "tone": "slate"
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
          "name": "أميرة حداد",
          "loading": false
        }
      },
      {
        "id": "loading-true",
        "label": "مفعّل (true)",
        "inputs": {
          "name": "أميرة حداد",
          "loading": true
        }
      }
    ]
  },
  {
    "id": "presencePosition",
    "label": "موضع الحضور",
    "cases": [
      {
        "id": "presencePosition-top",
        "label": "presencePosition: top",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "top"
        }
      },
      {
        "id": "presencePosition-bottom",
        "label": "presencePosition: bottom",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "bottom"
        }
      },
      {
        "id": "presencePosition-left",
        "label": "presencePosition: left",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "left"
        }
      },
      {
        "id": "presencePosition-right",
        "label": "presencePosition: right",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "right"
        }
      },
      {
        "id": "presencePosition-top-left",
        "label": "presencePosition: top-left",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "top-left"
        }
      },
      {
        "id": "presencePosition-top-right",
        "label": "presencePosition: top-right",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "top-right"
        }
      },
      {
        "id": "presencePosition-bottom-left",
        "label": "presencePosition: bottom-left",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "bottom-left"
        }
      },
      {
        "id": "presencePosition-bottom-right",
        "label": "presencePosition: bottom-right",
        "inputs": {
          "name": "أميرة حداد",
          "presencePosition": "bottom-right"
        }
      }
    ]
  },
  {
    "id": "presenceMotion",
    "label": "حركة الحضور",
    "cases": [
      {
        "id": "presenceMotion-none",
        "label": "بدون (none)",
        "inputs": {
          "name": "أميرة حداد",
          "presenceMotion": "none"
        }
      },
      {
        "id": "presenceMotion-pulse",
        "label": "presenceMotion: pulse",
        "inputs": {
          "name": "أميرة حداد",
          "presenceMotion": "pulse"
        }
      },
      {
        "id": "presenceMotion-ping",
        "label": "presenceMotion: ping",
        "inputs": {
          "name": "أميرة حداد",
          "presenceMotion": "ping"
        }
      },
      {
        "id": "presenceMotion-bounce",
        "label": "presenceMotion: bounce",
        "inputs": {
          "name": "أميرة حداد",
          "presenceMotion": "bounce"
        }
      },
      {
        "id": "presenceMotion-blink",
        "label": "presenceMotion: blink",
        "inputs": {
          "name": "أميرة حداد",
          "presenceMotion": "blink"
        }
      },
      {
        "id": "presenceMotion-breathe",
        "label": "presenceMotion: breathe",
        "inputs": {
          "name": "أميرة حداد",
          "presenceMotion": "breathe"
        }
      }
    ]
  },
  {
    "id": "hoverMotion",
    "label": "حركة المرور",
    "cases": [
      {
        "id": "hoverMotion-none",
        "label": "بدون (none)",
        "inputs": {
          "name": "أميرة حداد",
          "hoverMotion": "none"
        }
      },
      {
        "id": "hoverMotion-scale",
        "label": "hoverMotion: scale",
        "inputs": {
          "name": "أميرة حداد",
          "hoverMotion": "scale"
        }
      },
      {
        "id": "hoverMotion-lift",
        "label": "hoverMotion: lift",
        "inputs": {
          "name": "أميرة حداد",
          "hoverMotion": "lift"
        }
      }
    ]
  },
  {
    "id": "cursor",
    "label": "المؤشر",
    "cases": [
      {
        "id": "cursor-default",
        "label": "افتراضي (default)",
        "inputs": {
          "name": "أميرة حداد",
          "cursor": "default"
        }
      },
      {
        "id": "cursor-pointer",
        "label": "cursor: pointer",
        "inputs": {
          "name": "أميرة حداد",
          "cursor": "pointer"
        }
      }
    ]
  },
  {
    "id": "states",
    "label": "الحالات",
    "cases": [
      {
        "id": "loading",
        "label": "حالة تحميل",
        "inputs": {
          "name": "أميرة حداد",
          "loading": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-avatar-showcase',
  imports: [ErpAvatar, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpReviewShowcaseExactReference],
  templateUrl: './avatar-showcase.html',
  styleUrl: './avatar-showcase.scss',
})
export class ErpAvatarShowcase {
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
