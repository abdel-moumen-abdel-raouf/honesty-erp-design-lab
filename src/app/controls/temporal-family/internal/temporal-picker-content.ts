import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ErpButton} from '../../button/button';
import {ErpGrid} from '../../../primitives/grid/grid';
import {ErpInline} from '../../../primitives/inline/inline';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpText} from '../../../primitives/text/text';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from '../../../shared/overlay/overlay-tokens';
import {ErpOverlayRef} from '../../../shared/overlay/overlay-ref';
import {
  ErpDateRangeValue,
  ErpTemporalPickerData,
  ErpTemporalValue,
} from '../temporal-contracts';
import {addDays, addMonths, padTemporal, parseIsoDate, toIsoDate} from '../temporal-utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-temporal-picker-content',
  imports: [ErpButton, ErpGrid, ErpInline, ErpStack, ErpText],
  templateUrl: './temporal-picker-content.html',
  styleUrl: './temporal-picker-content.scss',
  host: {'[attr.data-temporal-picker-mode]': 'data.mode'},
})
export class ErpTemporalPickerContent {
  readonly data = inject(ERP_OVERLAY_DATA) as ErpTemporalPickerData;
  private readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<ErpTemporalValue>;
  private readonly today = toIsoDate(new Date());
  private readonly initialDate = this.resolveInitialDate();

  protected readonly cursor = signal(this.initialDate);
  protected readonly monthAnchor = signal(this.initialDate.slice(0, 7) + '-01');
  protected readonly stagedDate = signal(this.resolveStagedDate());
  protected readonly stagedHour = signal(this.resolveTimePart(0));
  protected readonly stagedMinute = signal(this.resolveTimePart(1));
  protected readonly stagedRange = signal(this.resolveRange());
  protected readonly hours = Array.from({length: 24}, (_, value) => padTemporal(value));
  protected readonly minutes = computed(() => {
    const step = Math.max(1, Math.min(60, Math.trunc(this.data.minuteStep)));
    return Array.from({length: Math.ceil(60 / step)}, (_, index) => padTemporal(index * step));
  });
  protected readonly calendarVisible = this.data.mode !== 'time';
  protected readonly timeVisible = this.data.mode === 'time' || this.data.mode === 'datetime';
  protected readonly monthLabel = computed(() =>
    new Intl.DateTimeFormat(this.data.locale ?? undefined, {month: 'long', year: 'numeric'}).format(parseIsoDate(this.monthAnchor()) as Date),
  );
  protected readonly weekdayHeaders = computed(() => {
    const formatter = new Intl.DateTimeFormat(this.data.locale ?? undefined, {weekday: 'short'});
    const sunday = new Date(2024, 0, 7);
    return Array.from({length: 7}, (_, offset) => {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + ((this.data.weekStartsOn + offset) % 7));
      return formatter.format(day);
    });
  });
  protected readonly calendarDays = computed(() => {
    const first = parseIsoDate(this.monthAnchor()) as Date;
    const offset = (first.getDay() - this.data.weekStartsOn + 7) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    return Array.from({length: 42}, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return toIsoDate(date);
    });
  });

  protected previousMonth(): void {
    this.moveMonth(-1);
  }

  protected nextMonth(): void {
    this.moveMonth(1);
  }

  protected selectToday(): void {
    this.cursor.set(this.today);
    this.monthAnchor.set(this.today.slice(0, 7) + '-01');
    this.selectDate(this.today);
  }

  protected selectDate(value: string): void {
    if (this.dateDisabled(value)) return;
    this.cursor.set(value);
    if (this.data.mode === 'range') {
      const range = this.stagedRange();
      this.stagedRange.set(
        range.start === null || range.end !== null
          ? {start: value, end: null}
          : value >= range.start
            ? {start: range.start, end: value}
            : {start: value, end: null},
      );
    } else {
      this.stagedDate.set(value);
    }
  }

  protected selectHour(value: string): void {
    this.stagedHour.set(value);
  }

  protected selectMinute(value: string): void {
    this.stagedMinute.set(value);
  }

  protected handleCalendarKeydown(event: KeyboardEvent): void {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => this.moveCursor(-1),
      ArrowRight: () => this.moveCursor(1),
      ArrowUp: () => this.moveCursor(-7),
      ArrowDown: () => this.moveCursor(7),
      Home: () => this.moveToWeekEdge(false),
      End: () => this.moveToWeekEdge(true),
      PageUp: () => this.moveCursorMonth(-1),
      PageDown: () => this.moveCursorMonth(1),
      Enter: () => this.selectDate(this.cursor()),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  protected clear(): void {
    this.stagedDate.set(null);
    this.stagedHour.set(null);
    this.stagedMinute.set(null);
    this.stagedRange.set({start: null, end: null});
  }

  protected cancel(): void {
    this.ref.dismiss('cancel');
  }

  protected confirm(): void {
    let value: ErpTemporalValue;
    if (this.data.mode === 'range') {
      value = this.stagedRange();
    } else if (this.data.mode === 'time') {
      value = this.timeValue();
    } else if (this.data.mode === 'datetime') {
      const date = this.stagedDate();
      const time = this.timeValue();
      value = date && time ? `${date}T${time}` : null;
    } else {
      value = this.stagedDate();
    }
    this.ref.close(value);
  }

  protected dateDisabled(value: string): boolean {
    const min = this.data.min?.split('T')[0] ?? null;
    const max = this.data.max?.split('T')[0] ?? null;
    return (min !== null && value < min) || (max !== null && value > max);
  }

  protected dateSelected(value: string): boolean {
    if (this.data.mode === 'range') {
      const range = this.stagedRange();
      return value === range.start || value === range.end;
    }
    return this.stagedDate() === value;
  }

  protected dateInRange(value: string): boolean {
    const range = this.stagedRange();
    return Boolean(range.start && range.end && value > range.start && value < range.end);
  }

  protected inCurrentMonth(value: string): boolean {
    return value.slice(0, 7) === this.monthAnchor().slice(0, 7);
  }

  protected dayLabel(value: string): string {
    return String((parseIsoDate(value) as Date).getDate());
  }

  private resolveInitialDate(): string {
    const value = this.data.value;
    const date = typeof value === 'string' ? value.split('T')[0] : value?.start;
    return parseIsoDate(date ?? '') ? (date as string) : this.today;
  }

  private resolveStagedDate(): string | null {
    return typeof this.data.value === 'string' && this.data.mode !== 'time'
      ? this.data.value.split('T')[0]
      : null;
  }

  private resolveTimePart(index: number): string | null {
    const value = typeof this.data.value === 'string' ? this.data.value : null;
    const time = this.data.mode === 'datetime' ? value?.split('T')[1] : value;
    return time?.split(':')[index] ?? null;
  }

  private resolveRange(): ErpDateRangeValue {
    return typeof this.data.value === 'object' && this.data.value !== null
      ? {...this.data.value}
      : {start: null, end: null};
  }

  private timeValue(): string | null {
    const hour = this.stagedHour();
    const minute = this.stagedMinute();
    return hour && minute ? `${hour}:${minute}` : null;
  }

  private moveMonth(amount: number): void {
    const next = addMonths(this.monthAnchor(), amount).slice(0, 7) + '-01';
    this.monthAnchor.set(next);
  }

  private moveCursor(amount: number): void {
    const next = addDays(this.cursor(), amount);
    if (!this.dateDisabled(next)) {
      this.cursor.set(next);
      this.monthAnchor.set(next.slice(0, 7) + '-01');
    }
  }

  private moveCursorMonth(amount: number): void {
    const next = addMonths(this.cursor(), amount);
    if (!this.dateDisabled(next)) {
      this.cursor.set(next);
      this.monthAnchor.set(next.slice(0, 7) + '-01');
    }
  }

  private moveToWeekEdge(end: boolean): void {
    const date = parseIsoDate(this.cursor()) as Date;
    const offset = (date.getDay() - this.data.weekStartsOn + 7) % 7;
    this.moveCursor(end ? 6 - offset : -offset);
  }
}
