import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReviewComponent } from './review/review.component';
import { authGuard } from './auth/auth.guard';
import { deactivateGuard } from './deactivate.guard';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { EditComponent } from './edit/edit.component';
import { adminGuard } from './auth/admin.guard';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';

const routes: Routes = [
  {
    path: 'restaurants', 
    loadChildren: () => import('./restaurants.module').then(x => x.RestaurantsModule),
    component : RestaurantsComponent, 
    canActivate : [authGuard]
  },
  {path:'restaurant', component : RestaurantComponent, canActivate : [authGuard], children: [
  ]},
  {path:'review', component : ReviewComponent, canActivate : [authGuard], canDeactivate : [deactivateGuard]},
  {path:'edit', component : EditComponent, canActivate : [adminGuard],
  children: [
    { path: 'restaurants', component: AdminRestaurantsComponent },
    { path: '', redirectTo: 'restaurants', pathMatch: 'full' } 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
