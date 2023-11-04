import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent {
  private restaurantsSubscription!: Subscription;
  restaurantsData: any[] = [];

  constructor( private backendService : BackendService) {}

  getRestaurants(): void {
    this.restaurantsSubscription = this.backendService.getRestaurantsData().subscribe((val) => {
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
