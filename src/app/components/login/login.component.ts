import { Component, OnInit,OnDestroy} from '@angular/core';
import { SweetAlert } from '../../services/alerts';
import { Subscription } from 'rxjs';
//models
import { User } from '../../models/user';
//services
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userController';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[],
})
export class LoginComponent implements OnInit,OnDestroy {
  public user: User;
  public title:string;
  public identity:any;
  public token:any;
  private subcriptions:Subscription[] = [];
  constructor (
      private sweet: SweetAlert,
      private _userService:UserService,
      private _router:Router,
    ){
      this.user = new User (0,'','','',false);
      this.title = "Bienvenido";
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy():void{
    this.subcriptions.forEach((sub)=> sub.unsubscribe());
  }
  
  OnSubmit(form:any){
    //get user data
    this.subcriptions.push(
      this._userService.login(this.user).subscribe(
        response =>{
          if(response.user){
            this.identity = response.user;
            //get  user token
            this.user.gettoken = true;
              this._userService.login(this.user).subscribe(
                response =>{
                  if(response.token){
                    this.token = response.token;
                    //save token and identity localstorage
                    //redirect to respective view
                    setTimeout(() => {
                      this._userService.addSession(this.identity,this.token);
                    },2000);
                  }else{
                    this.sweet.LogError();
                  }
                },
                error=>{
                  if(error.status == 404) this.sweet.LogError();
              });
            this.sweet.LogSuccess();
          }else{
            this.sweet.LogServerError();
          }
      },
        error=>{
          if(error.status == 404 || error.status == 403) this.sweet.LogError();
      })
    );
  }
}
