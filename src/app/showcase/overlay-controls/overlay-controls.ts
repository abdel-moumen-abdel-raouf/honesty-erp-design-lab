import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayPosition} from '../../shared/overlay/overlay-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {
  OverlayEvidenceContent,
  OverlayEvidenceData,
} from './overlay-evidence-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-overlay-controls',
  imports: [
    ErpButton,
    ErpContainer,
    ErpDivider,
    ErpGrid,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
  ],
  templateUrl: './overlay-controls.html',
  styleUrl: './overlay-controls.scss',
})
export class OverlayControls {
  readonly themes = ['light', 'dark'] as const;
  private readonly overlays = inject(ErpOverlayManager);

  openModal(theme: 'light' | 'dark', nested = false): void {
    this.open('modal', 'center', theme, nested ? 'Nested stack root' : 'Modal');
  }

  openDrawer(
    position: Exclude<ErpOverlayPosition, 'center'>,
    theme: 'light' | 'dark',
  ): void {
    this.open('drawer', position, theme, `Drawer ${position}`);
  }

  openPolicy(theme: 'light' | 'dark'): void {
    this.overlays.open(OverlayEvidenceContent, {
      label: 'Persistent policy evidence',
      dismissOnBackdrop: false,
      dismissOnEscape: false,
      data: {
        theme,
        title: 'Explicit close policy',
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
  }

  private open(
    kind: 'modal' | 'drawer',
    position: ErpOverlayPosition,
    theme: 'light' | 'dark',
    title: string,
  ): void {
    this.overlays.open(OverlayEvidenceContent, {
      kind,
      position,
      label: title,
      data: {theme, title, allowNested: title === 'Nested stack root'} satisfies OverlayEvidenceData,
    });
  }
}
