import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {ERP_COMPONENT_NAVIGATION} from '../../catalog/erp-component-navigation.generated';
import {ErpReviewCatalogNavigation} from './review-catalog-navigation';

describe('ErpReviewCatalogNavigation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpReviewCatalogNavigation],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('offers all 81 dedicated component routes through compact category groups', () => {
    const fixture = TestBed.createComponent(ErpReviewCatalogNavigation);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.catalog-navigation__link');
    expect(ERP_COMPONENT_NAVIGATION).toHaveLength(81);
    expect(links).toHaveLength(81);
    expect(fixture.nativeElement.querySelector('.lab-component-catalog')).toBeNull();
  });

  it('searches Arabic title, selector, class name, category, and purpose metadata', () => {
    const fixture = TestBed.createComponent(ErpReviewCatalogNavigation);
    fixture.componentInstance.searchControl.setValue('تلميح');
    fixture.detectChanges();
    expect(fixture.componentInstance.groups().flatMap((group) => group.entries).map((entry) => entry.id))
      .toContain('tooltip');

    fixture.componentInstance.searchControl.setValue('erp-stack');
    fixture.detectChanges();
    expect(fixture.componentInstance.groups().flatMap((group) => group.entries).map((entry) => entry.id))
      .toEqual(['stack']);
  });

  it('collapses categories and emits the Escape dismissal intent', () => {
    const fixture = TestBed.createComponent(ErpReviewCatalogNavigation);
    const category = fixture.componentInstance.groups()[0].category;
    fixture.componentInstance.toggleCategory(category);
    expect(fixture.componentInstance.categoryExpanded(category)).toBe(false);

    const emitted = vi.fn();
    fixture.componentInstance.closeRequested.subscribe(emitted);
    fixture.componentInstance.handleKeydown(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(emitted).toHaveBeenCalledOnce();
  });
});
