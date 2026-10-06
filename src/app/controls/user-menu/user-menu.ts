import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import {ErpAvatar} from '../avatar/avatar';
import {ErpButton} from '../button/button';
import {ErpText} from '../../primitives/text/text';
import {
  ErpShellUserSummary,
  ErpUserMenuItem,
} from '../shell-family/shell-contracts';
import {
  readShellCssLength,
  ShellAnchoredSurfaceController,
} from '../shell-family/internal/shell-anchored-surface';

let nextUserMenuId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-user-menu',
  imports: [ErpAvatar, ErpButton, ErpText],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
  host: {'[attr.data-user-menu-open]': 'open()'},
})
export class ErpUserMenu implements AfterViewInit, OnDestroy {
  readonly user = input.required<ErpShellUserSummary>();
  readonly items = input<readonly ErpUserMenuItem[]>([]);
  readonly label = input('قائمة المستخدم');
  readonly open = model(false);
  readonly actionActivated = output<ErpUserMenuItem>();

  protected readonly surfaceId = `erp-user-menu-surface-${++nextUserMenuId}`;

  private readonly trigger = viewChild('trigger', {
    read: ElementRef<HTMLElement>,
  });
  private readonly surface = viewChild.required<ElementRef<HTMLElement>>('surface');
  private controller: ShellAnchoredSurfaceController | null = null;
  private viewReady = false;

  constructor() {
    effect(() => {
      const requested = this.open();

      if (!this.viewReady || !this.controller) {
        return;
      }

      if (requested) {
        this.controller.show();
      } else {
        this.controller.hide(false);
      }
    });
  }

  ngAfterViewInit(): void {
    const anchor = this.trigger()?.nativeElement as HTMLElement | undefined;
    if (!anchor) {
      return;
    }
    const focusTarget = anchor.querySelector<HTMLElement>('button') ?? anchor;
    const surface = this.surface().nativeElement;

    this.controller = new ShellAnchoredSurfaceController({
      anchor,
      focusTarget,
      surface,
      anchorGap: () =>
        readShellCssLength(surface, '--honesty-user-menu-anchor-gap'),
      viewportInset: () =>
        readShellCssLength(surface, '--honesty-user-menu-viewport-inset'),
      onOpenChange: (open) => this.open.set(open),
    });
    this.viewReady = true;

    if (this.open()) {
      this.controller.show();
    }
  }

  ngOnDestroy(): void {
    this.controller?.destroy();
  }

  protected toggle(): void {
    this.controller?.toggle();
  }

  protected activate(item: ErpUserMenuItem): void {
    if (item.disabled) {
      return;
    }

    this.actionActivated.emit(item);
    this.controller?.hide(true);
  }
}
