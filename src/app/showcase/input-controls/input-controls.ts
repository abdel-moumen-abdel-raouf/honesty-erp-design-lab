import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpPasswordBox} from '../../controls/password-box/password-box';
import {ErpRadioBox} from '../../controls/radio-box/radio-box';
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
    ErpGrid,
    ErpPasswordBox,
    ErpRadioBox,
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
}
