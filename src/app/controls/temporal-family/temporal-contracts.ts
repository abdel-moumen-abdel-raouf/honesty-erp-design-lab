export interface ErpDateRangeValue {
  readonly start: string | null;
  readonly end: string | null;
}

export type ErpTemporalValue = string | null | ErpDateRangeValue;

export type ErpTemporalPickerMode =
  | 'date'
  | 'time'
  | 'datetime'
  | 'range';

export interface ErpTemporalActionLabels {
  readonly previousMonth: string;
  readonly nextMonth: string;
  readonly today: string;
  readonly clear: string;
  readonly cancel: string;
  readonly confirm: string;
  readonly hour: string;
  readonly minute: string;
}

export const ERP_TEMPORAL_DEFAULT_ACTION_LABELS =
  Object.freeze<ErpTemporalActionLabels>({
    previousMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    today: 'اليوم',
    clear: 'مسح',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    hour: 'الساعة',
    minute: 'الدقيقة',
  });

export interface ErpTemporalPickerData {
  readonly mode: ErpTemporalPickerMode;
  readonly value: ErpTemporalValue;
  readonly min: string | null;
  readonly max: string | null;
  readonly weekStartsOn: number;
  readonly minuteStep: number;
  readonly locale: string | null;
  readonly actionLabels: ErpTemporalActionLabels;
  readonly clearable: boolean;
}

export function createTemporalOverlayFooter(
  mode: ErpTemporalPickerMode,
  clearable: boolean,
  labels: ErpTemporalActionLabels,
): ErpOverlayFooterConfig {
  return {
    actions: [
      ...(mode === 'time'
        ? []
        : [{id: 'today', label: labels.today, role: 'utility' as const, placement: 'start' as const}]),
      ...(clearable
        ? [{id: 'clear', label: labels.clear, role: 'utility' as const, placement: 'start' as const}]
        : []),
      {id: 'cancel', label: labels.cancel, role: 'secondary', placement: 'end'},
      {id: 'confirm', label: labels.confirm, role: 'primary', placement: 'end'},
    ],
  };
}
import {ErpOverlayFooterConfig} from '../../shared/overlay/overlay-contracts';
