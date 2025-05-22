import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators,  } from '@angular/forms';
import Transaccion from './models/transaccion.model'

@Component({
  selector: 'app-transfert-account',
  standalone: false,
  templateUrl: './transfert-account.component.html',
  styleUrl: './transfert-account.component.css'
})


export class TransfertAccountComponent {
  transferencias: Transaccion[] = [];
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
    console.log('El componente de transferencia se ha inicializado');
  }

  ngOnDestroy(): void {
    console.log('El componente de transferencia se ha destruido.');
  }

  private async loadData() {
    this.loading = true;
    setTimeout(() => {
      this.transferencias = [
        {
          beneficiario: 'Pepito Perez Gil',
          monto: 12200,
          fecha: new Date()
        },
        {
          beneficiario: 'Marcos Perez Gil',
          monto: 12040,
          fecha: new Date()
        },
        {
          beneficiario: 'Carlos Perez Gil',
          monto: 11200,
          fecha: new Date()
        }
      ]
    }, 2000); //Simula una carga de 2s
  }


}
