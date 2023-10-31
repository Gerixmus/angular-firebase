import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { loggedGuard } from './auth/logged.guard';
import { adminGuard } from './auth/admin.guard';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReviewComponent } from './review/review.component';
import { deactivateGuard } from './deactivate.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', component : LoginComponent, canActivate : [loggedGuard]},
  {path:'register', component : RegisterComponent, canActivate : [loggedGuard]},
  {path:'restaurants', component : RestaurantsComponent, canActivate : [authGuard]},
  {path:'restaurant', component : RestaurantComponent, canActivate : [authGuard]},
  {path:'review', component : ReviewComponent, canActivate : [authGuard], canDeactivate : [deactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
