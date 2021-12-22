import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  public url:string;
  constructor(
    private _http:HttpClient,
  ) { 
    this.url = global.url;
  }

  getTypes(token:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                      .set('Authorization',token);

      return this._http.get<any>(this.url + 'productType/getall', {headers:headers});
  }

  addType(token:string,productType:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                      .set('Authorization',token);
    let params = JSON.stringify(productType);
    return this._http.post<any>(this.url + '/productType/add',params, {headers:headers});

                      
  }
}
