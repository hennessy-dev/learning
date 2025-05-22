import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})

export class CounterComponent {

  @Input({ required: true }) initialValue: number = 0;
  currentValue: number = 0;

  ngOnChanges(changes: SimpleChanges):void {
    if('initialValue' in changes){
      this.currentValue = changes['initialValue'].currentValue;
      console.log(`Valor actual: ${this.currentValue}`);
    }
    console.log(`el metodo ngOnChanges ha sido invocado.`);
  }



}
