import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'angular-standalone-app';
  isCheckedDefer = signal(false);

  constructor() {
    setInterval(() => {
      this.count.set(this.count() + 1);
    }, 1000)
  }

  fruit: string = 'Apple';
  fruits: string[] = ['Apple', 'Orange', 'Banana'];
  isApple: boolean = true;

  count = signal(0);
  doubleCount = computed(() => (this.count() * 2));
  name = signal('Juan David Contreras');

  increaseCount(){
    this.count.update( () => this.count() + 1 );
  }

  toggleFruit() {
    this.isApple = !this.isApple;
  }

}
