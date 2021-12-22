import { Component, OnInit, OnDestroy,DoCheck } from '@angular/core';
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
  constructor(
    private _userService:UserService,
  ){
    this.user = _userService.getIdentity();
  }
  ngOnInit():void{
  }
  ngDoCheck():void{
    this.user = this._userService.getIdentity();
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

}
