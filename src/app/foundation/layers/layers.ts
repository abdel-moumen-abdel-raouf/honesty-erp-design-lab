import {ChangeDetectionStrategy, Component} from '@angular/core';

export interface SemanticLayerDef {
  id: string;
  role: string;
  token: string;
  numericValue: number;
  arabicName: string;
  arabicDesc: string;
}

export interface PairwiseCheck {
  id: string;
  title: string;
  description: string;
  expectedUpper: string;
  isReversedDomOrder: boolean;
  domOrderNote: string;
  layerA: {
    role: string;
    token: string;
    cssClass: string;
    isHigher: boolean;
  };
  layerB: {
    role: string;
    token: string;
    cssClass: string;
    isHigher: boolean;
  };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layers-specimen',
  templateUrl: './layers.html',
  styleUrl: './layers.scss',
})
export class Layers {
  readonly semanticLayers: readonly SemanticLayerDef[] = [
    {
      id: 'layer-base',
      role: 'Base',
      token: '--honesty-layer-base',
      numericValue: 0,
      arabicName: 'طبقة الأساس',
      arabicDesc: 'المستوى المعياري لمحتوى الصفحة وتدفق العناصر الطبيعي في الواجهة.',
    },
    {
      id: 'layer-sticky',
      role: 'Sticky',
      token: '--honesty-layer-sticky',
      numericValue: 10,
      arabicName: 'طبقة التثبيت',
      arabicDesc: 'مساحات ثابتة ضمن تدفق العرض تبقى مرئية فوق المحتوى التمريري العادي.',
    },
    {
      id: 'layer-floating',
      role: 'Floating',
      token: '--honesty-layer-floating',
      numericValue: 20,
      arabicName: 'الطبقة العائمة',
      arabicDesc: 'أسطح عائمة عابرة غير حاجزة تظهر موضعياً فوق المحتوى العادي والملصق.',
    },
    {
      id: 'layer-overlay',
      role: 'Overlay',
      token: '--honesty-layer-overlay',
      numericValue: 30,
      arabicName: 'طبقة التراكب',
      arabicDesc: 'مستوى الغشاء أو الخلفية التراكبية الحاجبة جزئياً لمحتوى الواجهة السفلي.',
    },
    {
      id: 'layer-blocking',
      role: 'Blocking',
      token: '--honesty-layer-blocking',
      numericValue: 40,
      arabicName: 'طبقة الحجب التفاعلي',
      arabicDesc: 'واجهات وتفاعلات مركزية حاجبة للمقدمة تعمل فوق مستوى التراكب.',
    },
    {
      id: 'layer-notification',
      role: 'Notification',
      token: '--honesty-layer-notification',
      numericValue: 50,
      arabicName: 'طبقة التنبيهات',
      arabicDesc: 'أسطح التغذية الراجعة والإشعارات العاجلة ذات الأولوية والظهور الأقصى.',
    },
  ];

  readonly pairwiseChecks: readonly PairwiseCheck[] = [
    {
      id: 'pair-base-sticky',
      title: 'Base مقابل Sticky',
      description: 'التحقق من بقاء طبقة التثبيت (Sticky) فوق طبقة الأساس (Base).',
      expectedUpper: 'Sticky فوق Base',
      isReversedDomOrder: false,
      domOrderNote: 'ترتيب DOM طبيعي: Base أُدرجت أولاً، ثم Sticky ثانياً.',
      layerA: {
        role: 'Base',
        token: '--honesty-layer-base',
        cssClass: 'layer-base',
        isHigher: false,
      },
      layerB: {
        role: 'Sticky',
        token: '--honesty-layer-sticky',
        cssClass: 'layer-sticky',
        isHigher: true,
      },
    },
    {
      id: 'pair-sticky-floating',
      title: 'Sticky مقابل Floating',
      description: 'التحقق من ظهور الطبقة العائمة (Floating) فوق طبقة التثبيت (Sticky).',
      expectedUpper: 'Floating فوق Sticky',
      isReversedDomOrder: true,
      domOrderNote: 'اختبار إجهاد DOM معكوس: Floating أُدرجت أولاً في شجرة DOM، وSticky ثانياً، ولكن z-index يضمن ظهور Floating في المقدمة.',
      layerA: {
        role: 'Floating',
        token: '--honesty-layer-floating',
        cssClass: 'layer-floating',
        isHigher: true,
      },
      layerB: {
        role: 'Sticky',
        token: '--honesty-layer-sticky',
        cssClass: 'layer-sticky',
        isHigher: false,
      },
    },
    {
      id: 'pair-floating-overlay',
      title: 'Floating مقابل Overlay',
      description: 'التحقق من ظهور طبقة التراكب (Overlay) فوق الطبقة العائمة (Floating).',
      expectedUpper: 'Overlay فوق Floating',
      isReversedDomOrder: false,
      domOrderNote: 'ترتيب DOM طبيعي: Floating أُدرجت أولاً، ثم Overlay ثانياً.',
      layerA: {
        role: 'Floating',
        token: '--honesty-layer-floating',
        cssClass: 'layer-floating',
        isHigher: false,
      },
      layerB: {
        role: 'Overlay',
        token: '--honesty-layer-overlay',
        cssClass: 'layer-overlay',
        isHigher: true,
      },
    },
    {
      id: 'pair-overlay-blocking',
      title: 'Overlay مقابل Blocking',
      description: 'التحقق من ظهور طبقة الحجب التفاعلي (Blocking) فوق طبقة التراكب (Overlay).',
      expectedUpper: 'Blocking فوق Overlay',
      isReversedDomOrder: true,
      domOrderNote: 'اختبار إجهاد DOM معكوس: Blocking أُدرجت أولاً في شجرة DOM، وOverlay ثانياً، ولكن z-index يضمن ظهور Blocking في المقدمة.',
      layerA: {
        role: 'Blocking',
        token: '--honesty-layer-blocking',
        cssClass: 'layer-blocking',
        isHigher: true,
      },
      layerB: {
        role: 'Overlay',
        token: '--honesty-layer-overlay',
        cssClass: 'layer-overlay',
        isHigher: false,
      },
    },
    {
      id: 'pair-blocking-notification',
      title: 'Blocking مقابل Notification',
      description: 'التحقق من ظهور طبقة التنبيهات (Notification) فوق طبقة الحجب (Blocking).',
      expectedUpper: 'Notification فوق Blocking',
      isReversedDomOrder: true,
      domOrderNote: 'اختبار إجهاد DOM معكوس: Notification أُدرجت أولاً في شجرة DOM، وBlocking ثانياً، ولكن z-index يضمن ظهور Notification في المقدمة.',
      layerA: {
        role: 'Notification',
        token: '--honesty-layer-notification',
        cssClass: 'layer-notification',
        isHigher: true,
      },
      layerB: {
        role: 'Blocking',
        token: '--honesty-layer-blocking',
        cssClass: 'layer-blocking',
        isHigher: false,
      },
    },
  ];
}
