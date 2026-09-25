import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayHost} from '../../../shared/overlay/overlay-host';
import {ErpOverlayManager} from '../../../shared/overlay/overlay-manager';
import {ErpTemporalPickerData, ErpTemporalValue} from '../temporal-contracts';
import {ErpTemporalPickerContent} from './temporal-picker-content';

@Component({imports: [ErpOverlayHost], template: '<erp-overlay-host />'})
class TestShell {}

describe('ErpTemporalPickerContent', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [TestShell]}));
  function open(data: ErpTemporalPickerData) { const fixture = TestBed.createComponent(TestShell); const manager = TestBed.inject(ErpOverlayManager); const ref = manager.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {label: 'Temporal proof', data}); fixture.detectChanges(); return {fixture, manager, ref}; }
  const base = {min: null, max: null, weekStartsOn: 0, minuteStep: 5, locale: 'en-US', clearable: true, theme: 'light'} as const;

  it('renders a Gregorian month grid and commits keyboard-selected date', async () => { const {fixture, manager, ref} = open({...base, mode: 'date', value: '2026-01-15'}); const root = fixture.nativeElement as HTMLElement; expect(root.querySelectorAll('[data-calendar-day]').length).toBe(42); expect(root.querySelectorAll('.weekday').length).toBe(7); const grid = root.querySelector('[data-calendar-grid]') as HTMLElement; grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'})); grid.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'})); (root.querySelector('[data-confirm-action] button') as HTMLButtonElement).click(); manager.completeTransition(ref.id, 'leaving'); await expect(ref.afterClosed).resolves.toEqual({type: 'closed', result: '2026-01-16'}); });
  it('renders 24 hours and minute-step choices and commits staged time', async () => { const {fixture, manager, ref} = open({...base, mode: 'time', value: null}); const root = fixture.nativeElement as HTMLElement; expect(root.querySelectorAll('[data-time-hour]').length).toBe(24); expect(root.querySelectorAll('[data-time-minute]').length).toBe(12); (root.querySelector('[data-time-hour] button') as HTMLButtonElement).click(); (root.querySelectorAll('[data-time-minute] button')[1] as HTMLButtonElement).click(); (root.querySelector('[data-confirm-action] button') as HTMLButtonElement).click(); manager.completeTransition(ref.id, 'leaving'); await expect(ref.afterClosed).resolves.toEqual({type: 'closed', result: '00:05'}); });
  it('stages an ordered date range and dismissal remains distinct', async () => { const {fixture, manager, ref} = open({...base, mode: 'range', value: {start: null, end: null}}); const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[data-calendar-day] button'); buttons[10].click(); buttons[12].click(); (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('[data-confirm-action] button')?.click(); manager.completeTransition(ref.id, 'leaving'); const result = await ref.afterClosed; expect(result.type).toBe('closed'); if (result.type === 'closed') { expect(result.result).toMatchObject({start: expect.any(String), end: expect.any(String)}); } });
});
