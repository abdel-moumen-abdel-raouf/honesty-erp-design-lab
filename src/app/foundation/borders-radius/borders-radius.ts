import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-borders-radius-specimen',
  templateUrl: './borders-radius.html',
  styleUrl: './borders-radius.scss',
})
export class BordersRadius {
  readonly referenceWidthKeys = ['0', '1', '2'] as const;
  readonly referenceStyleKeys = ['solid', 'dashed'] as const;
  readonly referenceRadiusKeys = ['0', '2', '4', '6', '8', '12', 'full'] as const;
}
