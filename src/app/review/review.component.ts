import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateType } from '../deactivate.guard';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  form! : FormGroup;
  name: string | null;
  filteredRestaurant: any | undefined;

  constructor(private formBuilder : FormBuilder, private backendService : BackendService, private route: ActivatedRoute, private router : Router) {
    this.name = this.route.snapshot.queryParamMap.get('name');
  }

  get rate() {
    return this.form.controls['rate'];
  }

  get review() {
    return this.form.controls['review'];
  }

  getRestaurant(): void {
    this.backendService.getRestaurantData(this.name).subscribe((val) => {
      console.log(val);
      this.filteredRestaurant = val[0];
      console.log(this.filteredRestaurant.id);
    });
  }

  ngOnInit(): void {
    this.getRestaurant();
    this.form = this.formBuilder.group({
      'rate' : [null, {
        validators : [Validators.required]
      }],
      'review' : [null, {
        validators : [Validators.required]
      }]
     });
  }

  // TO-DO create visually appealing dialog
  canDeactivate(): Observable<boolean> {
    if (this.form.value.rate || this.form.value.review) {
      return new Observable((observer) => {
        const userConfirmed = confirm('You have unsaved changes. Do you want to discard them?');
        observer.next(userConfirmed);
        observer.complete();
      });
    } else {
      return of(true);
    }
  }
  

  onSubmit(): void {
    const rate = this.form.value.rate;
    const review = this.form.value.review;
    const restaurant = this.filteredRestaurant.id;
    this.backendService.createReview(rate, restaurant, review)
      .subscribe(
        ((book) => {
          console.log(book)
          this.router.navigate(['restaurant'], {queryParams: { name: this.name}});
        })
      )
  }
}
