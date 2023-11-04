import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, OnDestroy{
  private restaurantSubscription!: Subscription;
  private reviewsSubscription!: Subscription;
  name: string | null;
  searchValue: string = '';
  filteredRestaurant: any | undefined;
  filteredReviews: any[] = [];

  constructor(private route: ActivatedRoute, private backendService : BackendService, private  router : Router) {
    this.name = this.route.snapshot.queryParamMap.get('name');
  }

  getRestaurant(): void {
    this.restaurantSubscription = this.backendService.getRestaurantData(this.name).subscribe((val) => {
    console.log(val);
    this.filteredRestaurant = val[0];
    console.log(this.filteredRestaurant.id);
    this.getReviews(this.filteredRestaurant.id, this.searchValue)
    });
  }

  reviewSearch() {
    this.getReviews(this.filteredRestaurant.id, this.searchValue)
  }

  getReviews(id: string, searchValue: string): void {
    this.reviewsSubscription = this.backendService.getReviewsData(id).pipe(
      map((review) => {
        if(searchValue) {
          return review.filter(element => element.review.includes(searchValue));
        } else {
          return review
        }
      })
    ).subscribe((review) => {
      console.log(review);
      this.filteredReviews = review;
    })
  }

  reviewRedirect(name: string | null): void{
    this.router.navigate(['review'], {queryParams: { name: name}});
  }

  ngOnInit(): void {
    this.getRestaurant();
  }

  ngOnDestroy(): void {
    if (this.restaurantSubscription) {
      this.restaurantSubscription.unsubscribe();
    }
    if (this.reviewsSubscription) {
      this.reviewsSubscription.unsubscribe();
    }
  }
}
