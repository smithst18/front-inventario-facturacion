import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from './userController';
import { global } from "./global";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public url:string;
  public token:string;
  constructor(
    private _userService:UserService,
    private _http:HttpClient,
  ) { 
    this.url = global.url;
    this.token = this._userService.getToken();
  }
  //setea el status de la notificacion en el backend
  set(data:any):Observable<any>{
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.post(this.url + 'notification/set-status ', params, {headers:headers});
  }
  //obtiene todas as notificaciones activas al momento
}
