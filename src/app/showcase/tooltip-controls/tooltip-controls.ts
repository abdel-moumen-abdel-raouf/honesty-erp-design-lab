import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpButtonGroup} from '../../controls/button-group/button-group';
import {ErpButtonGroupItem} from '../../controls/composite-family/composite-contracts';
import {ErpIconButton} from '../../controls/icon-button/icon-button';
import {ErpTooltip} from '../../controls/tooltip/tooltip';
import {ErpTooltipContent} from '../../controls/tooltip/tooltip-content';
import {
  ERP_MOTION_PRESETS,
  ErpMotionPreset,
} from '../../foundation/motion/motion-contracts';
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
  imports: [ErpButton, ErpButtonGroup, ErpIconButton, ErpTooltip, ErpTooltipContent, ErpContainer, ErpDivider, ErpInline, ErpSection, ErpStack, ErpSurface, ErpText],
  templateUrl: './tooltip-controls.html',
  styleUrl: './tooltip-controls.scss',
})
export class TooltipControls {
  readonly placements = ['top', 'bottom', 'start', 'end'] as const;
  readonly controlledOpen = signal(false);
  readonly motionOptions: readonly ErpButtonGroupItem[] =
    ERP_MOTION_PRESETS.map((preset) => ({value: preset, label: preset}));
  readonly enterAnimation = signal<ErpMotionPreset>('fade-scale');
  readonly exitAnimation = signal<ErpMotionPreset>('fade');
  readonly motionPreviewOpen = signal(true);

  selectEnterAnimation(value: string): void {
    const preset = ERP_MOTION_PRESETS.find((candidate) => candidate === value);
    if (preset !== undefined) this.enterAnimation.set(preset);
  }

  selectExitAnimation(value: string): void {
    const preset = ERP_MOTION_PRESETS.find((candidate) => candidate === value);
    if (preset !== undefined) this.exitAnimation.set(preset);
  }

  replayMotion(): void {
    this.motionPreviewOpen.set(false);
    queueMicrotask(() => this.motionPreviewOpen.set(true));
  }
}
