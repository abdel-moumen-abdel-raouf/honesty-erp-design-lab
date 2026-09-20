import {ChangeDetectionStrategy, Component} from '@angular/core';

export interface ReferenceSpacingItem {
  readonly step: number;
  readonly tokenName: string;
  readonly remValue: string;
  readonly pixelValue: string;
  readonly hasSemanticAlias: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spacing-specimen',
  templateUrl: './spacing.html',
  styleUrl: './spacing.scss',
})
export class Spacing {
  readonly referenceSteps: readonly ReferenceSpacingItem[] = [
    {step: 0, tokenName: '$honesty-ref-space-0', remValue: '0', pixelValue: '0px', hasSemanticAlias: false},
    {step: 4, tokenName: '$honesty-ref-space-4', remValue: '0.25rem', pixelValue: '4px', hasSemanticAlias: true},
    {step: 8, tokenName: '$honesty-ref-space-8', remValue: '0.5rem', pixelValue: '8px', hasSemanticAlias: true},
    {step: 12, tokenName: '$honesty-ref-space-12', remValue: '0.75rem', pixelValue: '12px', hasSemanticAlias: true},
    {step: 16, tokenName: '$honesty-ref-space-16', remValue: '1rem', pixelValue: '16px', hasSemanticAlias: true},
    {step: 20, tokenName: '$honesty-ref-space-20', remValue: '1.25rem', pixelValue: '20px', hasSemanticAlias: false},
    {step: 24, tokenName: '$honesty-ref-space-24', remValue: '1.5rem', pixelValue: '24px', hasSemanticAlias: true},
    {step: 32, tokenName: '$honesty-ref-space-32', remValue: '2rem', pixelValue: '32px', hasSemanticAlias: true},
    {step: 40, tokenName: '$honesty-ref-space-40', remValue: '2.5rem', pixelValue: '40px', hasSemanticAlias: false},
    {step: 48, tokenName: '$honesty-ref-space-48', remValue: '3rem', pixelValue: '48px', hasSemanticAlias: true},
    {step: 64, tokenName: '$honesty-ref-space-64', remValue: '4rem', pixelValue: '64px', hasSemanticAlias: false},
  ];
}
