import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { identity, Observable } from "rxjs";
//models
import { global } from "./global";
import { Router, ActivatedRoute, Params } from "@angular/router";
//cokies
import { CookieService } from 'ngx-cookie';


@Injectable()
export class UserService {
    public url:string;
    public identity:any;
    public token:any;
    constructor(
        private _http:HttpClient,
        private _router: Router,
        private route: ActivatedRoute,
        private cookieService:CookieService,
    ){
        this.url = global.url;
    }
    
    login(user:any):Observable<any>{
        //params to json
        let params = JSON.stringify(user);
        //sett headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //ajax request
        return this._http.post(this.url + 'user/login',params,{headers:headers});
    }
    addSession(identity:any,token:any){
        this.cookieService.put('token',token);
        this.cookieService.putObject('identity',identity);
        /*
        localStorage.setItem('identity',JSON.stringify(identity));
        localStorage.setItem('token',token);
        */

        if(identity.role == 'user_admin'){
            this._router.navigateByUrl('/admin');
        }else if(identity.role == 'user_cashier' || identity.role == 'user_receptionist'){
            this._router.navigateByUrl('/user');
        }else alert('invalid user role');
    }
    
    closeSession(){
        this.cookieService.removeAll();
        //localStorage.clear();
        this._router.navigateByUrl('/login');
    }
    getIdentity(){
        let identity = this.cookieService.getObject('identity');
        //let identity = JSON.parse(localStorage.getItem('identity')!);

        if(identity && identity != null && identity != undefined){
            return this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }
    getToken(){
        let token = this.cookieService.get('token');
        //let token = localStorage.getItem('token')!;

        if(token && token != null && token != undefined){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
}