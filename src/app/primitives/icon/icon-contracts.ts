export const ERP_ICON_NAMES = [
  'add',
  'chevron-down',
  'chevron-start',
  'chevron-end',
  'chevron-up',
  'branches',
  'building',
  'check',
  'close',
  'copy',
  'customer',
  'dashboard',
  'delete',
  'error',
  'eye',
  'eye-off',
  'handshake',
  'home',
  'info',
  'inventory',
  'layers',
  'location',
  'login',
  'logout',
  'maintenance',
  'menu',
  'money',
  'moon',
  'notification',
  'operations',
  'people',
  'phone',
  'phone-call',
  'print',
  'refresh',
  'search',
  'security',
  'server',
  'settings',
  'shield-check',
  'skip-start',
  'skip-end',
  'success',
  'sun',
  'user',
  'wallet',
  'warning',
  'wifi-off',
  'edit',
  'save',
  'upload',
  'download',
  'filter',
  'sort-ascending',
  'sort-descending',
  'more-horizontal',
  'more-vertical',
  'calendar',
  'clock',
  'lock',
  'unlock',
  'mail',
  'file',
  'folder',
  'attachment',
  'external-link',
  'help',
  'history',
  'undo',
  'redo',
  'plus',
  'minus',
] as const;

export type ErpIconName = (typeof ERP_ICON_NAMES)[number];

export const ERP_ICON_VARIANTS = [
  'outline',
  'filled',
] as const;

export type ErpIconVariant = (typeof ERP_ICON_VARIANTS)[number];

export const ERP_ICON_STROKE_WIDTHS = [
  'thin',
  'light',
  'regular',
  'medium',
  'bold',
] as const;

export type ErpIconStrokeWidth = (typeof ERP_ICON_STROKE_WIDTHS)[number];

export const ERP_ICON_SIZES = [
  'inherit',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '3.5xl',
  '4xl',
  '4.5xl',
  '5xl',
  '5.5xl',
  '6xl',
  '6.5xl',
  '7xl',
  '7.5xl',
  '8xl',
  '8.5xl',
  '9xl',
  '9.5xl',
  '10xl',
  '10.5xl',
  '11xl',
  '11.5xl',
  '12xl',
  '12.5xl',
  '13xl',
  '13.5xl',
  '14xl',
  '14.5xl',
  '15xl',
] as const;

export type ErpIconSize = (typeof ERP_ICON_SIZES)[number];

export type ErpIconTone =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'inverse'
  | 'brand-primary'
  | 'brand-secondary'
  | 'brand-accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ErpIconState = 'ready' | 'invalid';

export type ErpIconAccessibilityState = 'decorative' | 'labelled' | 'invalid';
