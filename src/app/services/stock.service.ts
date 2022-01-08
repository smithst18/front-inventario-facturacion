import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from './userController';
import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  public url:string;
  public token:string;
  constructor(
    private _userService:UserService,
    private _http:HttpClient,
  ){
    this.url = global.url;
    this.token = this._userService.getToken();
   }

  saveMove(stockmove:any):Observable<any>{
    let params = JSON.stringify(stockmove);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
                                   
    return this._http.post(this.url + 'stock/save-move-stock', params, {headers:headers});
  }
  operation(stockmove:any):Observable<any>{
    let params = JSON.stringify(stockmove);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
                                   
    return this._http.post(this.url + 'stock/operation', params, {headers:headers});
  }
  getAllByProduct(id:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
                                   
    return this._http.get(this.url + `stock/get-all-by-product/${id}`, {headers:headers});
  }
}
