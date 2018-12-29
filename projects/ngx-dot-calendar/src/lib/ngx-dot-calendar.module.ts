import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDotCalendarComponent } from './component/ngx-dot-calendar.component';
import { NgxDotCalendarDatesComponent } from './component/ngx-dot-calendar-dates.component';
import { NgxDotCalendarYearsComponent } from './component/ngx-dot-calendar-years.component';
import { DateHighlight } from './directive/dateHighlight.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    NgxDotCalendarComponent,
    NgxDotCalendarDatesComponent,
    NgxDotCalendarYearsComponent,
    DateHighlight
  ],
  exports: [NgxDotCalendarComponent]
})
export class NgxDotCalendarModule {}
