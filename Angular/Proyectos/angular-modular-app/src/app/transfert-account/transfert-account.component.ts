import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';

@Component({
  selector: 'app-transfert-account',
  standalone: false,
  templateUrl: './transfert-account.component.html',
  styleUrl: './transfert-account.component.css'
})


export class TransfertAccountComponent {

  private readonly formBuilder = inject(FormBuilder);

  beneficiaryInfoFormGroup: FormGroup = this.formBuilder.group({
    beneficiaryName: [''],
    beneficiaryAccountNumber: ['']
  });

  formGroup = this.formBuilder.group({
    beneficiaryInfo: this.beneficiaryInfoFormGroup,
    amount: [''],
  })

  onSubmit() {
    console.log(this.formGroup.value);
  }

}
