import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormReactiveRoutingModule } from './form-reactive-routing.module';
import { FormReactiveComponent } from './form-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormReactiveComponent
  ],
  imports: [
    CommonModule,
    FormReactiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormReactiveModule { }
