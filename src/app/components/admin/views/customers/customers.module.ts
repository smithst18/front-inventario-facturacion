import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { ClientlistComponent } from './pages/clientlist/clientlist.component';
import { ActiveclientsComponent } from './pages/activeclients/activeclients.component';
//print module
import { NgxPrintModule } from 'ngx-print';
//material 
import { MaterialModule } from 'src/app/material.module';
import { ClientdetailsComponent } from './pages/clientdetails/clientdetails.component';
@NgModule({
  declarations: [
    RegisterComponent,
    ClientlistComponent,
    ActiveclientsComponent,
    ClientdetailsComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPrintModule
  ]
})
export class CustomersModule { }
