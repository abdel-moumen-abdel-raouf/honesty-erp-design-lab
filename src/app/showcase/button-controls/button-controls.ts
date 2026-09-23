import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {
  ErpButtonShape,
  ErpButtonSize,
  ErpButtonTone,
  ErpButtonVariant,
  ErpExtendedFabSize,
  ErpFabSize,
  ErpFabTone,
  ErpIconButtonVariant,
} from '../../controls/button-family/button-contracts';
import {ErpExtendedFab} from '../../controls/extended-fab/extended-fab';
import {ErpFab} from '../../controls/fab/fab';
import {ErpIconButton} from '../../controls/icon-button/icon-button';
import {ErpTooltip} from '../../controls/tooltip/tooltip';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button-controls',
  imports: [
    ErpButton,
    ErpContainer,
    ErpDivider,
    ErpExtendedFab,
    ErpFab,
    ErpGrid,
    ErpIcon,
    ErpIconButton,
    ErpInline,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpTooltip,
  ],
  templateUrl: './button-controls.html',
  styleUrl: './button-controls.scss',
})
export class ButtonControls {
  readonly themes = ['light', 'dark'] as const;
  readonly standardVariants: readonly ErpButtonVariant[] = [
    'solid',
    'outline',
    'subtle',
    'ghost',
    'text',
  ];
  readonly tones: readonly ErpButtonTone[] = [
    'primary',
    'secondary',
    'accent',
    'success',
    'warning',
    'danger',
    'info',
    'neutral',
  ];
  readonly buttonSizes: readonly ErpButtonSize[] = ['sm', 'md', 'lg'];
  readonly buttonShapes: readonly ErpButtonShape[] = ['default', 'rounded', 'pill'];
  readonly iconButtonVariants: readonly ErpIconButtonVariant[] = [
    'solid',
    'outline',
    'subtle',
    'ghost',
  ];
  readonly fabSizes: readonly ErpFabSize[] = ['sm', 'md', 'lg'];
  readonly extendedFabSizes: readonly ErpExtendedFabSize[] = ['md', 'lg', 'xl'];
  readonly fabTones: readonly ErpFabTone[] = [
    'primary',
    'secondary',
    'accent',
    'surface',
  ];
  readonly pressedCount = signal(0);

  incrementPressedCount(): void {
    this.pressedCount.update((value) => value + 1);
  }
}
