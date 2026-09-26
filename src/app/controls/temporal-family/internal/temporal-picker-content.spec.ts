import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayHost} from '../../../shared/overlay/overlay-host';
import {ErpOverlayManager} from '../../../shared/overlay/overlay-manager';
import {
  ERP_TEMPORAL_DEFAULT_ACTION_LABELS,
  ErpTemporalPickerData,
  ErpTemporalValue,
} from '../temporal-contracts';
import {ErpTemporalPickerContent} from './temporal-picker-content';

@Component({imports: [ErpOverlayHost], template: '<erp-overlay-host />'})
class TestShell {}

describe('ErpTemporalPickerContent', () => {
  const base = {
    min: null,
    max: null,
    weekStartsOn: 0,
    minuteStep: 5,
    locale: 'ar-EG',
    actionLabels: ERP_TEMPORAL_DEFAULT_ACTION_LABELS,
    clearable: true,
    theme: 'light',
  } as const;

  beforeEach(() => TestBed.configureTestingModule({imports: [TestShell]}));

  function open(data: ErpTemporalPickerData) {
    const fixture = TestBed.createComponent(TestShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open<
      ErpTemporalPickerContent,
      ErpTemporalPickerData,
      ErpTemporalValue
    >(ErpTemporalPickerContent, {label: 'Temporal proof', data});
    fixture.detectChanges();
    return {fixture, manager, ref};
  }

  function day(root: HTMLElement, date: string): HTMLElement {
    return root.querySelector(`.calendar-day[data-date="${date}"]`) as HTMLElement;
  }

  function clickDay(root: HTMLElement, date: string): void {
    (day(root, date).querySelector('button') as HTMLButtonElement).click();
  }

  it('renders a Gregorian month grid and commits a keyboard-selected date', async () => {
    const {fixture, manager, ref} = open({
      ...base,
      mode: 'date',
      value: '2026-01-15',
    });
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-calendar-day]').length).toBe(42);
    expect(root.querySelectorAll('.weekday').length).toBe(7);
    const grid = root.querySelector('[data-calendar-grid]') as HTMLElement;
    grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
    grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    (root.querySelector('[data-confirm-action] button') as HTMLButtonElement).click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: '2026-01-16',
    });
  });

  it('uses the Arabic action contract and commits staged time', async () => {
    const {fixture, manager, ref} = open({...base, mode: 'time', value: null});
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-time-hour]').length).toBe(24);
    expect(root.querySelectorAll('[data-time-minute]').length).toBe(12);
    expect(root.textContent).toContain('الساعة');
    expect(root.textContent).toContain('الدقيقة');
    expect(root.textContent).toContain('إلغاء');
    expect(root.textContent).toContain('تأكيد');
    (root.querySelector('[data-time-hour] button') as HTMLButtonElement).click();
    (root.querySelectorAll('[data-time-minute] button')[1] as HTMLButtonElement).click();
    (root.querySelector('[data-confirm-action] button') as HTMLButtonElement).click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: '00:05',
    });
  });

  it('previews forward and backward ranges, moves the preview, and clears it on leave', () => {
    const {fixture} = open({
      ...base,
      mode: 'range',
      value: {start: '2026-01-15', end: '2026-01-16'},
    });
    const root = fixture.nativeElement as HTMLElement;
    clickDay(root, '2026-01-10');
    day(root, '2026-01-15').dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();
    expect(day(root, '2026-01-11').dataset['inPreview']).toBe('true');
    expect(day(root, '2026-01-15').dataset['previewEndpoint']).toBe('true');

    day(root, '2026-01-05').dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();
    expect(day(root, '2026-01-06').dataset['inPreview']).toBe('true');
    expect(day(root, '2026-01-15').dataset['inPreview']).toBe('false');

    root.querySelector('[data-calendar-grid]')?.dispatchEvent(
      new PointerEvent('pointerleave'),
    );
    fixture.detectChanges();
    expect(root.querySelectorAll(".calendar-day[data-in-preview='true']").length).toBe(0);
  });

  it('orders a backward RTL range and marks every cross-week intermediate date', async () => {
    const {fixture, manager, ref} = open({
      ...base,
      mode: 'range',
      value: {start: '2026-01-15', end: '2026-01-16'},
    });
    const root = fixture.nativeElement as HTMLElement;
    root.dir = 'rtl';
    clickDay(root, '2026-01-12');
    clickDay(root, '2026-01-03');
    fixture.detectChanges();

    expect(day(root, '2026-01-03').dataset['rangeStart']).toBe('true');
    expect(day(root, '2026-01-12').dataset['rangeEnd']).toBe('true');
    expect(root.querySelectorAll(".calendar-day[data-in-range='true']").length).toBe(8);
    expect(day(root, '2026-01-05').dataset['inRange']).toBe('true');
    expect(day(root, '2026-01-10').dataset['inRange']).toBe('true');

    (root.querySelector('[data-confirm-action] button') as HTMLButtonElement).click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {start: '2026-01-03', end: '2026-01-12'},
    });
  });

  it('previews keyboard movement from the anchor and Enter stores the endpoint', () => {
    const {fixture} = open({
      ...base,
      mode: 'range',
      value: {start: '2026-01-15', end: '2026-01-16'},
    });
    const root = fixture.nativeElement as HTMLElement;
    const grid = root.querySelector('[data-calendar-grid]') as HTMLElement;
    clickDay(root, '2026-01-10');
    grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
    grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
    fixture.detectChanges();
    expect(day(root, '2026-01-11').dataset['inPreview']).toBe('true');
    expect(day(root, '2026-01-12').dataset['previewEndpoint']).toBe('true');

    grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    fixture.detectChanges();
    expect(day(root, '2026-01-10').dataset['rangeStart']).toBe('true');
    expect(day(root, '2026-01-12').dataset['rangeEnd']).toBe('true');
  });

  it('does not stage a disabled date', () => {
    const {fixture} = open({
      ...base,
      mode: 'range',
      value: {start: '2026-01-15', end: '2026-01-16'},
      min: '2026-01-10',
    });
    const root = fixture.nativeElement as HTMLElement;
    const disabled = day(root, '2026-01-05');
    expect((disabled.querySelector('button') as HTMLButtonElement).disabled).toBe(true);
    clickDay(root, '2026-01-05');
    fixture.detectChanges();
    expect(disabled.dataset['selected']).toBe('false');
    expect(root.querySelectorAll(".calendar-day[data-selected='true']").length).toBe(2);
    expect(day(root, '2026-01-15').dataset['selected']).toBe('true');
    expect(day(root, '2026-01-16').dataset['selected']).toBe('true');
  });
});
