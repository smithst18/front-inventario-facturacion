import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//services
import { UserService } from 'src/app/services/userController';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private userService:UserService,
    private _router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token  =  this.userService.getToken();
    if(token != null || token  != undefined){
      const header = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`${token}`,
      });
  
      const req = request.clone({
        headers:header,
      });

      return next.handle(req)
        .pipe(
          catchError(
            err =>{
              if(err.status == 401){
                alert('Sesion caducada');
                //cerramos sesion
                this.userService.closeSession();
                //redireccionamos a login 
                this._router.navigateByUrl('/signIn');
                //mostramos alerta de sesion expirada
                return throwError('sesion expirada');
              }
              return throwError(err);
            }
          )
        );
    }

    return next.handle(request);
  }
}
/*el nex.handle(envia la request)*/