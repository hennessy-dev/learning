import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  standalone: false,
  templateUrl: './form-reactive.component.html',
  styleUrl: './form-reactive.component.css'
})

export class FormReactiveComponent {

  form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
  });

  onSubmit(){
    console.log(JSON.stringify(this.form.value));
  }

  

}
