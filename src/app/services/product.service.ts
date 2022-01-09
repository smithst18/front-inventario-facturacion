import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { UserService } from './userController';
import { global } from "./global";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url:string;
  public token:string;

  constructor(
    private _userService:UserService,
    private _http:HttpClient,
  ) { 
    this.url = global.url;
    this.token = this._userService.getToken();
  }

  add(product:any):Observable<any>{
    let params = JSON.stringify(product);
                                   
    return this._http.post(this.url + 'product/add ', params);
  }
  all():Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
                                   
    return this._http.get(this.url + 'product/all');
  }
  getOne(id:string):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
                                   
    return this._http.get(this.url + `product/get-one/${id}`, {headers:headers});
  }
  search(search:any):Observable<any>{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
                                   
    return this._http.get(this.url + `product/search/${search}`, {headers:headers});
  }
}
