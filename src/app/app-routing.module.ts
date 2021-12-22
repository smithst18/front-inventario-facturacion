import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { 
    path:'signIn',component:LoginComponent,
    canActivate:[AuthGuard]
  },

  { 
    path: 'admin',
    loadChildren: () => 
      import('./components/admin/admin.module').then(m => m.AdminModule),
    data:{
      role:'user_admin'
    },
    canLoad:[AuthGuard]
  },

  { 
    path: 'user',
     loadChildren: () => 
      import('./components/user/user.module').then(m => m.UserModule)
  },
  { path: 'scan', loadChildren: () => import('./components/user/views/scan/scan.module').then(m => m.ScanModule) },
  
  { path:'**',redirectTo:'/signIn' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
