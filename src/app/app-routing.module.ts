import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () => import("./register/register.module").then(m => m.RegisterModule),
  },
  {
    path: 'user',
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
  },
  
  {path:'login', component:LoginComponent},
  {path:'singup',component:SingupComponent},
  {path:'employe',component:EmployeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
