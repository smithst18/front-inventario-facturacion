import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//models
import { Notification } from 'src/app/models/notification';
//material
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { UserService } from 'src/app/services/userController';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptions:Subscription []=[];
  public notifications:Notification[] = [];
  public notifi_qty!:number
  public user:any;
  constructor(
    private router:Router,
    private socket: SocketService,
    private _userService:UserService,
  ){
    this.user = _userService.getIdentity();
    //SOCKET DE NOTIFICACIONES 
    if(this.user.role == 'user_admin'){
      this.socket
      this.subscriptions.push(
        socket.callBack.subscribe( 
          res =>{
            this.notifications = res;
            this.notifi_qty = this.notifications.length;
          }
        )
      );
    }
  }
  ngOnInit(): void {
    this.socket.emitEvent();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(sub => { sub.unsubscribe() } );
  }
  logOut(){
    this._userService.closeSession();
  }
  notiRoute(id:any){
    //[routerLink]="['/admin/products/details/',notification.item.id,{replaceUrl:true,skipLocationChange:false}]"
    this.router.navigateByUrl(`/admin/products/details/${id}`);
  }
}
