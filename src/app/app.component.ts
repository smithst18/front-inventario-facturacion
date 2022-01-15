import { Component, OnInit, OnDestroy,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//services 
import { UserService } from 'src/app/services/userController';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy, DoCheck {
  subscription!: Subscription;
  title = 'front';
  public user:any;
  public showBack:boolean;
  constructor(
    private _userService:UserService,
    private router:Router,
  ){
    this.user = _userService.getIdentity();
    this.showBack = false;
  }
  ngOnInit():void{
  }
  ngDoCheck():void{
    this.user = this._userService.getIdentity();
    this.showBackButton();
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
  showBackButton(){
    if(this.router.url == '/admin/home' || this.router.url == '/user/home')
    this.showBack = false;
    else this.showBack = true;
  }
}
