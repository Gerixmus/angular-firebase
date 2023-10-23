import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { loggedGuard } from './auth/logged.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', component : LoginComponent, canActivate : [loggedGuard]},
  {path:'register', component : RegisterComponent, canActivate : [loggedGuard]},
  {path:'dashboard', component : DashboardComponent, canActivate : [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
