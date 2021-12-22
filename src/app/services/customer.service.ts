import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from './userController';
import { global } from "./global";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public url:string;
  public token:string;
  constructor(
    private _userService:UserService,
    private _http:HttpClient,
  ) { 
    this.url = global.url;
    this.token = this._userService.getToken();
  }
  save(data:any):Observable<any>{
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.post(this.url + 'customer/register ', params, {headers:headers});
  }

  all():Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.get(this.url + 'customer/get-customers ', {headers:headers});
  }
  allActives():Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.get(this.url + 'customer/get-actives ', {headers:headers});
  }
  one(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
   
    return this._http.get(this.url + `customer/get-one/${id}`, {headers:headers});
  }
  activate(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
   
    return this._http.get(this.url + `customer/activate-one/${id}`, {headers:headers});
  }
  desactivate(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
   
    return this._http.get(this.url + `customer/desactivate-one/${id}`, {headers:headers});
  }
  search(search:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.get(this.url + `customer/search-customer/${search}`, {headers:headers});
  }
  CreateQr(data:any):Observable<any>{
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.post(this.url + 'qr/makeQR', params, {headers:headers});
  }
  GetQR():Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.get(this.url + 'qr/QRstatus/:id ', {headers:headers});
  }
}
