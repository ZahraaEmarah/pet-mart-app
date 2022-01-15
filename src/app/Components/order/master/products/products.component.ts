import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from 'src/app/ViewModels/Store';
import { Discount } from 'src/app/ViewModels/Discounts';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ICart } from 'src/app/ViewModels/ICart';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  Discount: Discount | string;
  myStore: Store;
  ProductList: IProduct[] = [];
  CatList: ICategory[] = [{ ID: 1, Name: "Dry Food" },
  { ID: 2, Name: "Toys" },
  { ID: 3, Name: "Accessories" }];;
  logo: string;
  purchased: boolean = false;
  hidebtn: boolean = false;
  fromCart:boolean = false;

  @Input() selectedValue: number = -1;

  constructor(private prdSrv: ProductServiceService, private router: Router) {
    this.myStore = new Store("PetShop", "Logo", ["NY", "EG", "UK"]);
    this.Discount = Discount[1].toString();
    this.logo = "assets/logo.png";
  }

  ngOnInit(): void {
    this.ProductList = this.prdSrv.getAll();
  }

  ngAfterViewInit(): void {
    this.ProductList = this.prdSrv.getByCatID(this.selectedValue);
  }

  Increment(item: IProduct) {
    this.fromCart = true;
    (<HTMLInputElement>document.getElementById(item.ID.toString())).value = this.prdSrv.Increment(item).toString();
  }

  Decrement(item: IProduct) {
    this.fromCart = true;
    (<HTMLInputElement>document.getElementById(item.ID.toString())).value = this.prdSrv.Decrement(item).toString();
  }

  getValue(item: IProduct) {
    var foundIndex = this.prdSrv.getCart().findIndex(x => x.ID == item.ID);
    if (foundIndex != -1) {
      return this.prdSrv.getCart()[foundIndex].count;
    }
    return 0;
  }

  AddToCart(item: IProduct) {
    this.fromCart = true;
    this.hidebtn = true;
    this.prdSrv.AddToCart(item);
  }

  onUserCheckedOut() {
    this.purchased = true;
  }

  getCart() {
    this.router.navigate(['/Order']);
  }

  getProduct(item: IProduct){
    if(!this.fromCart){
      this.router.navigate(['/Details', item.ID]);
    }
    this.fromCart = false;
  }
}
