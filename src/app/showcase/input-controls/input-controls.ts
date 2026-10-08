import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpColorPicker} from '../../controls/color-picker/color-picker';
import {ErpComboBox} from '../../controls/combo-box/combo-box';
import {ErpDateBox} from '../../controls/date-box/date-box';
import {ErpDateRangeBox} from '../../controls/date-range-box/date-range-box';
import {ErpDateTimeBox} from '../../controls/date-time-box/date-time-box';
import {ErpFilePicker} from '../../controls/file-picker/file-picker';
import {ErpImagePicker} from '../../controls/image-picker/image-picker';
import {ErpIconPicker} from '../../controls/icon-picker/icon-picker';
import {ErpItemPicker} from '../../controls/item-picker/item-picker';
import {ErpMoneyBox} from '../../controls/money-box/money-box';
import {ErpNumberBox} from '../../controls/number-box/number-box';
import {ErpNumberStepper} from '../../controls/number-stepper/number-stepper';
import {ErpPasswordBox} from '../../controls/password-box/password-box';
import {ErpRadioBox} from '../../controls/radio-box/radio-box';
import {ErpRadioGroup} from '../../controls/radio-group/radio-group';
import {ErpRangeSlider} from '../../controls/range-slider/range-slider';
import {
  ErpSearchBox,
  ErpSearchBoxOption,
} from '../../controls/search-box/search-box';
import {
  ErpColorPickerValue,
  ErpItemPickerOption,
} from '../../controls/selection-family/selection-contracts';
import {ErpRadioGroupOption} from '../../controls/composite-family/composite-contracts';
import {ErpTelBox} from '../../controls/tel-box/tel-box';
import {ErpTimeBox} from '../../controls/time-box/time-box';
import {ErpTextAreaBox} from '../../controls/text-area-box/text-area-box';
import {ErpTextBox} from '../../controls/text-box/text-box';
import {ErpUrlBox} from '../../controls/url-box/url-box';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-controls',
  imports: [
    ErpReviewBox,
    ErpContainer,
    ErpCheckBox,
    ErpColorPicker,
    ErpComboBox,
    ErpDivider,
    ErpDateBox,
    ErpDateRangeBox,
    ErpDateTimeBox,
    ErpFilePicker,
    ErpGrid,
    ErpImagePicker,
    ErpIconPicker,
    ErpItemPicker,
    ErpMoneyBox,
    ErpNumberBox,
    ErpNumberStepper,
    ErpPasswordBox,
    ErpRadioBox,
    ErpRadioGroup,
    ErpRangeSlider,
    ErpSearchBox,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpTelBox,
    ErpTimeBox,
    ErpText,
    ErpTextAreaBox,
    ErpTextBox,
    ErpUrlBox,
    FormsModule,
  ],
  templateUrl: './input-controls.html',
  styleUrl: './input-controls.scss',
})
export class InputControls {
  readonly sizes = ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'] as const;
  readonly variants = ['solid', 'outline', 'subtle', 'ghost', 'text'] as const;
  readonly clearValue = signal('قيمة قابلة للمسح');
  readonly checkValue = signal(false);
  readonly standaloneChecked = signal(true);
  readonly textChecked = signal(true);
  readonly requiredCheckValue = signal(false);
  readonly switchEnabled = signal(true);
  readonly switchAutoUpdate = signal(false);
  readonly analyticsTile = signal(true);
  readonly automationsTile = signal(false);
  readonly auditTile = signal(false);
  readonly outlineVariantValue = signal(true);
  readonly filledVariantValue = signal(true);
  readonly softVariantValue = signal(true);
  readonly taskValues = signal<readonly boolean[]>([
    true,
    true,
    false,
  ]);
  readonly taskDoneCount = computed(
    () => this.taskValues().filter(Boolean).length,
  );
  readonly allTasksChecked = computed(
    () => this.taskDoneCount() === this.taskValues().length,
  );
  readonly someTasksChecked = computed(
    () =>
      this.taskDoneCount() > 0 &&
      this.taskDoneCount() < this.taskValues().length,
  );

  readonly radioValue = signal(false);
  readonly requiredRadioValue = signal(false);
  readonly radioGroupValue = signal<string | null>('review');
  readonly radioTileValue = signal<string | null>('analytics');
  readonly radioGroupItems: readonly ErpRadioGroupOption[] = [
    {value: 'draft', label: 'مسودة', description: 'العمل محفوظ ولم يُرسل للمراجعة.'},
    {value: 'review', label: 'مراجعة', description: 'بانتظار مراجعة واعتماد المسؤول.'},
    {value: 'approved', label: 'معتمد', description: 'تم اعتماد السجل ويمكن استخدامه.'},
  ];
  readonly radioTileItems: readonly ErpRadioGroupOption[] = [
    {value: 'analytics', label: 'التحليلات', description: 'لوحات المعلومات والتقارير.'},
    {value: 'automation', label: 'الأتمتة', description: 'المشغلات وسير العمل.'},
    {value: 'audit', label: 'سجل التدقيق', description: 'السجل الكامل للأحداث.'},
  ];
  readonly numberValue = signal<number | null>(12);
  readonly moneyValue = signal<number | null>(1250);
  readonly stepperValue = signal<number | null>(4);
  readonly rangeValue = signal({lower: 20, upper: 80});
  readonly dateValue = signal<string | null>('2026-09-24');
  readonly timeValue = signal<string | null>('09:30');
  readonly dateTimeValue = signal<string | null>('2026-09-24T09:30');
  readonly dateRangeValue = signal({start: '2026-09-24', end: '2026-09-30'});
  readonly pickerItems: readonly ErpItemPickerOption[] = [
    {value: 'customer', label: 'العملاء', icon: 'customer'},
    {value: 'inventory', label: 'المخزون', icon: 'inventory'},
    {value: 'maintenance', label: 'الصيانة', icon: 'maintenance'},
  ];
  readonly searchItems: readonly ErpSearchBoxOption[] = [
    {value: 'INV-2026-001', label: 'فاتورة INV-2026-001', icon: 'info'},
    {value: 'PO-2026-014', label: 'طلب شراء PO-2026-014', icon: 'info'},
    {value: 'CUS-2026-007', label: 'العميل CUS-2026-007', icon: 'customer'},
  ];
  readonly colorValue = signal<ErpColorPickerValue | null>({
    mode: 'system',
    token: 'primary-500',
  });
  readonly freeColorValue = signal<ErpColorPickerValue | null>({
    mode: 'free',
    value: '#2563EB',
  });
  readonly iconValue = signal<'settings' | null>('settings');
  readonly itemValue = signal<string | null>('customer');
  readonly comboValue = signal<string | null>('inventory');
  protected setTask(index: number, checked: boolean): void {
    this.taskValues.update((values) =>
      values.map((value, current) => (current === index ? checked : value)),
    );
  }

  protected setAllTasks(checked: boolean): void {
    this.taskValues.update((values) => values.map(() => checked));
  }

  readonly fileEvidence = Object.freeze([
    new File(['invoice'], 'invoice-2026.pdf', {type: 'application/pdf'}),
    new File(['notes'], 'notes.txt', {type: 'text/plain'}),
  ]);
  private readonly reviewImageBytes = new Uint8Array([
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
    0, 0, 0, 1, 0, 0, 0, 1, 8, 4, 0, 0, 0, 181, 28, 12, 2, 0, 0,
    0, 11, 73, 68, 65, 84, 120, 218, 99, 100, 248, 15, 0, 1, 5, 1, 1,
    39, 24, 227, 102, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
  ]);
  readonly imageEvidence = Object.freeze([
    new File([this.reviewImageBytes], 'product-a.png', {type: 'image/png'}),
    new File([this.reviewImageBytes], 'product-b.png', {type: 'image/png'}),
  ]);
}
