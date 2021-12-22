import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { ActiveclientsComponent } from './pages/activeclients/activeclients.component';
import { ClientlistComponent } from './pages/clientlist/clientlist.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClientdetailsComponent } from './pages/clientdetails/clientdetails.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path:'register',component:RegisterComponent },
      { path:'list',component:ClientlistComponent },
      { path:'active',component:ActiveclientsComponent },
      { path:'details/:id',component:ClientdetailsComponent },
      { path:'**',redirectTo:'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
