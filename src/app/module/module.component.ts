import { Component, OnInit } from '@angular/core';
import { DateContent, colorTypes } from 'ngx-dot-calendar';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {
  dateContents: DateContent[];

  ngOnInit(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const dMon = month < 10 ? '0' + month : month.toString();

    console.log(`date:${year}-${dMon}-01`);

    this.dateContents = [
      {
        day: `${year}-${dMon}-01`,
        hasContent: true,
        color: colorTypes.red,
      },
      {
        day: `${year}-${dMon}-06`,
        hasContent: true,
        color: colorTypes.blue,
      },
      {
        day: `${year}-${dMon}-11`,
        hasContent: true,
        color: colorTypes.green,
      },
      {
        day: `${year}-${dMon}-17`,
        hasContent: true,
        color: colorTypes.purple,
      },
      {
        day: `${year}-${dMon}-23`,
        hasContent: true,
        color: colorTypes.brown,
      },
    ];
  }

  setDate(evt) {}
}
