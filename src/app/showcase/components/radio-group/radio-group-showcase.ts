import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpRadioGroup} from '../../../controls/radio-group/radio-group';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ErpButton} from '../../../controls/button/button';
import {ErpReviewRadioReference} from '../../../review-internals/review-radio-reference/review-radio-reference';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'radio-group')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ]
        }
      }
    ]
  },
  {
    "id": "variant",
    "label": "الأنماط",
    "cases": [
      {
        "id": "variant-outline",
        "label": "محاط (outline)",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "variant": "outline"
        }
      },
      {
        "id": "variant-filled",
        "label": "variant: filled",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "variant": "filled"
        }
      },
      {
        "id": "variant-soft",
        "label": "variant: soft",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "variant": "soft"
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
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "size": "sm"
        }
      },
      {
        "id": "size-md",
        "label": "size: md",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "size": "md"
        }
      },
      {
        "id": "size-lg",
        "label": "size: lg",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "size": "lg"
        }
      },
      {
        "id": "size-xl",
        "label": "size: xl",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "size": "xl"
        }
      },
      {
        "id": "size-xxl",
        "label": "size: xxl",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "size": "xxl"
        }
      },
      {
        "id": "size-xxxl",
        "label": "size: xxxl",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "size": "xxxl"
        }
      },
      {
        "id": "size-xxxxl",
        "label": "size: xxxxl",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
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
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "tone": "neutral"
        }
      },
      {
        "id": "tone-primary",
        "label": "رئيسي (primary)",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "tone": "secondary"
        }
      },
      {
        "id": "tone-accent",
        "label": "tone: accent",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "tone": "accent"
        }
      }
    ]
  },
  {
    "id": "readOnly",
    "label": "readOnly",
    "cases": [
      {
        "id": "readOnly-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "readOnly": false
        }
      },
      {
        "id": "readOnly-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "readOnly": true
        }
      }
    ]
  },
  {
    "id": "mode",
    "label": "الأوضاع",
    "cases": [
      {
        "id": "mode-radio",
        "label": "mode: radio",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "mode": "radio"
        }
      },
      {
        "id": "mode-tile",
        "label": "mode: tile",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "mode": "tile"
        }
      }
    ]
  },
  {
    "id": "states",
    "label": "الحالات",
    "cases": [
      {
        "id": "readonly",
        "label": "للقراءة فقط",
        "inputs": {
          "label": "حقل تجريبي",
          "options": [
            {
              "value": "active",
              "label": "نشط"
            }
          ],
          "readOnly": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-radio-group-showcase',
  imports: [ErpRadioGroup, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ReactiveFormsModule, ErpButton, ErpReviewRadioReference],
  templateUrl: './radio-group-showcase.html',
  styleUrl: './radio-group-showcase.scss',
})
export class ErpRadioGroupShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly referenceExpanded = signal(false);
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
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

  toggleReference(): void {
    this.referenceExpanded.update((value) => !value);
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
