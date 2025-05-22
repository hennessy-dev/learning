import { HttpInterceptorFn, HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

// export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);

// };

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404){
          console.error('recurso no encontrado: ', error.message);
        }
        return throwError(() => new Error('Testing Errors'));
      })
    )
  }


}
