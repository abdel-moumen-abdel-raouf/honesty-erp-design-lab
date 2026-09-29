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
  readonly now: string;
  readonly previousWeek: string;
  readonly nextWeek: string;
  readonly previousMonthRange: string;
  readonly nextMonthRange: string;
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
    now: 'الآن',
    previousWeek: 'الأسبوع الماضي',
    nextWeek: 'الأسبوع القادم',
    previousMonthRange: 'الشهر الماضي',
    nextMonthRange: 'الشهر القادم',
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
      ...(mode === 'time' || mode === 'datetime'
        ? [{id: 'now', label: labels.now, role: 'utility' as const, placement: 'start' as const}]
        : []),
      ...(mode === 'time'
        ? []
        : [{id: 'today', label: labels.today, role: 'utility' as const, placement: 'start' as const}]),
      ...(mode === 'range'
        ? [
            {id: 'previous-week', label: labels.previousWeek, role: 'utility' as const, placement: 'start' as const},
            {id: 'next-week', label: labels.nextWeek, role: 'utility' as const, placement: 'start' as const},
            {id: 'previous-month-range', label: labels.previousMonthRange, role: 'utility' as const, placement: 'start' as const},
            {id: 'next-month-range', label: labels.nextMonthRange, role: 'utility' as const, placement: 'start' as const},
          ]
        : []),
      ...(clearable
        ? [{id: 'clear', label: labels.clear, role: 'utility' as const, placement: 'start' as const}]
        : []),
      {id: 'cancel', label: labels.cancel, role: 'secondary', placement: 'end'},
      {id: 'confirm', label: labels.confirm, role: 'primary', placement: 'end', disabled: true},
    ],
  };
}
import {ErpOverlayFooterConfig} from '../../shared/overlay/overlay-contracts';
