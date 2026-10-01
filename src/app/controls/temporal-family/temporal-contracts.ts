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
  readonly past7Days: string;
  readonly next7Days: string;
  readonly past30Days: string;
  readonly next30Days: string;
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
    past7Days: 'آخر 7 أيام',
    next7Days: '7 أيام بدءًا من اليوم',
    past30Days: 'آخر 30 يومًا',
    next30Days: '30 يومًا بدءًا من اليوم',
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
            {id: 'past-7-days', label: labels.past7Days, role: 'utility' as const, placement: 'start' as const},
            {id: 'next-7-days', label: labels.next7Days, role: 'utility' as const, placement: 'start' as const},
            {id: 'past-30-days', label: labels.past30Days, role: 'utility' as const, placement: 'start' as const},
            {id: 'next-30-days', label: labels.next30Days, role: 'utility' as const, placement: 'start' as const},
          ]
        : []),
      ...(clearable
        ? [{
            id: 'clear',
            label: labels.clear,
            icon: 'delete' as const,
            presentation: 'icon-button' as const,
            role: 'utility' as const,
            placement: 'start' as const,
          }]
        : []),
      {id: 'cancel', label: labels.cancel, role: 'secondary', placement: 'end'},
      {id: 'confirm', label: labels.confirm, role: 'primary', placement: 'end', disabled: true},
    ],
  };
}
import {ErpOverlayFooterConfig} from '../../shared/overlay/overlay-contracts';
