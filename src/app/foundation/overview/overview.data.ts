export interface FoundationOverviewReviewLink {
  readonly label: string;
  readonly route: string;
}

export interface FoundationOverviewDomain {
  readonly id: string;
  readonly arabicLabel: string;
  readonly status: string;
  readonly reviewLinks: readonly FoundationOverviewReviewLink[];
  readonly summary: string;
  readonly reopenTrigger: string;
  readonly note?: string;
}

export const FOUNDATION_OVERVIEW_DOMAINS: readonly FoundationOverviewDomain[] = [
  {
    id: 'colors',
    arabicLabel: 'الألوان',
    status: 'Approved in principle',
    reviewLinks: [
      {label: 'الألوان المرجعية', route: '/foundation/colors'},
      {label: 'صبغات الحالات', route: '/foundation/colors/status-hues'},
    ],
    summary:
      'Reference Neutral, Primary, Secondary, Accent, and status hue palettes are established.',
    reopenTrigger:
      'Reopen only by explicit Product Owner decision to change the product brand palette or when concrete contrast evidence invalidates the current mapping.',
  },
  {
    id: 'themes-feedback-surfaces',
    arabicLabel: 'السمات والأسطح والحالات',
    status: 'Approved in principle',
    reviewLinks: [
      {label: 'السمات الفاتحة والداكنة', route: '/foundation/themes'},
      {label: 'ألوان الحالات الدلالية', route: '/foundation/feedback-colors'},
    ],
    summary:
      'Light/Dark surfaces, text, borders, primary action, inverse surfaces, feedback roles, and Brand roles are established.',
    reopenTrigger:
      'Only if real Shell/component usage exposes a concrete contrast/hierarchy problem.',
    note:
      'Surface evidence is intentionally consolidated into the Themes review at /foundation/themes instead of creating a duplicate Surfaces route. Surface review is consolidated there because the same Light/Dark Surface hierarchy has already been reviewed there.',
  },
  {
    id: 'typography',
    arabicLabel: 'الطباعة',
    status: 'Approved in principle',
    reviewLinks: [{label: 'الطباعة', route: '/foundation/typography'}],
    summary:
      'Tajawal + Space Grotesk, shared 400/500/700 weights, and nine Semantic roles are established.',
    reopenTrigger:
      'Contextual revalidation is allowed in dense Forms/Tables; a shared letter-spacing/tracking or production monospace contract requires explicit Foundation reopen.',
  },
  {
    id: 'charts',
    arabicLabel: 'ألوان الرسوم البيانية',
    status: 'Approved in principle',
    reviewLinks: [{label: 'ألوان الرسوم البيانية', route: '/foundation/charts'}],
    summary:
      'Five categorical Chart series, status/delta colors and structural Chart colors are established for Light/Dark.',
    reopenTrigger:
      'Exceeding five concurrent categorical series or changing categorical palette mappings requires explicit Product Owner reopen.',
  },
  {
    id: 'preferences',
    arabicLabel: 'التفضيلات',
    status: 'Approved in principle',
    reviewLinks: [{label: 'التفضيلات', route: '/foundation/preferences'}],
    summary:
      'Typed 11-setting Preferences core, local persistence and deterministic formatting contracts are established.',
    reopenTrigger:
      'Production-global application and backend persistence remain deferred.',
  },
  {
    id: 'spacing',
    arabicLabel: 'المسافات',
    status: 'Approved in principle',
    reviewLinks: [{label: 'المسافات', route: '/foundation/spacing'}],
    summary:
      '4px Reference grid and Semantic Inline/Stack/Inset/Section rhythm are established.',
    reopenTrigger:
      'Component-specific padding/gaps remain future Component Token decisions.',
  },
  {
    id: 'borders-radius',
    arabicLabel: 'الحدود والزوايا',
    status: 'Approved in principle',
    reviewLinks: [{label: 'الحدود والزوايا', route: '/foundation/borders-radius'}],
    summary:
      'Border width/style geometry, controlled radius roles, and default Focus Ring geometry are established.',
    reopenTrigger:
      'Changing the full-radius or Semantic dashed-border capabilities requires explicit Foundation reopen.',
  },
  {
    id: 'elevation',
    arabicLabel: 'الارتفاع والظلال',
    status: 'Approved in principle',
    reviewLinks: [{label: 'الارتفاع والظلال', route: '/foundation/elevation'}],
    summary: 'None/Raised/Overlay theme-aware elevation is established.',
    reopenTrigger: 'Component-specific elevation mapping remains deferred.',
  },
  {
    id: 'motion',
    arabicLabel: 'الحركة',
    status: 'Approved in principle — baseline',
    reviewLinks: [{label: 'الحركة', route: '/foundation/motion'}],
    summary: 'Duration and easing baseline is established.',
    reopenTrigger:
      'Timing/easing MUST be contextually revalidated in real component interactions.',
  },
  {
    id: 'density',
    arabicLabel: 'الكثافة',
    status: 'Approved in principle',
    reviewLinks: [{label: 'الكثافة', route: '/foundation/density'}],
    summary:
      'Compact/Comfortable/Spacious Stack + Inset modulation is established.',
    reopenTrigger:
      'Control heights, row heights and Component density contracts remain deferred.',
  },
  {
    id: 'responsive-layout',
    arabicLabel: 'التخطيط والاستجابة',
    status: 'Approved in principle',
    reviewLinks: [{label: 'التخطيط والاستجابة', route: '/foundation/layout-grid'}],
    summary:
      'Viewport/container Query API, Layout gap vocabulary and responsive gutters are established.',
    reopenTrigger:
      'Thresholds/gutters remain contextually revalidatable at target ERP widths and real structural primitives/components.',
  },
  {
    id: 'layers',
    arabicLabel: 'الطبقات',
    status: 'Approved in principle',
    reviewLinks: [{label: 'الطبقات', route: '/foundation/layers'}],
    summary:
      'Base/Sticky/Floating/Overlay/Blocking/Notification order is established.',
    reopenTrigger:
      'Component-specific layer mapping and stacking-context ownership remain deferred.',
  },
] as const;

export const FOUNDATION_OVERALL_STATUS = Object.freeze({
  english: 'Ready for Product Owner final closure review',
  arabic: 'جاهز لمراجعة الإغلاق النهائية بواسطة مالك المنتج',
});

export const FOUNDATION_NEXT_LAYER_DECISIONS = [
  'Component Tokens',
  'Production structural primitives',
  'Container max-width contract',
  'Production Grid column contract',
  'Component-specific elevation',
  'Component-specific motion',
  'Component density heights',
  'Component-specific layer mappings',
  'Backend Preferences persistence',
  'Global production Preferences application',
] as const;

export const FOUNDATION_V1_CONSTRAINTS = [
  'No shared Foundation letter-spacing/tracking contract; normal letter spacing is the frozen V1 baseline.',
  'No shared production monospace role; identifiers use the approved UI/Latin family plus bidi/LTR isolation.',
  'Foundation Charts support a maximum of five concurrent categorical series; larger visualizations must be grouped/split or Foundation explicitly reopened.',
] as const;
