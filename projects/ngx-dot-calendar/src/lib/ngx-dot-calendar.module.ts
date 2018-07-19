import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgxDotCalendarComponent } from './component/ngx-dot-calendar.component';
import { NgxDotCalendarDatesComponent } from './component/ngx-dot-calendar-dates.component';
import { NgxDotCalendarYearsComponent } from './component/ngx-dot-calendar-years.component';
import { DateHighlight } from './directive/dateHighlight.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    NgxDotCalendarComponent,
    NgxDotCalendarDatesComponent,
    NgxDotCalendarYearsComponent,
    DateHighlight
  ],
  exports: [NgxDotCalendarComponent]
})
export class NgxDotCalendarModule {}
