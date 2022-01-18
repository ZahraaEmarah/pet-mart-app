import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/ViewModels/Store';
import { Discount } from 'src/app/ViewModels/Discounts';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { Router } from '@angular/router';
import { ProductAPIService } from 'src/app/Services/product-api.service';
import { CategoryService } from 'src/app/Services/category.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Discount: Discount | string;
  myStore: Store;
  ProductList: IProduct[] = [];
  CatList: ICategory[] = [];
  logo: string;
  purchased: boolean = false;
  hidebtn: boolean = false;
  fromCart: boolean = false;
  private subscriptionList: Subscription[] = [];


  @Input() selectedValue: number = -1;

  constructor(private prdSrv: ProductAPIService, 
    private router: Router, 
    private catSrv: CategoryService,
    private shoppingCartSrv: ShoppingCartService) {
    this.myStore = new Store("The Pet Shop", "Logo", ["NY", "EG", "UK"], true);
    this.Discount = Discount[1].toString();
    this.logo = "assets/logo.png";
  }

  getAllProducts() {
    let a = this.prdSrv.getAllProducts().subscribe((prdList) => {
      this.ProductList = prdList;
    });
    this.subscriptionList.push(a);
  }

  ngOnInit(): void {
    this.getAllProducts();

    let c = this.catSrv.getAllCategories().subscribe((ctList) => {
      this.CatList = ctList;
    });
    this.subscriptionList.push(c);

  }

  ngOnChanges(): void {

    if (this.selectedValue == 0) {
      this.getAllProducts();
    } else {
      let p = this.prdSrv.getProductsByCatID(this.selectedValue)
        .subscribe((prdList) => {
          this.ProductList = prdList;
        });
        this.subscriptionList.push(p);
    }
  }

  Increment(item: IProduct) {
    this.fromCart = true;
    (<HTMLInputElement>document.getElementById(item.id.toString())).value = this.shoppingCartSrv.IncrementItem(item).toString();
  }

  Decrement(item: IProduct) {
    this.fromCart = true;
    (<HTMLInputElement>document.getElementById(item.id.toString())).value = this.shoppingCartSrv.DecrementItem(item).toString();
  }

  getValue(item: IProduct) {
    var foundIndex = this.shoppingCartSrv.getCart().findIndex(x => x.id == item.id);
    if (foundIndex != -1) {
      return this.shoppingCartSrv.getCart()[foundIndex].count;
    }
    return 0;
  }

  AddToCart(item: IProduct) {
    this.fromCart = true;
    this.hidebtn = true;
    this.shoppingCartSrv.AddToCart(item);
  }

  onUserCheckedOut() {
    this.purchased = true;
  }

  getCart() {
    this.router.navigate(['/Order']);
  }

  getProduct(item: IProduct) {
    console.log(item)
    if (!this.fromCart) {
      this.router.navigate(['/Products', item.id]);
    }
    this.fromCart = false;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }
}
