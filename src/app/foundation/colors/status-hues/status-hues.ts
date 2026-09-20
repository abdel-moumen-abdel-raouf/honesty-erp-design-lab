import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-status-hues-specimen',
  templateUrl: './status-hues.html',
  styleUrl: './status-hues.scss',
})
export class StatusHues {
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
