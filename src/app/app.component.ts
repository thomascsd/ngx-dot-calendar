import { Component, OnInit } from '@angular/core';
import { DateContent } from 'ngx-dot-calendar';

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
        hasContent: true
      },
      {
        day: '2018-07-12',
        hasContent: true
      }
    ];
  }

  setDate(evt) {}
}
