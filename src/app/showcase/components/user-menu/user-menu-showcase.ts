import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpUserMenu} from '../../../controls/user-menu/user-menu';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'user-menu')!;
const USER_MENU_PRESETS: Readonly<Record<string, unknown>> = {
  "صورة محلية — متصل": {
    "displayName": "أميرة حداد",
    "secondaryText": "الحساب المؤسسي",
    "email": "amira.haddad@honesty.example",
    "roleLabel": "مديرة المالية",
    "branchLabel": "الفرع الرئيسي",
    "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
    "avatarPresence": "online"
  },
  "أحرف أولى — بعيد": {
    "displayName": "عمر ناصر",
    "secondaryText": "فريق العمليات",
    "email": "omar.nasser@honesty.example",
    "roleLabel": "مسؤول المخزون",
    "branchLabel": "فرع الإسكندرية",
    "avatarPresence": "away"
  },
  "أيقونة صريحة — مشغول": {
    "displayName": "حساب الدعم",
    "secondaryText": "هوية خدمة داخلية",
    "email": "support@honesty.example",
    "roleLabel": "دعم النظام",
    "branchLabel": "المركز الرئيسي",
    "fallbackIcon": "user",
    "avatarPresence": "busy"
  },
  "اسم عربي طويل — غير متصل": {
    "displayName": "نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية",
    "secondaryText": "إدارة سلاسل الإمداد والمشتريات",
    "email": "nadia.abdelrahman@honesty.example",
    "roleLabel": "مسؤولة المشتريات الإقليمية",
    "branchLabel": "فرع القاهرة الجديدة",
    "avatarPresence": "offline"
  },
  "اسم إنجليزي طويل — متصل": {
    "displayName": "Alexandria Regional Finance Operations Manager",
    "secondaryText": "Regional finance operations",
    "email": "alexandria.finance.manager@honesty.example",
    "roleLabel": "Finance Operations",
    "branchLabel": "Alexandria Branch",
    "avatarPresence": "online"
  },
  "اسم مختلط الاتجاه — بعيد": {
    "displayName": "ليلى Mahmoud — Procurement Operations",
    "secondaryText": "المشتريات · Regional Office",
    "email": "leila.mahmoud@honesty.example",
    "roleLabel": "Procurement Lead",
    "branchLabel": "فرع الجيزة · Giza",
    "avatarPresence": "away"
  }
};

const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "items": [
            {
              "id": "profile",
              "label": "الملف الشخصي",
              "icon": "user"
            },
            {
              "id": "settings",
              "label": "الإعدادات",
              "icon": "settings"
            },
            {
              "id": "dashboard",
              "label": "لوحة التحكم",
              "icon": "dashboard"
            },
            {
              "id": "earnings",
              "label": "الأرباح",
              "icon": "wallet"
            },
            {
              "id": "downloads",
              "label": "التنزيلات",
              "icon": "download"
            },
            {
              "id": "logout",
              "label": "تسجيل الخروج",
              "icon": "logout",
              "tone": "danger",
              "dividerBefore": true
            }
          ],
          "open": true
        }
      }
    ]
  },
  {
    "id": "showAvatar",
    "label": "عرض الصورة",
    "cases": [
      {
        "id": "showAvatar-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showAvatar": false
        }
      },
      {
        "id": "showAvatar-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showAvatar": true
        }
      }
    ]
  },
  {
    "id": "showUserName",
    "label": "عرض الاسم",
    "cases": [
      {
        "id": "showUserName-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showUserName": false
        }
      },
      {
        "id": "showUserName-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showUserName": true
        }
      }
    ]
  },
  {
    "id": "showEmail",
    "label": "عرض البريد",
    "cases": [
      {
        "id": "showEmail-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showEmail": false
        }
      },
      {
        "id": "showEmail-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showEmail": true
        }
      }
    ]
  },
  {
    "id": "showPresence",
    "label": "عرض الحضور",
    "cases": [
      {
        "id": "showPresence-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showPresence": false
        }
      },
      {
        "id": "showPresence-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showPresence": true
        }
      }
    ]
  },
  {
    "id": "showRoleBadge",
    "label": "عرض الدور",
    "cases": [
      {
        "id": "showRoleBadge-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showRoleBadge": false
        }
      },
      {
        "id": "showRoleBadge-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showRoleBadge": true
        }
      }
    ]
  },
  {
    "id": "showBranchBadge",
    "label": "عرض الفرع",
    "cases": [
      {
        "id": "showBranchBadge-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showBranchBadge": false
        }
      },
      {
        "id": "showBranchBadge-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showBranchBadge": true
        }
      }
    ]
  },
  {
    "id": "showTriggerRoleBadge",
    "label": "دور المحفز",
    "cases": [
      {
        "id": "showTriggerRoleBadge-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showTriggerRoleBadge": false
        }
      },
      {
        "id": "showTriggerRoleBadge-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showTriggerRoleBadge": true
        }
      }
    ]
  },
  {
    "id": "showTriggerBranchBadge",
    "label": "فرع المحفز",
    "cases": [
      {
        "id": "showTriggerBranchBadge-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showTriggerBranchBadge": false
        }
      },
      {
        "id": "showTriggerBranchBadge-true",
        "label": "مفعّل (true)",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          },
          "showTriggerBranchBadge": true
        }
      }
    ]
  },
  {
    "id": "scenarios",
    "label": "سيناريوهات الاستخدام",
    "cases": [
      {
        "id": "local-image-online",
        "label": "صورة محلية — متصل",
        "inputs": {
          "user": {
            "displayName": "أميرة حداد",
            "secondaryText": "الحساب المؤسسي",
            "email": "amira.haddad@honesty.example",
            "roleLabel": "مديرة المالية",
            "branchLabel": "الفرع الرئيسي",
            "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
            "avatarPresence": "online"
          }
        }
      },
      {
        "id": "initials-away",
        "label": "أحرف أولى — بعيد",
        "inputs": {
          "user": {
            "displayName": "عمر ناصر",
            "secondaryText": "فريق العمليات",
            "email": "omar.nasser@honesty.example",
            "roleLabel": "مسؤول المخزون",
            "branchLabel": "فرع الإسكندرية",
            "avatarPresence": "away"
          }
        }
      },
      {
        "id": "explicit-icon-busy",
        "label": "أيقونة صريحة — مشغول",
        "inputs": {
          "user": {
            "displayName": "حساب الدعم",
            "secondaryText": "هوية خدمة داخلية",
            "email": "support@honesty.example",
            "roleLabel": "دعم النظام",
            "branchLabel": "المركز الرئيسي",
            "fallbackIcon": "user",
            "avatarPresence": "busy"
          }
        }
      },
      {
        "id": "long-arabic-offline",
        "label": "اسم عربي طويل — غير متصل",
        "inputs": {
          "user": {
            "displayName": "نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية",
            "secondaryText": "إدارة سلاسل الإمداد والمشتريات",
            "email": "nadia.abdelrahman@honesty.example",
            "roleLabel": "مسؤولة المشتريات الإقليمية",
            "branchLabel": "فرع القاهرة الجديدة",
            "avatarPresence": "offline"
          }
        }
      },
      {
        "id": "long-english-online",
        "label": "اسم إنجليزي طويل — متصل",
        "inputs": {
          "user": {
            "displayName": "Alexandria Regional Finance Operations Manager",
            "secondaryText": "Regional finance operations",
            "email": "alexandria.finance.manager@honesty.example",
            "roleLabel": "Finance Operations",
            "branchLabel": "Alexandria Branch",
            "avatarPresence": "online"
          }
        }
      },
      {
        "id": "mixed-direction-away",
        "label": "اسم مختلط الاتجاه — بعيد",
        "inputs": {
          "user": {
            "displayName": "ليلى Mahmoud — Procurement Operations",
            "secondaryText": "المشتريات · Regional Office",
            "email": "leila.mahmoud@honesty.example",
            "roleLabel": "Procurement Lead",
            "branchLabel": "فرع الجيزة · Giza",
            "avatarPresence": "away"
          }
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-menu-showcase',
  imports: [ErpUserMenu, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './user-menu-showcase.html',
  styleUrl: './user-menu-showcase.scss',
})
export class ErpUserMenuShowcase {
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
    if (change.control.name === '$userPreset') {
      this.liveValues.update((current) => ({
        ...current,
        '$userPreset': change.value,
        user: USER_MENU_PRESETS[String(change.value)] ?? current['user'],
      }));
      return;
    }
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.liveValues.update((current) => ({...current, [change.control.name]: value}));
  }

  recordModel(name: string, value: unknown): void {
    this.liveValues.update((current) => ({...current, [name]: value}));
    if (name === 'open' && value === false && this.lastEvent().startsWith('actionActivated:')) {
      this.lastEvent.update((current) => `${current} · openChange: false`);
      return;
    }
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
