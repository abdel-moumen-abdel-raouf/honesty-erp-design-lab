import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-grid-specimen',
  templateUrl: './layout-grid.html',
  styleUrl: './layout-grid.scss',
})
export class LayoutGrid {}
