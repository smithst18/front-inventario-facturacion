import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpaymentComponent } from './pages/addpayment/addpayment.component';
import { PaymentlistComponent } from './pages/paymentlist/paymentlist.component';
import { PaymentdetailsComponent } from './pages/paymentdetails/paymentdetails.component';
const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'add', redirectTo: 'add/', pathMatch: 'full'},//This way the component isn't re-rendered when the parameter is added.
      { path:'add/:id',component:AddpaymentComponent },
      { path:'list',component:PaymentlistComponent },
      { path:'details/:id',component:PaymentdetailsComponent },
      { path:'**',redirectTo:'home' },
    ]
  },
  { 
    path: 'paymentScan',
    children: [
      { path:'add/:id',component:AddpaymentComponent },
      { path:'**',redirectTo:'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
