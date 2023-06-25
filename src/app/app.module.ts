import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxDotCalendarModule } from 'ngx-dot-calendar';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, NgxDotCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
