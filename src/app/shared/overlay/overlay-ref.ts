import {ErpOverlayCloseResult, ErpOverlayConfig} from './overlay-contracts';

export class ErpOverlayRef<TResult = unknown> {
  readonly afterClosed: Promise<ErpOverlayCloseResult<TResult>>;

  private settled = false;
  private readonly resolveClosed: (
    result: ErpOverlayCloseResult<TResult>,
  ) => void;

  constructor(
    readonly id: string,
    readonly config: Readonly<ErpOverlayConfig>,
    private readonly finalize: (
      result: ErpOverlayCloseResult<TResult>,
    ) => void,
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

  private finish(result: ErpOverlayCloseResult<TResult>): void {
    if (this.settled) {
      return;
    }

    this.settled = true;
    this.finalize(result);
    this.resolveClosed(result);
  }
}
