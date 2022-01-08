import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/userController';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private userService:UserService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token  =  this.userService.getToken();
    if(token != null || token  != undefined){
      const header = new HttpHeaders({
        'Authorization':`${token}`,
      });
  
      const req = request.clone({
        headers:header,
      });

      return next.handle(req).pipe(
        catchError(this.handleError)
      );
    }

    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }

  handleError( err:HttpErrorResponse){
    if(err.status == 401){
      return throwError('Sesion Expired');
    }
    return throwError('some error:');
  }
}
/*el nex.handle(envia la request)*/