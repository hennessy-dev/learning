import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  ngOnInit(): void {
    console.log('El componente HomeComponent se ha inicializado.');
  }

  ngOnDestroy(): void {
    console.log('El componente HomeComponent se ha destruido.');
  }

}
