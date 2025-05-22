import { Component } from '@angular/core';
import { identity } from 'rxjs';

@Component({
  selector: 'app-my-component',
  standalone: false,
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css'
})

export class MyComponentComponent {

  meGusta: boolean = false;

  darMeGusta() {
    this.meGusta = !this.meGusta;
  }

  productos: any[] = [
    { id: 1, nombre: 'Camisa', precio: 25 },
    { id: 2, nombre: 'Pantalón', precio: 40 },
    { id: 3, nombre: 'Zapatos', precio: 45 }
  ]

  estado: string = 'pendiente';

  cambiarEstado(nuevoEstado: string) {
    this.estado = nuevoEstado;
  }

}
