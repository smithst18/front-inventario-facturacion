import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './pages/activate/activate.component';
const routes: Routes = [
  { 
    path: '', //scan
    children:[
      { path:'activate-customer',component:ActivateComponent },
      { path:'scan-to-pay',component:ActivateComponent },
      { 
        path:'payByScan',children:[
          { path:'paymentScan',
            loadChildren: () => import('src/app/components/admin/views/payments/payments.module').then(m => m.PaymentsModule) },
        ]
      },
    ],
  },
  { path:'**',redirectTo:'home' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanRoutingModule { }
