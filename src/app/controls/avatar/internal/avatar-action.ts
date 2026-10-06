import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal Avatar semantic action owner.
  selector: 'erp-avatar-action',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './avatar-action.html',
  styleUrl: './avatar-action.scss',
  host: {
    '[attr.data-avatar-action-interactive]': 'interactive()',
  },
})
export class ErpAvatarAction {
  readonly interactive = input.required<boolean>();
  readonly label = input.required<string>();
  readonly action = output<MouseEvent>();
}
