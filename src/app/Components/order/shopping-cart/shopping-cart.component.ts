import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { ProductsComponent } from '../master/products/products.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  purchaseDate: Date = new Date();
  @Input() CatList: ICategory[] = [];
  @Input() selectedValue: number = 0;

  @ViewChild(ProductsComponent) pComponents!: ProductsComponent;

  constructor() {
    console.log(this.CatList)
    console.log(this.selectedValue)
    //this.CatList = this.pComponents.CatList;
    //this.selectedValue = this.pComponents.selectedValue;
  }

  ngOnInit(): void {
  }

}
