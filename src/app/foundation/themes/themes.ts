import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-themes-specimen',
  templateUrl: './themes.html',
  styleUrl: './themes.scss',
})
export class Themes {}
