import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      providers: [
        {provide: Firestore, useValue: Firestore},
        {provide: ActivatedRoute, useValue: ActivatedRoute}
      ]
    });
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
