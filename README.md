# @thomascsd/ngx-dot-calendar

![npm version](https://badgen.net/npm/v/@thomascsd/ngx-dot-calendar) ![](https://badgen.net/badge/license/MIT/blue)

The project fork from [az-idatepicker
](https://github.com/doenikoe/az-idatepicker)

![Screenshot](https://raw.githubusercontent.com/thomascsd/ngx-dot-calendar/master/screenshot.png)

## Feature

- Support RWD
- Display dot based on whether has data

# Install

1. install module:

```
npm install @thomascsd/ngx-dot-calendar
```

2. Install peer dependencies:

```
npm install date-fns
```

# Usage

In app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxDotCalendarModule } from '@thomascsd/ngx-dot-calendar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxDotCalendarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<ngx-dot-calendar [dateContents]="dateContents" (onSelect)="setDate($event)"></ngx-dot-calendar>
```

# API

## Attributes

| Parameter          | Type          | Is Required | Default Value | Description                                                                                                                                             |
| ------------------ | ------------- | ----------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dateContents       | DateContent   | yes         | -             | Content of the date                                                                                                                                     |
| format             | string        | no          | YYYY-MM-DD    | The date format, default to 'YYYY-MM-DD'                                                                                                                |
| idatePickerBinding | any           | no          | -             | Binding for ngModel                                                                                                                                     |
| sundayHighlight    | boolean       | no          | false         | If true then `sunday` will have red color                                                                                                               |
| minYear            | number        | no          | 1970          | Minimum year                                                                                                                                            |
| maxYear            | number        | no          | 2020          | Maximum year                                                                                                                                            |
| disableDays        | Array<number> | no          | []            | Disable dates that in the defined day. Day must defined in ordered index (0=sunday, 1=monday, 2=tuesday, 3=wednesday, 4=thursday, 5=friday, 6=saturday) |

## Callback Events

| Name            | Return Type | Description          |
| --------------- | ----------- | -------------------- |
| getSelectedDate | string      | Return selected date |

## License

- License: MIT

## Author

- Author: thomascsd
