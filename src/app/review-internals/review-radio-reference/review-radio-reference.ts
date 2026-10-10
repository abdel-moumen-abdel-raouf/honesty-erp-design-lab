import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ErpRadioGroupOption} from '../../controls/composite-family/composite-contracts';
import {ErpRadioBox} from '../../controls/radio-box/radio-box';
import {ErpRadioGroup} from '../../controls/radio-group/radio-group';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

export type ErpReviewRadioReferenceFocus = 'radio-box' | 'radio-group';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-radio-reference',
  imports: [
    ErpRadioBox,
    ErpRadioGroup,
    ErpInline,
    ErpStack,
    ErpSurface,
    ErpText,
    FormsModule,
  ],
  templateUrl: './review-radio-reference.html',
  styleUrl: './review-radio-reference.scss',
})
export class ErpReviewRadioReference {
  readonly focus = input.required<ErpReviewRadioReferenceFocus>();
  readonly standaloneValue = signal(true);
  readonly requiredValue = signal(false);
  readonly groupValue = signal<string | null>('review');
  readonly tileValue = signal<string | null>('analytics');

  readonly groupOptions: readonly ErpRadioGroupOption[] = [
    {
      value: 'draft',
      label: 'مسودة',
      description: 'العمل محفوظ ولم يُرسل للمراجعة.',
    },
    {
      value: 'review',
      label: 'قيد المراجعة',
      description: 'بانتظار مراجعة واعتماد المسؤول.',
    },
    {
      value: 'approved',
      label: 'معتمد',
      description: 'تم اعتماد السجل ويمكن استخدامه.',
    },
  ];

  readonly tileOptions: readonly ErpRadioGroupOption[] = [
    {
      value: 'analytics',
      label: 'التحليلات',
      description: 'لوحات المعلومات والتقارير.',
    },
    {
      value: 'automation',
      label: 'الأتمتة',
      description: 'المشغلات وسير العمل.',
    },
    {
      value: 'audit',
      label: 'سجل التدقيق',
      description: 'السجل الكامل للأحداث.',
    },
  ];
}
