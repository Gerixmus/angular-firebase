import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { DocumentReference, doc, setDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Observable, map } from 'rxjs';

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

  getBooksData(): Observable<any[]> {
    const booksCollection = collection(this.db, 'books');
    return collectionData(booksCollection, { idField: 'id' });
  }
}
