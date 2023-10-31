import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { CollectionReference, DocumentReference, addDoc, doc, setDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  usersArray: any[] = [];

  constructor(private db : Firestore) { }

  updateUser(userCredential: UserCredential) {
    setDoc(doc(this.db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
    });
  }

  emailTaken(email: string): Observable<boolean> {
    const emailQuery = query(
      collection(this.db, 'users'),
      where("email", "==", email)
    );
    return collectionData(emailQuery, { idField: 'id' }).pipe(
      map((results) => results.length > 0)
    );
  }

  // TO-DO create type admin
  getAdmin(uid: string | null) {
    return docData<any>(
      doc(this.db, '/administrators/' + uid) as DocumentReference<any>
    );
  }

  getRestaurantsData(): Observable<any[]> {
    const restaurantsCollection = collection(this.db, 'restaurants');
    return collectionData(restaurantsCollection, { idField: 'id' });
  }

  getRestaurantData(name: string | null): Observable<any[]> {
    const restaurantCollection = query(collection(this.db, 'restaurants'),
    where("name", "==", name));
    return collectionData(restaurantCollection, { idField: 'id' });
  }

  getReviewsData(id: string | null): Observable<any[]> {
    const reviewsCollection = query(collection(this.db, 'reviews'),
    where("restaurant", "==", id));
    return collectionData(reviewsCollection, { idField: 'id' });
  }

  createReview(rate: number, restaurant: string, review: string) {
    return from(addDoc(collection(this.db, 'reviews'), {
      rate: rate,
      restaurant: restaurant,
      review: review
    }));
  }
}
