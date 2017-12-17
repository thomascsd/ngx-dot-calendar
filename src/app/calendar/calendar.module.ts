import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DotCalendarComponent } from './component/dot-calendar.component';
import { DotCalendarDatesComponent } from './component/dot-calendar-dates.component';
import { DotCalendarYearsComponent } from './component/dot-calendar-years.component';
import { DateHighlight } from './directive/dateHighlight.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    DotCalendarComponent,
    DotCalendarDatesComponent,
    DotCalendarYearsComponent,
    DateHighlight
  ],
  exports: [DotCalendarComponent]
})
export class IDatePickerModule {}
