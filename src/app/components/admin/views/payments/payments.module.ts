import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { AddpaymentComponent } from './pages/addpayment/addpayment.component';
import { PaymentlistComponent } from './pages/paymentlist/paymentlist.component';
import { PaymentdetailsComponent } from './pages/paymentdetails/paymentdetails.component';


@NgModule({
  declarations: [
    AddpaymentComponent,
    PaymentlistComponent,
    PaymentdetailsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class PaymentsModule { }
