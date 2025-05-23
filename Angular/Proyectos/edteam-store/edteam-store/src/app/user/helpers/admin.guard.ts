import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {  
  const router = inject(Router);

  // Verificar si el usuario está autenticado


  // Usuario no autenticado, redirigir al componente de inicio de sesión
  router.navigate(['']);
  return false;
};
