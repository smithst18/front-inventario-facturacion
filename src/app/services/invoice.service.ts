import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { UserService } from './userController';
import { global } from "./global";
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public url:string;
  public token:string;

  constructor(
    private _userService:UserService,
    private _http:HttpClient,
  ) { 
    this.url = global.url;
    this.token = this._userService.getToken();
  }

  add(invoice:any):Observable<any>{
    let params = JSON.stringify(invoice);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
    return this._http.post(this.url + 'payment/add ', params, {headers:headers});
  }
  allInvById(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
                                   
    return this._http.get<any>(this.url + `payment/all-by-id/${id}`, {headers:headers});
  }
  allInvoices():Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
                                   
    return this._http.get<any>(this.url + `payment/all-payments`, {headers:headers});
  }
  paymentConfirmation(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
                                   
    return this._http.get<any>(this.url + `payment/payment-confirmation/${id}`, {headers:headers});
  }
  earnings():Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
                                   
    return this._http.get<any>(this.url + `payment/payment-earns`, {headers:headers});
  }
  oneInvById(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' )
                                   .set( 'Authorization', this.token );
                                   
    return this._http.get<any>(this.url + `payment/one-by-id/${id}`, {headers:headers});
  }
}
