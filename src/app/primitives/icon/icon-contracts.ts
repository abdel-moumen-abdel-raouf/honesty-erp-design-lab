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
] as const;

export type ErpIconName = (typeof ERP_ICON_NAMES)[number];

export type ErpIconSize =
  | 'inherit'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

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
