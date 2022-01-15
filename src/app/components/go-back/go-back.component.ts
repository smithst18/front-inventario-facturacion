import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-go-back',
  template: `
    <div class="icon-back ms-4"> 
      <button mat-mini-fab (click)="GoBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent {
  public previousUrl!:string;
  constructor(
    private router:Router,
    private location:Location,
    ){ 
    }
  GoBack(){
    this.location.back();
  }
}
