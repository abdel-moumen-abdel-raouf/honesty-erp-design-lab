export const ERP_MOTION_PRESETS = [
  'fade',
  'scale',
  'fade-scale',
  'slide-up',
  'slide-down',
  'slide-start',
  'slide-end',
  'zoom',
  'pop',
  'flip-x',
  'flip-y',
  'bounce',
  'swing',
] as const;

export type ErpMotionPreset = (typeof ERP_MOTION_PRESETS)[number];
