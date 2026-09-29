import {signal} from '@angular/core';
import {
  ErpOverlayCloseResult,
  ErpOverlayConfig,
  ErpOverlayFrameActionId,
  ErpOverlayFrameActionState,
} from './overlay-contracts';

export class ErpOverlayRef<TResult = unknown> {
  readonly afterClosed: Promise<ErpOverlayCloseResult<TResult>>;

  private closing = false;
  private settled = false;
  private pendingResult: ErpOverlayCloseResult<TResult> | null = null;
  private readonly frameActions = new Map<
    ErpOverlayFrameActionId,
    () => void
  >();
  private readonly frameActionState = signal<
    Readonly<Record<string, Partial<ErpOverlayFrameActionState>>>
  >({});
  readonly frameActionStates = this.frameActionState.asReadonly();
  private readonly resolveClosed: (
    result: ErpOverlayCloseResult<TResult>,
  ) => void;

  constructor(
    readonly id: string,
    readonly config: Readonly<ErpOverlayConfig>,
    private readonly requestClose: (
      result: ErpOverlayCloseResult<TResult>,
    ) => boolean,
  ) {
    let resolveClosed!: (
      result: ErpOverlayCloseResult<TResult>,
    ) => void;
    this.afterClosed = new Promise((resolve) => {
      resolveClosed = resolve;
    });
    this.resolveClosed = resolveClosed;
  }

  close(result?: TResult): void {
    this.finish({type: 'closed', result});
  }

  dismiss(reason: string): void {
    this.finish({type: 'dismissed', reason});
  }

  registerFrameAction(
    action: ErpOverlayFrameActionId,
    handler: () => void,
  ): () => void {
    this.frameActions.set(action, handler);

    return () => {
      if (this.frameActions.get(action) === handler) {
        this.frameActions.delete(action);
      }
    };
  }

  updateFrameActionState(
    action: ErpOverlayFrameActionId,
    state: Partial<ErpOverlayFrameActionState>,
  ): void {
    const configured = this.config.frame?.footer.actions.some(
      (candidate) => candidate.id === action,
    );
    if (!configured) {
      throw new TypeError(`Unknown Overlay frame action "${action}".`);
    }

    this.frameActionState.update((current) => ({
      ...current,
      [action]: {...current[action], ...state},
    }));
  }

  requestFrameAction(action: ErpOverlayFrameActionId): boolean {
    const config = this.config.frame?.footer.actions.find(
      (candidate) => candidate.id === action,
    );
    const state = this.frameActionState()[action];
    const disabled = state?.disabled ?? config?.disabled ?? false;
    const loading = state?.loading ?? config?.loading ?? false;

    if (disabled || loading) {
      return false;
    }

    const handler = this.frameActions.get(action);

    if (handler) {
      handler();
      return true;
    }

    if (config?.role === 'secondary') {
      this.dismiss('secondary-action');
    }

    return false;
  }

  completeTransition(): void {
    if (this.settled || this.pendingResult === null) {
      return;
    }

    this.settled = true;
    this.frameActions.clear();
    this.frameActionState.set({});
    this.resolveClosed(this.pendingResult);
  }

  private finish(result: ErpOverlayCloseResult<TResult>): void {
    if (this.closing || this.settled) {
      return;
    }

    if (this.requestClose(result)) {
      this.closing = true;
      this.pendingResult = result;
    }
  }
}
