import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxDotCalendarModule } from 'ngx-dot-calendar';
import { HeaderComponent } from './header/header.component';
import { ModuleComponent } from './module/module.component';
import { StandaloneComponent } from './standalone/standalone.component';

const routes: Route[] = [
  { path: '', redirectTo: 'module', pathMatch: 'full' },
  { path: 'module', component: ModuleComponent },
  { path: 'standalone', component: StandaloneComponent },
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, ModuleComponent],
  imports: [BrowserModule, NgxDotCalendarModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
