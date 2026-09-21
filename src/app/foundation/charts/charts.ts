import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-charts-specimen',
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
})
export class Charts {
  readonly themes = [
    {id: 'light', label: 'السمة الفاتحة'},
    {id: 'dark', label: 'السمة الداكنة'},
  ] as const;
}
