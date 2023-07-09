import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDotCalendarComponent } from './components/ngx-dot-calendar.component';
import { NgxDotCalendarDatesComponent } from './components/ngx-dot-calendar-dates.component';
import { NgxDotCalendarYearsComponent } from './components/ngx-dot-calendar-years.component';
import { DateHighlight } from './directive/dateHighlight.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    NgxDotCalendarComponent,
    NgxDotCalendarDatesComponent,
    NgxDotCalendarYearsComponent,
    DateHighlight,
  ],
  exports: [NgxDotCalendarComponent],
})
export class NgxDotCalendarModule {}
