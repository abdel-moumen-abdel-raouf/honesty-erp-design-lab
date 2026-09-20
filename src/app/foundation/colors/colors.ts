import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-colors-specimen',
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {
  readonly steps = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ] as const;
}
