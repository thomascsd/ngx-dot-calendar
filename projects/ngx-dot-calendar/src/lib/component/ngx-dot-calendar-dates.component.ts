import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dot-calendar-dates',
  templateUrl: './ngx-dot-calendar-dates.component.html',
  styleUrls: ['ngx-dot-calendar-dates.scss']
})
export class NgxDotCalendarDatesComponent implements OnInit {
  dateSymbol: string[];

  @Input() weeks: number[];
  @Input() locale: string;
  @Input() dates: Object[];
  @Input() selectedDate: string;
  @Input() sundayHighlight: boolean;

  @Output() setSelectedDate: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.dateSymbol = this.parseWeekDays();
  }

  parseWeekDays(): string[] {
    /*const weekDays: string[] = [];
    const d = new Date();

    while (d.getDay() > 0) {
      d.setDate(d.getDate() + 1);
    }

    while (weekDays.length < 7) {
      weekDays.push(d.toLocaleString(this.locale, { weekday: 'short' }));
      d.setDate(d.getDate() + 1);
    }*/

    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  }

  getIsSelected(date: string): boolean {
    return date === this.selectedDate;
  }

  selectDate(date: string): void {
    this.setSelectedDate.emit(date);
  }
}
