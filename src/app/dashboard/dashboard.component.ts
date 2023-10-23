import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  booksData: any[] = [];

constructor(private firestore : Firestore) {}

isAdmin() {
  return true;
}

ngOnInit() {
  const aCollection = collection(this.firestore, 'books');
  collectionData(aCollection, {idField: 'id'}).subscribe(val => {
    console.log(val);
    this.booksData = val;
  })
}
}
