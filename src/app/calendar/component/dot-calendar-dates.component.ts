import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dot-calendar-dates',
  templateUrl: './dot-calendar-dates.component.html',
  styleUrls: ['dot-calendar-dates.sass']
})
export class DotCalendarDatesComponent implements OnInit {
  dateSymbol: string[];

  @Input() dayLabels: string[];
  @Input() weeks: number[];
  @Input() dates: Object[];
  @Input() selectedDate: string;
  @Input() sundayHighlight: boolean;

  @Output() setSelectedDate: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.dateSymbol = this.parseWeekDays();
  }

  parseWeekDays(): string[] {
    if (!this.dayLabels) {
      return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    }
    return this.dayLabels;
  }

  getIsSelected(date: string): boolean {
    return date === this.selectedDate;
  }

  selectDate(date: string): void {
    this.setSelectedDate.emit(date);
  }
}
