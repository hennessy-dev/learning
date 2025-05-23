import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../../interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }
 
  login(): void {
    if (this.form.invalid) {
      return;
    }
    const credentials: LoginRequest = this.form.value;

    this.authService.login(credentials).subscribe({
      next: () => {       
        this.showSnackBar('Inicio de sesión exitoso');
        this.router.navigate(['home']); 
      },
      error: () => {        
        this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      },
    });
  }

  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
