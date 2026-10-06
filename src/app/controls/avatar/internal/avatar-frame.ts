import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal Avatar visual-frame owner.
  selector: 'erp-avatar-frame',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './avatar-frame.html',
  styleUrls: ['./avatar-frame.scss', './avatar-frame-motion.scss'],
})
export class ErpAvatarFrame {}
