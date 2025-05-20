import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'angular-modular-app';

  result: number = 0;

  getEventEmitter(e: number):void {
    this.result = e;
  }

  ngOnInit(): void {
    initFlowbite();
  }

}
