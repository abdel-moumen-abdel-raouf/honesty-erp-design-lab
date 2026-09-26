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
  readonly theme: 'light' | 'dark';
}
