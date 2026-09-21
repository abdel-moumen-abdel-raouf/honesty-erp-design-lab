import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-density-specimen',
  templateUrl: './density.html',
  styleUrl: './density.scss',
})
export class Density {}
