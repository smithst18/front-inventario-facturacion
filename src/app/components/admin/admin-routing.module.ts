import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path:'home',component:AdminComponent },
      { path:'products',
      loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule) },
      { path:'customers',
      loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule) },
      { path:'payments',
      loadChildren: () => import('./views/payments/payments.module').then(m => m.PaymentsModule) },
      { path:'**',redirectTo:'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
