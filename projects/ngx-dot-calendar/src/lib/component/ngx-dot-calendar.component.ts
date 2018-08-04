import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as momentNs from 'moment';
const moment = momentNs;
import { DateRenderer } from '../interfaces/DateRenderer';
import { DateContent, colorTypes } from '../interfaces/DateContent';
import {
  SelectedDateContext,
  selectedDateMode
} from '../interfaces/SelectedDateContext';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dot-calendar',
  templateUrl: './ngx-dot-calendar.component.html',
  styleUrls: ['ngx-dot-calendar.scss']
})
export class NgxDotCalendarComponent implements OnInit, OnChanges {
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

  @Input() dayLabels: string[];
  @Input() locale = 'en-ca';
  @Input() format = 'YYYY-MM-DD';
  @Input() id = '';
  @Input() idatePickerBinding: any = '';
  @Input() sundayHighlight = false;
  @Input() minYear = 2017;
  @Input() maxYear = this.now.getFullYear() + 3;
  @Input() disabled = false;
  @Input() disableDays: number[] = [];
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() dateContents: DateContent[] = [];

  @Output()
  getSelectedDate: EventEmitter<SelectedDateContext> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.idatePickerBinding !== '') {
      this.selectDate(this.idatePickerBinding);
    }

    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateContents']) {
      this.init();
    }
  }

  private init() {
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
          arr.indexOf(dayOfWeek) !== -1;
        const contents = this.dateContents
          .filter(item => item.day === dateStr)
          .map(item => {
            return {
              hasContent: item.hasContent,
              colorClassName: this.toColorClassName(item.color)
            };
          });
        let hasContent = false;
        let colorClassName = '';

        if (contents.length > 0) {
          hasContent = contents[0].hasContent;
          colorClassName = contents[0].colorClassName;
        }

        return [
          {
            day: dayName,
            date: i + 1,
            meta: dateStr,
            disabled: disabled,
            hasContent: hasContent,
            colorClassName: colorClassName
          } as DateRenderer
        ];
      });

    const firstDay = moment(calendarIdentifier + '-01').format('dddd');
    const lastDay = moment(calendarIdentifier + '-' + lastDate).format('dddd');
    switch (firstDay) {
      case 'Monday':
        calendarDate.unshift([null]);
        break;
      case 'Tuesday':
        calendarDate.unshift([null], [null]);
        break;
      case 'Wednesday':
        calendarDate.unshift([null], [null], [null]);
        break;
      case 'Thursday':
        calendarDate.unshift([null], [null], [null], [null]);
        break;
      case 'Friday':
        calendarDate.unshift([null], [null], [null], [null], [null]);
        break;
      case 'Saturday':
        calendarDate.unshift([null], [null], [null], [null], [null], [null]);
        break;
    }

    switch (lastDay) {
      case 'Friday':
        calendarDate.push([null]);
        break;
      case 'Thursday':
        calendarDate.push([null], [null]);
        break;
      case 'Wednesday':
        calendarDate.push([null], [null], [null]);
        break;
      case 'Tuesday':
        calendarDate.push([null], [null], [null], [null]);
        break;
      case 'Monday':
        calendarDate.push([null], [null], [null], [null], [null]);
        break;
      case 'Sunday':
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
    this.selectedDateInner(event);
    const context: SelectedDateContext = {
      selectedDate: this.dateOutput,
      selectedDateMode: selectedDateMode.fromDateClicked
    };

    // Emit selection event
    this.getSelectedDate.emit(context);
  }

  selectDate2(event: string) {
    this.selectedDateInner(event);
    const context: SelectedDateContext = {
      selectedDate: this.dateOutput,
      selectedDateMode: selectedDateMode.fromYearPicker
    };

    // Emit selection event
    this.getSelectedDate.emit(context);
  }

  private selectedDateInner(event: string) {
    this.selectedDate = moment(event).format('YYYY-MM-DD');
    this.formatDateStr();
    this.dateOutput = moment(this.selectedDate)
      .locale(this.locale)
      .format(this.format);
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
    this.selectDate2(event);
    this.setCalendarProps();
    this.renderCalendar();
    this.viewOptions();
  }

  toColorClassName(color: colorTypes) {
    return `circle-${colorTypes[color]}`;
  }
}
