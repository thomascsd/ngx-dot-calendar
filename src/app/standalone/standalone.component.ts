import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standalone',
  standalone: true,
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css'],
})
export class StandaloneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
