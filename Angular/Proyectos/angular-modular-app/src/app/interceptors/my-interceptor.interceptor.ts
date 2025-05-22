import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export const myInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class MyInterceptor implements HttpInterceptor{

  // !* Intercepta las solicitudes HTTP y agrega un contenido personalizado en el encabezado.


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedRequest = req.clone({
      setHeaders: {
        'X-App-Version':'1.0.0'
      }
    });

    //!* se pasa la solicitud al siguiente manejador HTTP
    return next.handle(modifiedRequest);
  }
}