import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-elevation-specimen',
  templateUrl: './elevation.html',
  styleUrl: './elevation.scss',
})
export class Elevation {
  readonly referenceGeometryLevels = [
    { id: 'none', label: 'بدون ظل (None)', token: '$honesty-ref-elevation-shadow-none', description: 'انعدام أي فصل فيزيائي أو ظل' },
    { id: 'geom-1', label: 'المستوى الهندسي 1 (Geometry 1)', token: '$honesty-ref-elevation-shadow-geometry-1', description: 'إزاحة شاقولية 1px وضبابية 2px' },
    { id: 'geom-2', label: 'المستوى الهندسي 2 (Geometry 2)', token: '$honesty-ref-elevation-shadow-geometry-2', description: 'إزاحة شاقولية 8px وضبابية 24px' },
  ] as const;

  readonly referenceAlphaScales = [
    { id: 'alpha-08', value: '0.08', token: '$honesty-ref-elevation-shadow-alpha-08', role: 'شفافية الرفع الفاتح' },
    { id: 'alpha-14', value: '0.14', token: '$honesty-ref-elevation-shadow-alpha-14', role: 'شفافية الغطاء الفاتح' },
    { id: 'alpha-28', value: '0.28', token: '$honesty-ref-elevation-shadow-alpha-28', role: 'شفافية الرفع الداكن' },
    { id: 'alpha-40', value: '0.40', token: '$honesty-ref-elevation-shadow-alpha-40', role: 'شفافية الغطاء الداكن' },
  ] as const;

  readonly semanticElevationRoles = [
    { id: 'none', label: 'سطح مستوٍ (None)', token: '--honesty-elevation-none', roleNote: 'انعدام الارتفاع - الحالة الطبيعية لمعظم البطاقات والحاويات' },
    { id: 'raised', label: 'طبقة مرتفعة (Raised)', token: '--honesty-elevation-raised', roleNote: 'فصل فيزيائي طفيف فوق السطح المباشر - ليس ظلاً افتراضياً' },
    { id: 'overlay', label: 'طبقة عائمة (Overlay)', token: '--honesty-elevation-overlay', roleNote: 'فصل فيزيائي واضح لطبقة عائمة مستقلة عن السطح' },
  ] as const;
}
