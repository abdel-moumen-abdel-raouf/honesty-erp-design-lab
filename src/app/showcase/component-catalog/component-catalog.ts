import {ChangeDetectionStrategy, Component, computed} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {ERP_COMPONENT_NAVIGATION} from '../../catalog/erp-component-navigation.generated';
import {ERP_COMPONENT_CATALOG} from '../../catalog/erp-component-catalog.generated';
import {ErpSearchBox} from '../../controls/search-box/search-box';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  Actions: 'الإجراءات',
  'Application Shell': 'إطار التطبيق',
  'Data / Tables': 'البيانات والجداول',
  'Feedback / Status': 'التغذية الراجعة والحالات',
  Forms: 'النماذج',
  'Inputs / Fields': 'المدخلات والحقول',
  'Media / Identity': 'الوسائط والهوية',
  Navigation: 'التنقل',
  'Page Composition': 'تكوين الصفحات',
  Primitives: 'البدائيات',
  Selection: 'الاختيار',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-component-catalog-content',
  imports: [
    ErpGrid,
    ErpSearchBox,
    ErpStack,
    ErpSurface,
    ErpText,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './component-catalog.html',
  styleUrl: './component-catalog.scss',
})
export class ComponentCatalogContent {
  readonly searchControl = new FormControl('', {nonNullable: true});
  private readonly query = toSignal(this.searchControl.valueChanges, {initialValue: ''});
  readonly publicCount = ERP_COMPONENT_NAVIGATION.length;
  readonly exactReferenceCount = ERP_COMPONENT_CATALOG.filter(
    (entry) => entry.classification === 'PUBLIC ERP COMPONENT' && entry.visualReference,
  ).length;

  readonly groups = computed(() => {
    const query = this.query().trim().toLocaleLowerCase('ar');
    const filtered = ERP_COMPONENT_NAVIGATION.filter((entry) =>
      !query || [entry.className, entry.selector, entry.displayNameAr, entry.descriptionAr, entry.category, entry.purpose]
        .join(' ')
        .toLocaleLowerCase('ar')
        .includes(query),
    );
    const groups = new Map<string, typeof ERP_COMPONENT_NAVIGATION[number][]>();
    for (const entry of filtered) {
      const entries = groups.get(entry.category) ?? [];
      entries.push(entry);
      groups.set(entry.category, entries);
    }
    return [...groups].map(([category, entries]) => ({
      category,
      entries,
      label: CATEGORY_LABELS[category] ?? category,
    }));
  });
}
