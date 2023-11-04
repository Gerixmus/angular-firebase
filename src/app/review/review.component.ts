import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateType } from '../deactivate.guard';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy{
  private restaurantsSubscription!: Subscription
  submitted: boolean = false;
  form! : FormGroup;
  name: string | null;
  filteredRestaurant: any | undefined;

  constructor(private dialogService: DialogService, private formBuilder : FormBuilder, private backendService : BackendService, private route: ActivatedRoute, private router : Router) {
    this.name = this.route.snapshot.queryParamMap.get('name');
  }

  get rate() {
    return this.form.controls['rate'];
  }

  get review() {
    return this.form.controls['review'];
  }

  getRestaurant(): void {
      this.restaurantsSubscription = this.backendService.getRestaurantData(this.name).subscribe((val) => {
      this.filteredRestaurant = val[0];
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

  async canDeactivate(): Promise<boolean> {
    if (this.submitted) {
      return true;
    }
    if (this.form.value.rate || this.form.value.review) {
      const result = await this.dialogService.openDialog();
      if (result) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  onSubmit(): void {
    const rate = this.form.value.rate;
    const review = this.form.value.review;
    const restaurant = this.filteredRestaurant.id;
    this.backendService.createReview(rate, restaurant, review)
      .subscribe(
        (() => {
          this.submitted = true;
          this.router.navigate(['restaurant'], {queryParams: { name: this.name}});
        })
      )
  }

  ngOnDestroy(): void {
    if (this.restaurantsSubscription) {
      this.restaurantsSubscription.unsubscribe();
    }
  }
}
