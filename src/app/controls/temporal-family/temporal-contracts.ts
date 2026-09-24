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

export interface ErpTemporalPickerData {
  readonly mode: ErpTemporalPickerMode;
  readonly value: ErpTemporalValue;
  readonly min: string | null;
  readonly max: string | null;
  readonly weekStartsOn: number;
  readonly minuteStep: number;
  readonly locale: string | null;
  readonly clearable: boolean;
  readonly theme: 'light' | 'dark';
}
