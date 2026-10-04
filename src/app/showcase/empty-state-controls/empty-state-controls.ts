import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpButton} from '../../controls/button/button';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {
  ERP_EMPTY_STATE_SCENARIOS,
  ErpEmptyState,
  ErpEmptyStateIllustrationMotion,
  ErpEmptyStateMotionSpeed,
  ErpEmptyStateVariant,
} from '../../controls/empty-state/empty-state';
import {ErpTextAreaBox} from '../../controls/text-area-box/text-area-box';
import {ErpTextBox} from '../../controls/text-box/text-box';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewChoice} from '../../review-internals/review-choice/review-choice';
import {ErpReviewSelect} from '../../review-internals/review-select/review-select';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-empty-state-controls',
  imports: [
    ErpButton,
    ErpCheckBox,
    ErpContainer,
    ErpEmptyState,
    ErpGrid,
    ErpReviewChoice,
    ErpReviewSelect,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpTextAreaBox,
    ErpTextBox,
    FormsModule,
  ],
  templateUrl: './empty-state-controls.html',
  styleUrl: './empty-state-controls.scss',
})
export class EmptyStateControls {
  readonly variant = signal<ErpEmptyStateVariant>('no-data');
  readonly direction = signal<'rtl' | 'ltr'>('rtl');
  readonly animated = signal(true);
  readonly motion = signal<ErpEmptyStateIllustrationMotion>('float');
  readonly motionSpeed = signal<ErpEmptyStateMotionSpeed>(1);

  readonly showIllustration = signal(true);
  readonly showTitle = signal(true);
  readonly showDescription = signal(true);
  readonly showActions = signal(true);
  readonly showExtra = signal(true);
  readonly showPrimaryAction = signal(true);
  readonly showSecondaryAction = signal(false);
  readonly showTertiaryAction = signal(false);

  readonly title = signal(ERP_EMPTY_STATE_SCENARIOS['no-data'].title);
  readonly description = signal(
    ERP_EMPTY_STATE_SCENARIOS['no-data'].description,
  );
  readonly primaryActionLabel = signal(
    ERP_EMPTY_STATE_SCENARIOS['no-data'].primaryActionLabel,
  );
  readonly lastAction = signal('لم يتم تنفيذ إجراء بعد.');

  private readonly preview = viewChild<ErpEmptyState>('previewEmptyState');

  applyScenario(variant: ErpEmptyStateVariant): void {
    const scenario = ERP_EMPTY_STATE_SCENARIOS[variant];
    this.variant.set(variant);
    this.title.set(scenario.title);
    this.description.set(scenario.description);
    this.primaryActionLabel.set(scenario.primaryActionLabel);
    this.showIllustration.set(scenario.showIllustration);
    this.showTitle.set(true);
    this.showDescription.set(true);
    this.showActions.set(true);
    this.showExtra.set(scenario.showExtra);
    this.showPrimaryAction.set(scenario.showPrimaryAction);
    this.showSecondaryAction.set(scenario.showSecondaryAction);
    this.showTertiaryAction.set(scenario.showTertiaryAction);
    this.preview()?.replayEntrance();
  }

  setVariantFromEvent(event: Event): void {
    this.applyScenario(
      (event.target as HTMLSelectElement).value as ErpEmptyStateVariant,
    );
  }

  setDirectionFromEvent(event: Event): void {
    this.direction.set(
      (event.target as HTMLSelectElement).value as 'rtl' | 'ltr',
    );
  }

  setMotionFromEvent(event: Event): void {
    this.motion.set(
      (event.target as HTMLSelectElement)
        .value as ErpEmptyStateIllustrationMotion,
    );
  }

  setSpeedFromEvent(event: Event): void {
    this.motionSpeed.set(
      Number((event.target as HTMLSelectElement).value) as ErpEmptyStateMotionSpeed,
    );
  }

  replay(): void {
    this.preview()?.replayEntrance();
  }

  recordAction(action: 'primary' | 'secondary' | 'tertiary'): void {
    const labels = {
      primary: 'تم استقبال الإجراء الأساسي.',
      secondary: 'تم استقبال الإجراء الثانوي.',
      tertiary: 'تم استقبال الإجراء الثالث.',
    } as const;

    this.lastAction.set(labels[action]);
  }
}
