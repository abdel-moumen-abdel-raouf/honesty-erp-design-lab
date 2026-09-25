import {ErpOverlayCloseResult, ErpOverlayConfig} from './overlay-contracts';

export class ErpOverlayRef<TResult = unknown> {
  readonly afterClosed: Promise<ErpOverlayCloseResult<TResult>>;

  private closing = false;
  private settled = false;
  private pendingResult: ErpOverlayCloseResult<TResult> | null = null;
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

  completeTransition(): void {
    if (this.settled || this.pendingResult === null) {
      return;
    }

    this.settled = true;
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
