import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userController';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public identity:any;
  constructor(
    private _router:Router,
    private _userService:UserService,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  }
}
