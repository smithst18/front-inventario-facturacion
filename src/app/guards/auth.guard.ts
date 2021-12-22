import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment } 
        from '@angular/router';
import { Observable } from 'rxjs';
//model
import { User } from '../models/user';
//services
import { UserService } from '../services/userController';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  private identity!:User;
  constructor (
    private _userService: UserService,
    private router:Router,
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.signInAuth(route);
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return this.loginAuth(route);
  }
  //usuario  llendo a admin  //crear data en user route y pasar mismo guard
  loginAuth(route:any):boolean{
    let user = this._userService.getIdentity();
    if(user != null && user.role == route.data.role){
      return true; 
    }
    else{
      this.router.navigate(['/signIn']);
      return false;
    }
  }
  // se encarga de validad si un user esta logeado llevarlo a su ruta espesifica
  signInAuth(route:any):boolean{
    let user = this._userService.getIdentity();
    if(user == null){
      return true;
    }else if(user.role == 'user_admin'){
      this.router.navigate(['/admin']);
      return false
    }else if(user.role == 'user_cashier' || user.role == 'user_receptionist'){
      this.router.navigate(['/user']);
      return false
    }else{
      return true;
    }
  }
//this.router.navigate(['/signIn']);
}
