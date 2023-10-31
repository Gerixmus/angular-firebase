import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit{

  restaurantsData: any[] = [];

  constructor(private router : Router, private backendService : BackendService) {}

  viewRestaurant(name: string): void {
    this.router.navigate(['restaurant'], {queryParams: { name: name}});
  }
  
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
