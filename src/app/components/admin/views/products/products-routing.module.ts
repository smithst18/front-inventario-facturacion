import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AddproductComponent } from './pages/addproduct/addproduct.component';
import { DetailsComponent } from './pages/details/details.component';
import { ListComponent } from './pages/list/list.component';
const routes: Routes = [
  { 
    path: '',
    children: [
      { path:'add',component:AddproductComponent },
      { path:'details/:id',component:DetailsComponent },
      { path:'list',component:ListComponent },
      { path:'**',redirectTo:'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
