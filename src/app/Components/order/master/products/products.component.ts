import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from 'src/app/ViewModels/Store';
import { Discount } from 'src/app/ViewModels/Discounts';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { ICategory } from 'src/app/ViewModels/ICategory';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Discount: Discount | string;
  myStore: Store;
  clientName: string;
  ProductList: IProduct[];
  @Output() CatList: ICategory[] = [{ ID: 1, Name: "Dry Food" }, { ID: 2, Name: "Toys" }, { ID: 3, Name: "Accessories" }];;
  @Output() selectedValue: number;
  logo: string;
  purchased: boolean;
  NationalID:string;
  IsSubmit = false;
  card: string;

  constructor() {
    this.NationalID="";
    this.card = "";
    this.purchased = false;
    this.selectedValue = -1;
    this.clientName = "";
    this.myStore = new Store("PetShop", "Logo", ["NY", "EG", "UK"]);
    this.Discount = Discount[1].toString();
    this.ProductList = [{ ID: 1, Name: "Dry Food 1", Quantity: 1, Price: 55.9, img: "assets/1.jpg", CategoryID: 1 },
    { ID: 2, Name: "Dry Food 2", Quantity: 45, Price: 35.4, img: "assets/2.jpg", CategoryID: 1 },
    { ID: 3, Name: "Dry Food 3", Quantity: 56, Price: 45.7, img: "assets/3.jpg", CategoryID: 1 },
    { ID: 4, Name: "Toy1", Quantity: 43, Price: 16.2, img: "assets/4.jpg", CategoryID: 2 },
    { ID: 5, Name: "Toy2", Quantity: 1, Price: 13.4, img: "assets/5.jpg", CategoryID: 2 },
    { ID: 6, Name: "Toy3", Quantity: 150, Price: 19.9, img: "assets/6.jpg", CategoryID: 2 },
    { ID: 7, Name: "Portable bag", Quantity: 12, Price: 68.8, img: "assets/7.jpg", CategoryID: 3 },
    { ID: 8, Name: "Dog Bed", Quantity: 145, Price: 66.5, img: "assets/8.jpg", CategoryID: 3 },
    { ID: 9, Name: "Pet House", Quantity: 109, Price: 79.9, img: "assets/9.jpg", CategoryID: 3 },];
    this.logo = "assets/logo.png";
  }

  ngOnInit(): void {
  }

  handle() {
    console.log("selected is " + this.clientName);
    this.IsSubmit = true;
  }

  buy(item: IProduct) {
    //this.purchased = true;
    item.Quantity--;
  }
}
