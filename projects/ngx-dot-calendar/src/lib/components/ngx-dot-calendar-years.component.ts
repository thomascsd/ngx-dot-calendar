import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
// import * as dayjsNs from 'dayjs';
import { setMonth, format } from 'date-fns';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dot-calendar-years',
  templateUrl: './ngx-dot-calendar-years.component.html',
  styleUrls: ['ngx-dot-calendar-years.scss'],
})
export class NgxDotCalendarYearsComponent implements OnInit, AfterViewInit {
  months: Array<Object>;

  @Input() yearCalendar: string;
  @Input() minYear: number;
  @Input() maxYear: number;
  @Output() showCalendar: EventEmitter<string> = new EventEmitter();

  @ViewChild('yearCalendarInit') yc: ElementRef;
  numberOfyears: Array<number>;

  ngOnInit() {
    this.numberOfyears = Array(this.maxYear - this.minYear + 1)
      .fill(0)
      .map((e, i) => i);

    this.months = Array(12)
      .fill(0)
      .map((e, i) => {
        const month = setMonth(new Date(), i);
        const val = format(month, 'MMM');

        return {
          val: val,
          key: i + 1,
        };
      });
  }

  ngAfterViewInit() {
    // bring year calendar to the first view of user
    this.yc.nativeElement.scrollIntoView({
      block: 'start',
      behaviour: 'smooth',
    });
  }

  showMonths(year: number): void {
    this.yearCalendar = year.toString();
  }

  backToCalendar(year: number, month: number): void {
    const mon = month < 10 ? '0' + month.toString() : month.toString();
    // const selectedDate = dayjs(year.toString() + '-' + mon + '-01').format('YYYY-MM-DD');
    const selectedDate = `${year}-${mon}-01`;
    this.showCalendar.emit(selectedDate);
  }
}
