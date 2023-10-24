import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  booksData: any[] = [];

constructor(private backendService : BackendService) {}

isAdmin() {
  return true;
}

getBooks(): void {
  this.backendService.getBooksData().subscribe((val) => {
    console.log(val);
    this.booksData = val;
  });
}

ngOnInit() {
  this.getBooks();
}
}
