import {
  ErpOverlayCloseResult,
  ErpOverlayConfig,
  ErpOverlayFrameAction,
} from './overlay-contracts';

export class ErpOverlayRef<TResult = unknown> {
  readonly afterClosed: Promise<ErpOverlayCloseResult<TResult>>;

  private closing = false;
  private settled = false;
  private pendingResult: ErpOverlayCloseResult<TResult> | null = null;
  private readonly frameActions = new Map<
    ErpOverlayFrameAction,
    () => void
  >();
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
    action: ErpOverlayFrameAction,
    handler: () => void,
  ): () => void {
    this.frameActions.set(action, handler);

    return () => {
      if (this.frameActions.get(action) === handler) {
        this.frameActions.delete(action);
      }
    };
  }

  requestFrameAction(action: ErpOverlayFrameAction): boolean {
    const handler = this.frameActions.get(action);

    if (handler) {
      handler();
      return true;
    }

    if (action === 'secondary') {
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
