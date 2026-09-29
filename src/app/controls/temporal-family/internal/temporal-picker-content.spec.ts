import {Component} from '@angular/core';
import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import {ErpOverlayHost} from '../../../shared/overlay/overlay-host';
import {ErpOverlayManager} from '../../../shared/overlay/overlay-manager';
import {
  createTemporalOverlayFooter,
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
  } as const;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [TestShell],
    deferBlockBehavior: DeferBlockBehavior.Manual,
  }));

  async function open(data: ErpTemporalPickerData) {
    const fixture = TestBed.createComponent(TestShell);
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open<
      ErpTemporalPickerContent,
      ErpTemporalPickerData,
      ErpTemporalValue
    >(ErpTemporalPickerContent, {
      frame: {
        header: {title: 'Temporal proof', subtitle: 'Supporting text', icon: 'calendar'},
        footer: createTemporalOverlayFooter(
          data.mode,
          data.clearable,
          data.actionLabels,
        ),
      },
      data,
    });
    fixture.detectChanges();
    const [frameBlock] = await fixture.getDeferBlocks();
    await frameBlock.render(DeferBlockState.Complete);
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
    const {fixture, manager, ref} = await open({
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
    (root.querySelector('[data-overlay-frame-action-id="confirm"] button') as HTMLButtonElement).click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: '2026-01-16',
    });
  });

  it('uses the Arabic action contract and commits staged time', async () => {
    const {fixture, manager, ref} = await open({...base, mode: 'time', value: null});
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-time-hour]').length).toBe(24);
    expect(root.querySelectorAll('[data-time-minute]').length).toBe(12);
    expect(root.textContent).toContain('الساعة');
    expect(root.textContent).toContain('الدقيقة');
    expect(root.textContent).toContain('إلغاء');
    expect(root.textContent).toContain('تأكيد');
    (root.querySelector('[data-time-hour] button') as HTMLButtonElement).click();
    (root.querySelectorAll('[data-time-minute] button')[1] as HTMLButtonElement).click();
    (root.querySelector('[data-overlay-frame-action-id="confirm"] button') as HTMLButtonElement).click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: '00:05',
    });
  });

  it('uses shared frame actions and removes duplicate body footer chrome', async () => {
    const {fixture, manager, ref} = await open({
      ...base,
      mode: 'date',
      value: '2026-01-15',
    });
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-confirm-action]')).toBeNull();
    expect(root.querySelector('[data-cancel-action]')).toBeNull();
    expect(root.querySelector('.picker-actions')).toBeNull();
    expect(root.querySelector('[data-overlay-frame-action-id="today"]')).not.toBeNull();
    const clear = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="clear"] button',
    ) as HTMLButtonElement;
    expect(clear.disabled).toBe(false);
    clear.click();
    fixture.detectChanges();
    expect(clear.disabled).toBe(true);

    root
      .querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="cancel"] button')
      ?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'cancel',
    });
  });

  it('keeps Today out of Time mode and disables invalid Today dates', async () => {
    const time = await open({...base, mode: 'time', value: null});
    expect(
      (time.fixture.nativeElement as HTMLElement).querySelector(
        '[data-overlay-frame-action-id="today"]',
      ),
    ).toBeNull();
    time.ref.dismiss('test-cleanup');
    time.manager.completeTransition(time.ref.id, 'leaving');
    time.fixture.destroy();

    const constrained = await open({
      ...base,
      mode: 'date',
      value: null,
      min: '2099-01-01',
    });
    const today = (constrained.fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="today"] button',
    ) as HTMLButtonElement;
    expect(today.disabled).toBe(true);
  });

  it('previews forward and backward ranges, moves the preview, and clears it on leave', async () => {
    const {fixture} = await open({
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
    const {fixture, manager, ref} = await open({
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

    (root.querySelector('[data-overlay-frame-action-id="confirm"] button') as HTMLButtonElement).click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {start: '2026-01-03', end: '2026-01-12'},
    });
  });

  it('previews keyboard movement from the anchor and Enter stores the endpoint', async () => {
    const {fixture} = await open({
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

  it('does not stage a disabled date', async () => {
    const {fixture} = await open({
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

  it('keeps Confirm disabled until Time has both hour and minute while Cancel remains enabled', async () => {
    const {fixture} = await open({...base, mode: 'time', value: null});
    const root = fixture.nativeElement as HTMLElement;
    const confirm = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;
    const cancel = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="cancel"] button',
    ) as HTMLButtonElement;

    expect(confirm.disabled).toBe(true);
    expect(cancel.disabled).toBe(false);

    (root.querySelector('[data-time-hour] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(confirm.disabled).toBe(true);

    (root.querySelector('[data-time-minute] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(confirm.disabled).toBe(false);
  });

  it('keeps Confirm disabled until a DateRange has both endpoints', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 29, 12, 0));

    const {fixture} = await open({
      ...base,
      mode: 'range',
      value: {start: null, end: null},
    });
    const root = fixture.nativeElement as HTMLElement;
    const confirm = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;

    expect(confirm.disabled).toBe(true);
    clickDay(root, '2026-09-10');
    fixture.detectChanges();
    expect(confirm.disabled).toBe(true);
    clickDay(root, '2026-09-12');
    fixture.detectChanges();
    expect(confirm.disabled).toBe(false);

    vi.useRealTimers();
  });

  it('provides Now for Time and DateTime and respects minuteStep by flooring minutes', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 29, 13, 32));

    const time = await open({
      ...base,
      mode: 'time',
      value: null,
      minuteStep: 5,
    });
    const timeRoot = time.fixture.nativeElement as HTMLElement;
    const now = timeRoot.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="now"] button',
    ) as HTMLButtonElement;
    expect(now).toBeTruthy();
    now.click();
    time.fixture.detectChanges();
    const confirm = timeRoot.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;
    expect(confirm.disabled).toBe(false);
    confirm.click();
    time.manager.completeTransition(time.ref.id, 'leaving');
    await expect(time.ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: '13:30',
    });

    const dateTime = await open({
      ...base,
      mode: 'datetime',
      value: null,
      minuteStep: 5,
    });
    const dateTimeRoot = dateTime.fixture.nativeElement as HTMLElement;
    (
      dateTimeRoot.querySelector(
        '[data-overlay-frame-action-id="now"] button',
      ) as HTMLButtonElement
    ).click();
    dateTime.fixture.detectChanges();
    (
      dateTimeRoot.querySelector(
        '[data-overlay-frame-action-id="confirm"] button',
      ) as HTMLButtonElement
    ).click();
    dateTime.manager.completeTransition(dateTime.ref.id, 'leaving');
    await expect(dateTime.ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: '2026-09-29T13:30',
    });

    vi.useRealTimers();
  });

  it('provides complete previous/next week and month DateRange presets', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 29, 12, 0));
    const {fixture, manager, ref} = await open({
      ...base,
      mode: 'range',
      value: {start: null, end: null},
      weekStartsOn: 0,
    });
    const root = fixture.nativeElement as HTMLElement;

    for (const action of [
      'previous-week',
      'next-week',
      'previous-month-range',
      'next-month-range',
    ]) {
      expect(
        root.querySelector(
          `[data-overlay-frame-action-id="${action}"]`,
        ),
      ).not.toBeNull();
    }

    (
      root.querySelector(
        '[data-overlay-frame-action-id="previous-week"] button',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    const confirm = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;
    expect(confirm.disabled).toBe(false);
    confirm.click();
    manager.completeTransition(ref.id, 'leaving');
    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {start: '2026-09-20', end: '2026-09-26'},
    });

    vi.useRealTimers();
  });


  it('keeps Confirm disabled when staged Time violates min/max bounds', async () => {
    const {fixture} = await open({
      ...base,
      mode: 'time',
      value: null,
      min: '09:00',
      max: '17:00',
    });
    const root = fixture.nativeElement as HTMLElement;

    (root.querySelector('[data-time-hour] button') as HTMLButtonElement).click();
    (root.querySelector('[data-time-minute] button') as HTMLButtonElement).click();
    fixture.detectChanges();

    const confirm = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;

    expect(
      root.querySelector('[data-time-hour][data-selected="true"]')?.textContent?.trim(),
    ).toBe('00');
    expect(confirm.disabled).toBe(true);
  });

});
