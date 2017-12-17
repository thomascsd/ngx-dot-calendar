import { Component, OnInit } from '@angular/core';
import { DateContent } from './calendar/interfaces/DateContent';

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
        day: '2017-12-01',
        hasContent: true
      },
      {
        day: '2017-12-12',
        hasContent: true
      }
    ];
  }

  setDate(evt) {}
}
