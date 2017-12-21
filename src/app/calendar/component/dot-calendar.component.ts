import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DateRenderer } from '../interfaces/DateRenderer';
import { DateContent } from '../interfaces/DateContent';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dot-calendar',
  templateUrl: './dot-calendar.component.html',
  styleUrls: ['dot-calendar.scss']
})
export class DotCalendarComponent implements OnInit {
  selectedDate: string = moment().format('YYYY-MM-DD');
  dateOutput: string;
  selectedYear: string;
  selectedDay: string;
  selectedMonth: string;
  selectedDayStr: string;
  selectedMonthStr: string;
  monthCalendarStr: string;
  monthCalendar: number;
  yearCalendar: string;
  changeViewOptions = false;
  dates: Object[];
  weeks: number[];
  viewCalendar = true;
  now = new Date();

  @Input() placeholder = '';
  @Input() dayLabels: string[];
  @Input() locale = 'en-ca';
  @Input() format = 'YYYY-MM-DD';
  @Input() id = '';
  @Input() name = '';
  @Input() idatePickerBinding: any = '';
  @Input() sundayHighlight = false;
  @Input() minYear = 2017;
  @Input() maxYear = this.now.getFullYear() + 3;
  @Input() disabled = false;
  @Input() disableDays: number[] = [];
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() dateContents: DateContent[] = [];

  @Output() getSelectedDate: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.maxYear < this.minYear) {
      throw new Error(
        'Invalid attribute value: maxYear must be greater than or equal to minYear'
      );
    }

    if (this.idatePickerBinding !== '') {
      this.selectDate(this.idatePickerBinding);
    }
    this.formatDateStr();
    this.setCalendarProps();
    this.renderCalendar();
  }

  private setCalendarProps(): void {
    this.monthCalendar = parseInt(this.selectedMonth, 10);
    this.yearCalendar = this.selectedYear;
  }

  renderCalendar(): void {
    this.monthCalendarStr = moment()
      .locale(this.locale)
      .month(this.monthCalendar - 1)
      .format('MMMM');

    this.dates = this.populateDate();
    this.dates = this.getDateChunk(this.dates, 7);
    this.weeks = Array(this.dates.length)
      .fill(0)
      .map((e, i) => i);
  }

  formatDateStr(): void {
    this.selectedDay = moment(this.selectedDate)
      .locale(this.locale)
      .format('DD');

    this.selectedDayStr = moment(this.selectedDate)
      .locale(this.locale)
      .format('ddd');

    this.selectedMonth = moment(this.selectedDate)
      .locale(this.locale)
      .format('MM');

    this.selectedMonthStr = moment()
      .locale(this.locale)
      .month(parseInt(this.selectedMonth, 10) - 1)
      .format('MMM');

    this.selectedYear = moment(this.selectedDate)
      .locale(this.locale)
      .format('YYYY');
  }

  populateDate(): Object[] {
    const lastDate = this.getLastDate();
    const monthCalendar = this.monthCalendar.toString();
    const calendarIdentifier =
      this.yearCalendar +
      '-' +
      (monthCalendar.length === 1 ? '0' + monthCalendar : monthCalendar);
    const calendarDate = Array(lastDate)
      .fill(0)
      .map((e, i) => {
        const date = (i + 1).toString();
        const dateStr =
          calendarIdentifier + '-' + (date.length === 1 ? '0' + date : date);
        const dayName = moment(dateStr).format('dddd');
        const dayOfWeek = parseInt(moment(dateStr).format('e'), 10);
        const arr = this.disableDays;
        const disabled =
          moment(dateStr) < this.minDate ||
          moment(dateStr) > this.maxDate ||
          arr.includes(dayOfWeek);
        const hasContents = this.dateContents
          .filter(item => item.day === dateStr)
          .map(item => item.hasContent);
        let hasContent = false;

        if (hasContents.length > 0) {
          hasContent = hasContents[0];
        }

        return [
          {
            day: dayName,
            date: i + 1,
            meta: dateStr,
            disabled: disabled,
            hasContent: hasContent
          } as DateRenderer
        ];
      });

    const firstDay = moment(calendarIdentifier + '-01').format('dddd');
    const lastDay = moment(calendarIdentifier + '-' + lastDate).format('dddd');
    switch (firstDay) {
      case 'Tuesday':
        calendarDate.unshift([null]);
        break;
      case 'Wednesday':
        calendarDate.unshift([null], [null]);
        break;
      case 'Thursday':
        calendarDate.unshift([null], [null], [null]);
        break;
      case 'Friday':
        calendarDate.unshift([null], [null], [null], [null]);
        break;
      case 'Saturday':
        calendarDate.unshift([null], [null], [null], [null], [null]);
        break;
      case 'Sunday':
        calendarDate.unshift([null], [null], [null], [null], [null], [null]);
        break;
    }

    switch (lastDay) {
      case 'Saturday':
        calendarDate.push([null]);
        break;
      case 'Friday':
        calendarDate.push([null], [null]);
        break;
      case 'Thursday':
        calendarDate.push([null], [null], [null]);
        break;
      case 'Wednesday':
        calendarDate.push([null], [null], [null], [null]);
        break;
      case 'Tuesday':
        calendarDate.push([null], [null], [null], [null], [null]);
        break;
      case 'Monday':
        calendarDate.push([null], [null], [null], [null], [null], [null]);
        break;
    }

    return calendarDate;
  }

  getLastDate(): number {
    return parseInt(
      moment([this.yearCalendar, 0, 31])
        .month(this.monthCalendar - 1)
        .format('DD'),
      10
    );
  }

  // Split array of dates into chunk
  private getDateChunk(date: Object[], size: number): Array<Object> {
    const results = [];
    while (date.length) {
      results.push(date.splice(0, size));
    }
    return results;
  }
  selectDate(event: string): void {
    this.selectedDate = moment(event).format('YYYY-MM-DD');
    this.formatDateStr();
    this.dateOutput = moment(this.selectedDate)
      .locale(this.locale)
      .format(this.format);

    // Emit selection event
    this.getSelectedDate.emit(this.dateOutput);
  }

  changeCalendar(direction: string): void {
    if (direction === 'prev') {
      if (this.monthCalendar === 1) {
        const yearCalendar = parseInt(this.yearCalendar, 10) - 1;
        this.yearCalendar = yearCalendar.toString();
        this.monthCalendar = 12;
      } else {
        this.monthCalendar -= 1;
      }
    }

    if (direction === 'next') {
      if (this.monthCalendar === 12) {
        const yearCalendar = parseInt(this.yearCalendar, 10) + 1;
        this.yearCalendar = yearCalendar.toString();
        this.monthCalendar = 1;
      } else {
        this.monthCalendar += 1;
      }
    }
    this.formatDateStr();
    this.renderCalendar();
  }

  viewOptions(): void {
    this.changeViewOptions = !this.changeViewOptions;
  }

  viewBack(event: string): void {
    this.selectDate(event);
    this.setCalendarProps();
    this.renderCalendar();
    this.viewOptions();
  }
}
