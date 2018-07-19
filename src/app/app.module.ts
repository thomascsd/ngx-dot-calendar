import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxDotCalendarModule } from '../../projects/ngx-dot-calendar/src/public_api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxDotCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
