import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appPasswordStrength]',
  standalone: false
})
export class PasswordStrengthDirective {

  element: ElementRef<HTMLInputElement> = inject(ElementRef);

  @HostListener('input') onInput():void {
    const password = this.element.nativeElement.value;
    this.validateStrength(password);
  }

  private validateStrength(password: string): void {
    if(password.length < 8) {
      console.log('Contraseña Debil');
      this.element.nativeElement.style.backgroundColor = 'red';
    }
  }

  constructor() {
    
  }

}
