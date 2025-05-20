import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {

  number1: number = 0;
  number2: number = 0;

  @Input()
  title: string = "";

  result: number = 0;

  @Output()
  emitter: EventEmitter<number> = new EventEmitter();


  calculate(operation: string) : void {

    switch (operation) {
      case "+":
        this.result = this.number1 + this.number2;
        break;

      case "-":
        this.result = this.number1 - this.number2;
        break;

      case "/":
        this.result = this.number1 / this.number2;
        break;

      case "*":
        this.result = this.number1 * this.number2;
        break;

      default:
        break;
    }

    this.emitter.emit(this.result);
  }
}
