import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpFilePicker} from '../../controls/file-picker/file-picker';
import {ErpImagePicker} from '../../controls/image-picker/image-picker';
import {ErpMoneyBox} from '../../controls/money-box/money-box';
import {ErpNumberBox} from '../../controls/number-box/number-box';
import {ErpNumberStepper} from '../../controls/number-stepper/number-stepper';
import {ErpPasswordBox} from '../../controls/password-box/password-box';
import {ErpRadioBox} from '../../controls/radio-box/radio-box';
import {ErpRangeSlider} from '../../controls/range-slider/range-slider';
import {ErpSearchBox} from '../../controls/search-box/search-box';
import {ErpTelBox} from '../../controls/tel-box/tel-box';
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
    ErpContainer,
    ErpCheckBox,
    ErpDivider,
    ErpFilePicker,
    ErpGrid,
    ErpImagePicker,
    ErpMoneyBox,
    ErpNumberBox,
    ErpNumberStepper,
    ErpPasswordBox,
    ErpRadioBox,
    ErpRangeSlider,
    ErpSearchBox,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpTelBox,
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
  readonly themes = ['light', 'dark'] as const;
  readonly sizes = ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'] as const;
  readonly variants = ['solid', 'outline', 'subtle', 'ghost', 'text'] as const;
  readonly clearValue = signal('قيمة قابلة للمسح');
  readonly checkValue = signal(false);
  readonly radioValue = signal(false);
  readonly numberValue = signal<number | null>(12);
  readonly moneyValue = signal<number | null>(1250);
  readonly stepperValue = signal<number | null>(4);
  readonly rangeValue = signal({lower: 20, upper: 80});
}
