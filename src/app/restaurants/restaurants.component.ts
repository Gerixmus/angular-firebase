import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit{

  restaurantsData: any[] = [];

  constructor(private backendService : BackendService) {}
  
  getRestaurants(): void {
    this.backendService.getRestaurantsData().subscribe((val) => {
      console.log(val);
      this.restaurantsData = val;
    });
  }
  
  ngOnInit() {
    this.getRestaurants();
  }
}
