import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {describe, expect, it} from 'vitest';
import {ErpReviewPlannedPattern, ErpReviewPlannedUiPattern} from './planned-ui-patterns';

async function createPattern(pattern: ErpReviewPlannedPattern): Promise<ComponentFixture<ErpReviewPlannedUiPattern>> {
  await TestBed.configureTestingModule({
    imports: [ErpReviewPlannedUiPattern],
    providers: [{provide: ActivatedRoute, useValue: {snapshot: {data: {pattern}}}}],
  }).compileComponents();
  const fixture = TestBed.createComponent(ErpReviewPlannedUiPattern);
  fixture.detectChanges();
  return fixture;
}

describe('ErpReviewPlannedUiPattern', () => {
  it.each<ErpReviewPlannedPattern>(['entity-wizard', 'entity-directory', 'entity-detail'])(
    'renders %s with exactly one existing-owner target and no new public facade',
    async (pattern) => {
      const fixture = await createPattern(pattern);
      expect(fixture.nativeElement.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
      expect(fixture.nativeElement.querySelector('[data-showcase-api-controls]')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('[data-showcase-event-log]')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('erp-entity-wizard, erp-entity-directory, erp-entity-detail')).toBeNull();
    },
  );

  it('keeps wizard navigation and values consumer controlled', async () => {
    const fixture = await createPattern('entity-wizard');
    fixture.componentInstance.setStep('review-step');
    fixture.componentInstance.applyValue({key: 'name', value: 'عميل جديد', nextValues: {...INITIAL_VALUES_FOR_TEST, name: 'عميل جديد'}});
    fixture.detectChanges();
    expect(fixture.componentInstance.activeStepId()).toBe('review-step');
    expect(fixture.componentInstance.values()['name']).toBe('عميل جديد');
    expect(fixture.componentInstance.lastEvent()).toContain('valueChanged');
  });

  it('keeps directory empty/loading/density scenarios on the same DataPage target', async () => {
    const fixture = await createPattern('entity-directory');
    const target = fixture.nativeElement.querySelector('[data-showcase-target]');
    fixture.componentInstance.toggleDirectoryRows();
    fixture.componentInstance.directoryLoading.set(true);
    fixture.componentInstance.directoryCompact.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-showcase-target]')).toBe(target);
    expect(fixture.componentInstance.directoryRows()).toHaveLength(0);
  });

  it('switches detail presentation without ever rendering competing targets', async () => {
    const fixture = await createPattern('entity-detail');
    for (const mode of ['view', 'edit', 'review'] as const) {
      fixture.componentInstance.setDetailMode(mode);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    }
  });
});

const INITIAL_VALUES_FOR_TEST = {
  name: 'شركة النيل للتوريدات',
  phone: '+201005550101',
  email: 'accounts@nile-supplies.example',
  active: true,
  classification: 'strategic',
  branch: 'cairo',
  limit: 250000,
} as const;
