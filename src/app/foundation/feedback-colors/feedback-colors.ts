import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feedback-colors-specimen',
  templateUrl: './feedback-colors.html',
  styleUrl: './feedback-colors.scss',
})
export class FeedbackColors {}
