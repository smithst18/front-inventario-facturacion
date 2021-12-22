import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
//services
import { UserService } from 'src/app/services/userController';
 
//components for admin module
@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [UserService],
})
export class AdminModule { }
