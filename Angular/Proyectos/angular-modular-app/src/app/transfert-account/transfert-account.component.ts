import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators,  } from '@angular/forms';

@Component({
  selector: 'app-transfert-account',
  standalone: false,
  templateUrl: './transfert-account.component.html',
  styleUrl: './transfert-account.component.css'
})


export class TransfertAccountComponent {

  // private readonly formBuilder = inject(FormBuilder);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  beneficiaryInfoFormGroup: FormGroup = this.formBuilder.group({
    beneficiaryName: ['', Validators.required],
    beneficiaryAccountNumber: ['', Validators.required]
  });

  formGroup = this.formBuilder.group({
    beneficiaryInfo: this.beneficiaryInfoFormGroup,
    amount: ['', Validators.required],
  })

  onSubmit() {
    console.log(this.formGroup.value);
  }

  get beneficiaryNameField(): FormControl<string> {
    return this.formGroup.controls['beneficiaryInfo'].controls['beneficiaryName'].value as FormControl<string>;
  }

  get accountNumber() {
    return this.formGroup.controls['beneficiaryInfo'].controls['beneficiaryAccountNumber'].value;
  }

  get amountField() {
    return this.formGroup.controls.amount;
  }

}
