import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy{
  private restaurantsSubscription!: Subscription;
  restaurantsData: any[] = [];

  constructor(private router : Router, private backendService : BackendService) {}

  viewRestaurant(name: string): void {
    this.router.navigate(['restaurant'], {queryParams: { name: name}});
  }
  
  getRestaurants(): void {
    this.restaurantsSubscription = this.backendService.getRestaurantsData().subscribe((val) => {
      console.log(val);
      this.restaurantsData = val;
    });
  }
  
  ngOnInit() {
    this.getRestaurants();
  }

  ngOnDestroy(): void {
    if (this.restaurantsSubscription) {
      this.restaurantsSubscription.unsubscribe();
    }
  }
}
