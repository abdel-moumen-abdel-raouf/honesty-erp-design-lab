export const REOPENED_COMPONENTS = new Map([
  ['ErpEmptyState', 'Product Owner withdrew the earlier accelerated acceptance; the exact candidate remains reopened.'],
  ['ErpSelect', 'The first exact-reference candidate was rejected; V3 remains pending review.'],
  ['ErpTabs', 'The 302056ad candidate was rejected; the literal reconstruction remains pending review.'],
  ['ErpTable', 'The eddac4a8 candidate was rejected; the full reference experience remains pending review.'],
  ['ErpUserMenu', 'Multiple trigger candidates were rejected; the current three-row candidate remains pending review.'],
]);

export const SKODASH_REFERENCE_URLS = Object.freeze({
  buttons: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-buttons.html',
  alerts: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-alerts.html',
  navigation: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-navs-tabs.html',
  shell: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/index.html',
});

export const REVIEW_EVIDENCE = new Map([
  ['ErpButton', {
    referenceImage: '/review-evidence/erp-button-family/v1-internal-review/reference-skodash-buttons-1440-rtl.png',
    implementationImage: '/review-evidence/erp-button-family/v1-internal-review/button-1440-light-rtl-configured.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpIconButton', {
    referenceImage: '/review-evidence/erp-button-family/v1-internal-review/reference-skodash-buttons-1440-rtl.png',
    implementationImage: '/review-evidence/erp-button-family/v1-internal-review/icon-button-1440-light-rtl-configured.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpButtonGroup', {
    referenceImage: '/review-evidence/erp-grouped-actions/v1-internal-review/reference-skodash-button-groups-1440-rtl.png',
    implementationImage: null,
    viewport: '1440px · RTL · Light',
  }],
  ['ErpSplitButton', {
    referenceImage: '/review-evidence/erp-grouped-actions/v1-internal-review/reference-skodash-dropdown-buttons-1440-rtl.png',
    implementationImage: null,
    viewport: '1440px · RTL · Light',
  }],
  ['ErpFab', {
    referenceImage: '/review-evidence/erp-floating-actions/v1-internal-review/reference-skodash-buttons-fallback-1440-rtl.png',
    implementationImage: '/review-evidence/erp-floating-actions/v1-internal-review/fab-1440-light-rtl-start.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpExtendedFab', {
    referenceImage: '/review-evidence/erp-floating-actions/v1-internal-review/reference-skodash-buttons-fallback-1440-rtl.png',
    implementationImage: '/review-evidence/erp-floating-actions/v1-internal-review/extended-fab-1440-light-ltr-end.png',
    viewport: '1440px · LTR · Light',
  }],
  ['ErpFabMenu', {
    referenceImage: '/review-evidence/erp-floating-actions/v1-internal-review/reference-skodash-buttons-fallback-1440-rtl.png',
    implementationImage: '/review-evidence/erp-floating-actions/v1-internal-review/fab-menu-1440-light-rtl-open.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpAlert', {
    referenceImage: '/review-evidence/erp-feedback/alert-skeleton-v1-internal-review/reference-skodash-alerts-1440-rtl.png',
    implementationImage: '/review-evidence/erp-feedback/alert-skeleton-v1-internal-review/alert-info-1440-light-rtl.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpBreadcrumbs', {
    referenceImage: '/review-evidence/erp-navigation/navigation-v1-internal-review/reference-skodash-breadcrumb-1280-rtl-crop.png',
    implementationImage: null,
    viewport: '1280px · RTL',
  }],
  ['ErpPagination', {
    referenceImage: '/review-evidence/erp-navigation/navigation-v1-internal-review/reference-skodash-pagination-1280-rtl-crop.png',
    implementationImage: null,
    viewport: '1280px · RTL',
  }],
  ['ErpTooltip', {
    referenceImage: '/review-evidence/erp-tooltip/v1-internal-review/reference-material3-tooltip-1440.png',
    implementationImage: null,
    viewport: '1440px',
  }],
  ['ErpAvatar', {
    referenceImage: '/review-evidence/erp-avatar/v1-internal-review/reference-1440-light-rtl-crop.png',
    implementationImage: '/review-evidence/erp-avatar/v1-internal-review/implementation-1440-light-rtl-exact-crop.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpAvatarPicker', {
    referenceImage: '/review-evidence/erp-avatar-picker/v1-internal-review/reference-1440-light-rtl-default-picker.png',
    implementationImage: '/review-evidence/erp-avatar-picker/v1-internal-review/implementation-1440-light-rtl-default-picker.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpSelect', {
    referenceImage: '/review-evidence/erp-select/v3-internal-review/reference-1440-light-ltr-open.png',
    implementationImage: '/review-evidence/erp-select/v3-internal-review/implementation-1440-light-ltr-open.png',
    viewport: '1440px · LTR · Light · Open',
  }],
  ['ErpStatusBadge', {
    referenceImage: '/review-evidence/erp-status-badge/v1-internal-review/reference-1440-light-rtl-matrix-view.png',
    implementationImage: '/review-evidence/erp-status-badge/v1-internal-review/implementation-1440-light-rtl-exact-matrix-view.png',
    viewport: '1440px · RTL · Light · Matrix',
  }],
  ['ErpTabs', {
    referenceImage: '/review-evidence/erp-tabs/v1-internal-review/reference-1440-light-rtl.png',
    implementationImage: '/review-evidence/erp-tabs/v1-internal-review/implementation-1440-light-rtl-exact.png',
    viewport: '1440px · RTL · Light',
  }],
  ['ErpTable', {
    referenceImage: '/review-evidence/erp-table/v2-internal-review/reference-full-1440-light-rtl-crop.png',
    implementationImage: '/review-evidence/erp-table/v2-internal-review/implementation-full-featured-1440-light-rtl-crop.png',
    viewport: '1440px · RTL · Light · Full experience',
  }],
  ['ErpUserMenu', {
    referenceImage: '/review-evidence/erp-user-menu/v3-internal-review/reference-skodash-1440-light-rtl-open-crop.png',
    implementationImage: '/review-evidence/erp-user-menu/v3-internal-review/corrected-light-rtl-1440-default-open-crop.png',
    viewport: '1440px · RTL · Light · Open',
  }],
  ['ErpAppShell', {
    referenceImage: null,
    implementationImage: '/review-evidence/erp-shell/autonomous-app-shell-wave/integrated-1440-light-rtl.png',
    viewport: '1440px · RTL · Light',
  }],
]);

const ACTION_CLASSES = new Set([
  'ErpButton', 'ErpButtonGroup', 'ErpExtendedFab', 'ErpFab', 'ErpFabMenu',
  'ErpIconButton', 'ErpSplitButton',
]);
const SHELL_CLASSES = new Set([
  'ErpAppFooter', 'ErpApplicationsMenu', 'ErpAppShell', 'ErpBranchSelector',
  'ErpGlobalSearch', 'ErpMessagesMenu', 'ErpNotificationBell',
  'ErpQuickActionsBar', 'ErpSidebar', 'ErpTopbar', 'ErpUserMenu',
]);

export function reviewReferenceFor(entry) {
  const registeredEvidence = REVIEW_EVIDENCE.get(entry.className) ?? {};
  const publishImage = (imagePath) => imagePath
    ? imagePath.replace('/review-evidence/', '/assets/review-evidence/')
    : null;
  const evidence = {
    ...registeredEvidence,
    referenceImage: publishImage(registeredEvidence.referenceImage),
    implementationImage: publishImage(registeredEvidence.implementationImage),
  };
  if (entry.visualReference) {
    return {
      kind: 'exact-local',
      label: 'مرجع Product Owner دقيق',
      source: entry.visualReference,
      sourceUrl: null,
      capturedAt: '2026-10-10',
      referenceImage: evidence.referenceImage ?? null,
      implementationImage: evidence.implementationImage ?? null,
      viewport: evidence.viewport ?? null,
      note: evidence.referenceImage
        ? 'لقطة مرجعية ملتزمة محفوظة مع دليل التنفيذ.'
        : 'مصدر العقد متاح، لكن لا توجد لقطة مرجعية قابلة للعرض مسجلة لهذا المكوّن.',
    };
  }
  if (ACTION_CLASSES.has(entry.className)) {
    return {
      kind: 'external-skodash', label: 'مرجع Skodash RTL استرشادي',
      source: SKODASH_REFERENCE_URLS.buttons, sourceUrl: SKODASH_REFERENCE_URLS.buttons,
      capturedAt: '2026-10-10', referenceImage: evidence.referenceImage ?? null,
      implementationImage: evidence.implementationImage ?? null,
      viewport: evidence.viewport ?? null,
      note: 'مرجع عرض عام للأزرار؛ لا يُقدَّم كعقد دقيق للمكوّن.',
    };
  }
  if (entry.className === 'ErpAlert') {
    return {
      kind: 'external-skodash', label: 'مرجع Skodash RTL استرشادي',
      source: SKODASH_REFERENCE_URLS.alerts, sourceUrl: SKODASH_REFERENCE_URLS.alerts,
      capturedAt: '2026-10-10', referenceImage: evidence.referenceImage ?? null,
      implementationImage: evidence.implementationImage ?? null,
      viewport: evidence.viewport ?? null,
      note: 'مرجع عرض للتنبيهات مع بقاء ألوان وخطوط Honesty ERP.',
    };
  }
  if (['ErpBreadcrumbs', 'ErpPagination'].includes(entry.className)) {
    return {
      kind: 'external-skodash', label: 'مرجع Skodash RTL استرشادي',
      source: SKODASH_REFERENCE_URLS.navigation, sourceUrl: SKODASH_REFERENCE_URLS.navigation,
      capturedAt: '2026-10-10', referenceImage: evidence.referenceImage ?? null,
      implementationImage: evidence.implementationImage ?? null,
      viewport: evidence.viewport ?? null,
      note: 'مرجع عرض عام للتنقل؛ لا يعلو على عقد ERP خاص.',
    };
  }
  if (SHELL_CLASSES.has(entry.className)) {
    return {
      kind: 'external-skodash', label: 'مرجع Skodash RTL لإطار التطبيق',
      source: SKODASH_REFERENCE_URLS.shell, sourceUrl: SKODASH_REFERENCE_URLS.shell,
      capturedAt: '2026-10-10', referenceImage: evidence.referenceImage ?? null,
      implementationImage: evidence.implementationImage ?? null,
      viewport: evidence.viewport ?? null,
      note: evidence.referenceImage
        ? 'الدليل المتاح معروض دون تضمين vendor runtime.'
        : 'رابط المصدر متاح، ولا توجد لقطة أصلية مشروعة مسجلة لهذا المالك.',
    };
  }
  return {
    kind: 'original-honesty',
    label: 'تصميم Honesty ERP أصلي',
    source: 'لا يوجد مرجع خارجي ملزم مسجل.',
    sourceUrl: null,
    capturedAt: '2026-10-10',
    referenceImage: null,
    implementationImage: evidence.implementationImage ?? null,
    viewport: evidence.viewport ?? null,
    note: 'مرشح Honesty ERP أصلي؛ لا تُختلق له صورة مرجعية.',
  };
}

export function reviewStatusFor(entry) {
  if (entry.visualStatus === 'ACCEPTED') {
    return {kind: 'accepted-frozen', label: 'مقبول ومجمّد', note: 'قبول Product Owner صريح.'};
  }
  if (REOPENED_COMPONENTS.has(entry.className)) {
    return {kind: 'reopened', label: 'معاد فتحه', note: REOPENED_COMPONENTS.get(entry.className)};
  }
  return {
    kind: 'pending-unknown',
    label: 'بانتظار مراجعة Product Owner',
    note: 'التحقق التقني والمراجعة الداخلية لا يساويان قبول Product Owner.',
  };
}
