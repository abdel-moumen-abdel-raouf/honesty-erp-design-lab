import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {ComponentCatalogContent} from './component-catalog';

describe('ComponentCatalogContent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentCatalogContent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('offers all public owners before review filters are applied', () => {
    const fixture = TestBed.createComponent(ComponentCatalogContent);
    fixture.detectChanges();

    expect(fixture.componentInstance.publicCount).toBe(82);
    expect(fixture.componentInstance.groups()
      .flatMap((group) => group.entries)).toHaveLength(82);
  });

  it('filters by grounded lifecycle authority without inferring acceptance', () => {
    const fixture = TestBed.createComponent(ComponentCatalogContent);
    const component = fixture.componentInstance;

    component.statusControl.setValue('accepted-frozen');
    fixture.detectChanges();
    expect(component.groups().flatMap((group) => group.entries)
      .map((entry) => entry.className)).toEqual(['ErpCheckBox']);

    component.statusControl.setValue('reopened');
    fixture.detectChanges();
    expect(component.groups().flatMap((group) => group.entries)
      .map((entry) => entry.className).sort()).toEqual([
        'ErpEmptyState',
        'ErpSelect',
        'ErpTable',
        'ErpTabs',
        'ErpUserMenu',
      ]);
  });

  it('combines reference provenance and component search filters', () => {
    const fixture = TestBed.createComponent(ComponentCatalogContent);
    const component = fixture.componentInstance;

    component.referenceControl.setValue('exact-local');
    component.searchControl.setValue('جدول');
    fixture.detectChanges();

    const entries = component.groups().flatMap((group) => group.entries);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.reviewReference.kind === 'exact-local')).toBe(true);
    expect(entries.some((entry) => entry.className === 'ErpTable')).toBe(true);
  });
});
