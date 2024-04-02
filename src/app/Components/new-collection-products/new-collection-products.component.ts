import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'new-collection-products',
  templateUrl: './new-collection-products.component.html',
  styleUrls: ['./new-collection-products.component.css']
})
export class NewCollectionProductsComponent implements OnInit {

  clicked :any;
  list: any = [];
  categoryID: number = 0;
  
  constructor() {
    this.list = [
      'All',
      'New',
      'Best Sellers',
      'Featured',
      'On Sale'
   ]; 
   this.clicked = this.list[0];
   }

  ngOnInit(): void {
  }

  select(item: any) {
    this.clicked = item;
  };

  isActive(item: any) {
    return this.clicked === item;
  };

}
