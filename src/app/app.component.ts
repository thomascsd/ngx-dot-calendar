import { Component, OnInit } from '@angular/core';
import { DateContent, colorTypes } from 'ngx-dot-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date = '2017/12/01';
  dateContents: DateContent[];

  ngOnInit(): void {
    this.dateContents = [
      {
        day: '2018-07-01',
        hasContent: true,
        color: colorTypes.red
      },
      {
        day: '2018-07-12',
        hasContent: true,
        color: colorTypes.blue
      }
    ];
  }

  setDate(evt) {}
}
