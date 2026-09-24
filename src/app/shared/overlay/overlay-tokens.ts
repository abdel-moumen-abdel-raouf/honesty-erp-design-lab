import {InjectionToken} from '@angular/core';
import {ErpOverlayRef} from './overlay-ref';

export const ERP_OVERLAY_REF = new InjectionToken<ErpOverlayRef<unknown>>(
  'ERP_OVERLAY_REF',
);

export const ERP_OVERLAY_DATA = new InjectionToken<unknown>(
  'ERP_OVERLAY_DATA',
);
