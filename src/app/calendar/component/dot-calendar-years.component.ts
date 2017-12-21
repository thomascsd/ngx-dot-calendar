import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import * as moment from 'moment';
import locale = moment.locale;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dot-calendar-years',
  templateUrl: './dot-calendar-years.component.html',
  styleUrls: ['dot-calendar-years.scss']
})
export class DotCalendarYearsComponent implements OnInit, AfterViewInit {
  months: Array<Object>;

  @Input() locale: string;
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
        return {
          val: moment()
            .locale(this.locale)
            .month(i)
            .format('MMM'),
          key: i + 1
        };
      });
  }

  ngAfterViewInit() {
    // bring year calendar to the first view of user
    this.yc.nativeElement.scrollIntoView({
      block: 'start',
      behaviour: 'smooth'
    });
  }

  showMonths(year: number): void {
    this.yearCalendar = year.toString();
  }

  backToCalendar(year: number, month: number): void {
    const m_ = month < 10 ? '0' + month.toString() : month.toString();
    const selectedDate = moment(year.toString() + '-' + m_ + '-01').format(
      'YYYY-MM-DD'
    );
    this.showCalendar.emit(selectedDate);
  }
}
