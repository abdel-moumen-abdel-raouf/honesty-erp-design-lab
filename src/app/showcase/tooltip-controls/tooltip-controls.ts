import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpIconButton} from '../../controls/icon-button/icon-button';
import {ErpTooltip} from '../../controls/tooltip/tooltip';
import {ErpTooltipContent} from '../../controls/tooltip/tooltip-content';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tooltip-controls',
  imports: [ErpButton, ErpIconButton, ErpTooltip, ErpTooltipContent, ErpContainer, ErpDivider, ErpInline, ErpSection, ErpStack, ErpSurface, ErpText],
  templateUrl: './tooltip-controls.html',
  styleUrl: './tooltip-controls.scss',
})
export class TooltipControls {
  readonly themes = ['light', 'dark'] as const;
  readonly placements = ['top', 'bottom', 'start', 'end'] as const;
  readonly controlledOpen = signal(false);
}
