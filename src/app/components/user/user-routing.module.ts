import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  { 
    path: '',
    children:[
      { path:'home', component: UserComponent },
      { path:'scan',
        loadChildren: () => import('./views/scan/scan.module').then(m => m.ScanModule) },
      { path:'**',redirectTo:'home' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
