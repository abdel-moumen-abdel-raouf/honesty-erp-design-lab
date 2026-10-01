import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpButton} from '../../../controls/button/button';
import {ErpIconButton} from '../../../controls/icon-button/icon-button';
import {ErpTooltip} from '../../../controls/tooltip/tooltip';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpText} from '../../../primitives/text/text';
import {ErpButtonTone} from '../../../controls/button-family/button-contracts';
import {
  ErpOverlayActionConfig,
  ErpOverlayActionRole,
  ErpOverlayFrameActionId,
  ErpOverlayFrameConfig,
} from '../overlay-contracts';
import {ErpOverlayRef} from '../overlay-ref';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-overlay-frame',
  imports: [ErpButton, ErpIcon, ErpIconButton, ErpText, ErpTooltip],
  templateUrl: './overlay-frame.html',
  styleUrl: './overlay-frame.scss',
})
export class ErpOverlayFrame implements AfterViewInit {
  readonly config = input.required<ErpOverlayFrameConfig>();
  readonly ref = input.required<ErpOverlayRef<unknown>>();
  readonly ready = output<void>();

  readonly titleId = computed(() => `${this.ref().id}-title`);
  readonly subtitleId = computed(() => `${this.ref().id}-subtitle`);
  readonly showHeader = computed(() => this.config().showHeader !== false);
  readonly showFooter = computed(() => this.config().showFooter !== false);
  readonly closeLabel = computed(
    () => this.config().header.closeLabel ?? 'إغلاق',
  );
  readonly actions = computed(() => {
    const states = this.ref().frameActionStates();
    return this.config().footer.actions.map((action) => ({
      ...action,
      disabled: states[action.id]?.disabled ?? action.disabled ?? false,
      loading: states[action.id]?.loading ?? action.loading ?? false,
    }));
  });
  readonly startActions = computed(() =>
    this.actions().filter((action) => action.placement === 'start'),
  );
  readonly endActions = computed(() =>
    this.actions().filter((action) => action.placement === 'end'),
  );

  ngAfterViewInit(): void {
    queueMicrotask(() => this.ready.emit());
  }

  request(action: ErpOverlayFrameActionId): void {
    this.ref().requestFrameAction(action);
  }

  buttonVariant(role: ErpOverlayActionRole): 'solid' | 'outline' | 'ghost' {
    return role === 'primary'
      ? 'solid'
      : role === 'secondary'
        ? 'outline'
        : 'ghost';
  }

  buttonTone(action: ErpOverlayActionConfig): ErpButtonTone {
    return (
      action.tone ??
      (action.role === 'primary' ? 'primary' : 'neutral')
    );
  }

  close(): void {
    this.ref().dismiss('close-action');
  }
}
