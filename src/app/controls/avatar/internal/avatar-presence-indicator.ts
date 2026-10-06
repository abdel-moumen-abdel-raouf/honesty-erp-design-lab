import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal Avatar presence-layer owner.
  selector: 'erp-avatar-presence',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './avatar-presence-indicator.html',
  styleUrls: ['./avatar-presence-indicator.scss', './avatar-presence-motion.scss'],
  host: {
    class: 'avatar__presence',
  },
})
export class ErpAvatarPresenceIndicator {}
