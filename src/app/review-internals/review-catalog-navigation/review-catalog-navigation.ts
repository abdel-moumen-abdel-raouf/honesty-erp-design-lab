import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  ERP_COMPONENT_NAVIGATION,
  ErpComponentNavigationEntry,
} from '../../catalog/erp-component-navigation.generated';
import {ErpButton} from '../../controls/button/button';
import {ErpSearchBox} from '../../controls/search-box/search-box';
import {ErpText} from '../../primitives/text/text';

const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  Primitives: 'البدائيات',
  'Inputs / Fields': 'المدخلات والحقول',
  Selection: 'الاختيار',
  Actions: 'الإجراءات',
  'Feedback / Status': 'التغذية الراجعة والحالات',
  'Media / Identity': 'الوسائط والهوية',
  Navigation: 'التنقل',
  'Data / Tables': 'البيانات والجداول',
  Forms: 'النماذج',
  'Page Composition': 'تكوين الصفحات',
  'Application Shell': 'إطار التطبيق',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-catalog-navigation',
  imports: [
    ErpButton,
    ErpSearchBox,
    ErpText,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './review-catalog-navigation.html',
  styleUrl: './review-catalog-navigation.scss',
  host: {
    '[class.is-open]': 'open()',
    '[attr.aria-hidden]': '!open()',
  },
})
export class ErpReviewCatalogNavigation {
  readonly open = input(true);
  readonly closeRequested = output<void>();
  readonly searchControl = new FormControl('', {nonNullable: true});
  readonly expandedCategories = signal<ReadonlySet<string>>(
    new Set(ERP_COMPONENT_NAVIGATION.map((entry) => entry.category)),
  );
  private readonly query = toSignal(this.searchControl.valueChanges, {initialValue: ''});

  readonly groups = computed(() => {
    const query = this.query().trim().toLocaleLowerCase('ar');
    const filtered = ERP_COMPONENT_NAVIGATION.filter((entry) =>
      !query || this.searchableText(entry).includes(query),
    );
    const groups = new Map<string, ErpComponentNavigationEntry[]>();
    for (const entry of filtered) {
      const categoryEntries = groups.get(entry.category) ?? [];
      categoryEntries.push(entry);
      groups.set(entry.category, categoryEntries);
    }
    return [...groups].map(([category, entries]) => ({
      category,
      label: CATEGORY_LABELS[category] ?? category,
      entries,
    }));
  });

  toggleCategory(category: string): void {
    this.expandedCategories.update((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  categoryExpanded(category: string): boolean {
    return this.expandedCategories().has(category) || this.query().trim().length > 0;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    this.closeRequested.emit();
  }

  private searchableText(entry: ErpComponentNavigationEntry): string {
    return [
      entry.className,
      entry.selector,
      entry.displayNameAr,
      entry.descriptionAr,
      entry.category,
      entry.purpose,
    ].join(' ').toLocaleLowerCase('ar');
  }
}
