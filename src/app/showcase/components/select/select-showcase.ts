import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpSelect} from '../../../controls/select/select';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ErpReviewShowcaseExactReference} from '../../../review-internals/showcase-exact-reference/showcase-exact-reference';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'select')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source"
        }
      }
    ]
  },
  {
    "id": "multiple",
    "label": "الاختيار المتعدد",
    "cases": [
      {
        "id": "multiple-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "multiple": false
        }
      },
      {
        "id": "multiple-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "multiple": true
        }
      }
    ]
  },
  {
    "id": "placement",
    "label": "المواضع",
    "cases": [
      {
        "id": "placement-bottom",
        "label": "placement: bottom",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "placement": "bottom"
        }
      },
      {
        "id": "placement-top",
        "label": "placement: top",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "placement": "top"
        }
      }
    ]
  },
  {
    "id": "selectSize",
    "label": "حجم الاختيار",
    "cases": [
      {
        "id": "selectSize-sm",
        "label": "selectSize: sm",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "selectSize": "sm"
        }
      },
      {
        "id": "selectSize-md",
        "label": "selectSize: md",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "selectSize": "md"
        }
      },
      {
        "id": "selectSize-normal",
        "label": "selectSize: normal",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "selectSize": "normal"
        }
      },
      {
        "id": "selectSize-lg",
        "label": "selectSize: lg",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "selectSize": "lg"
        }
      },
      {
        "id": "selectSize-xlg",
        "label": "selectSize: xlg",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source",
          "selectSize": "xlg"
        }
      }
    ]
  },
  {
    "id": "scenarios",
    "label": "سيناريوهات الاستخدام",
    "cases": [
      {
        "id": "sort-source",
        "label": "sort: source",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "source"
        }
      },
      {
        "id": "sort-ascending",
        "label": "sort: ascending",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "ascending"
        }
      },
      {
        "id": "sort-descending",
        "label": "sort: descending",
        "inputs": {
          "label": "الموظف المسؤول",
          "searchable": true,
          "groupBy": "group",
          "options": [
            {
              "value": "ahmed",
              "label": "أحمد محمود",
              "description": "محاسب أول — فرع القاهرة",
              "group": "المالية",
              "imageUrl": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "meta": "FIN"
            },
            {
              "value": "sara",
              "label": "سارة علي",
              "description": "مسؤولة مشتريات — فرع الإسكندرية",
              "group": "العمليات",
              "imageUrl": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "meta": "OPS"
            },
            {
              "value": "mahmoud",
              "label": "محمود حسين",
              "description": "موظف موقوف مؤقتًا",
              "group": "العمليات",
              "icon": "user",
              "disabled": true
            }
          ],
          "sort": "descending"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select-showcase',
  imports: [ErpSelect, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ReactiveFormsModule, ErpReviewShowcaseExactReference],
  templateUrl: './select-showcase.html',
  styleUrl: './select-showcase.scss',
})
export class ErpSelectShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>("ahmed");
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));
  private readonly galleryControls = new Map<string, FormControl<unknown>>();
  readonly control = new FormControl<unknown>({"value":"ahmed","disabled":false});

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
    const control = new FormControl<unknown>({value: "ahmed", disabled: Boolean(disabled)});
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
