# ngx-dot-calendar

The project fork from [az-idatepicker
](https://github.com/doenikoe/az-idatepicker)

## Feature

- support RWD
- display dot based on whelter has data

# Install

```
npm install ngx-dot-calendar
```
In app.module.ts
``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxDotCalendarModule } from 'ngx-dot-calendar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxDotCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```


## License

- License: MIT

## Author

- Author: thomascsd
