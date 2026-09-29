import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpSystemColorToken} from '../../foundation/colors/system-color-registry';
import {ErpOverlayFooterConfig} from '../../shared/overlay/overlay-contracts';

export interface ErpItemPickerOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly icon?: ErpIconName;
}

export type ErpSelectionPickerMode = 'color' | 'icon' | 'item' | 'combo';

export type ErpColorPickerMode = 'system' | 'free';

export type ErpColorPickerValue =
  | {
      readonly mode: 'system';
      readonly token: ErpSystemColorToken;
    }
  | {
      readonly mode: 'free';
      readonly value: string;
    };

export interface ErpSelectionActionLabels {
  readonly systemColors: string;
  readonly freeColor: string;
  readonly noSelection: string;
  readonly search: string;
  readonly clear: string;
  readonly cancel: string;
  readonly confirm: string;
}

export const ERP_SELECTION_DEFAULT_ACTION_LABELS =
  Object.freeze<ErpSelectionActionLabels>({
    systemColors: 'ألوان النظام',
    freeColor: 'لون حر',
    noSelection: 'لم يتم اختيار قيمة',
    search: 'بحث',
    clear: 'مسح',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
  });

export type ErpSelectionPickerValue =
  | string
  | ErpColorPickerValue
  | null;

export interface ErpSelectionPickerData {
  readonly mode: ErpSelectionPickerMode;
  readonly value: ErpSelectionPickerValue;
  readonly colorMode: ErpColorPickerMode;
  readonly items: readonly ErpItemPickerOption[];
  readonly query: string;
  readonly searchable: boolean;
  readonly clearable: boolean;
  readonly actionLabels: ErpSelectionActionLabels;
}

export function createSelectionOverlayFooter(
  mode: ErpSelectionPickerMode,
  clearable: boolean,
  labels: ErpSelectionActionLabels,
): ErpOverlayFooterConfig {
  const includesClear =
    clearable || mode === 'color' || mode === 'icon' || mode === 'combo';
  return {
    actions: [
      ...(includesClear
        ? [{id: 'clear-selected', label: labels.clear, role: 'utility' as const, placement: 'start' as const}]
        : []),
      {id: 'cancel', label: labels.cancel, role: 'secondary', placement: 'end'},
      {id: 'confirm', label: labels.confirm, role: 'primary', placement: 'end', disabled: true},
    ],
  };
}
