import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from 'src/app/Models/Store';
import { Discount } from 'src/app/Models/Discounts';
import { IProduct } from 'src/app/Models/IProduct';
import { ICategory } from 'src/app/Models/ICategory';
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


  @Input() inputCategoryID: number = -1;
  @Input() filter: string = '';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputCategoryID == 0) {
      this.getAllProducts();
    } else {
      let p = this.prdSrv.getProductsByCatID(this.inputCategoryID)
        .subscribe((prdList) => {
          this.ProductList = prdList;
        });
      this.subscriptionList.push(p);
    }

    this.applyFilter()
  }

  applyFilter() {
    if(this.filter == "Best Sellers"){
      this.ProductList = this.ProductList.sort(x => x.OrderedCount).splice(0, 6);
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

  getBestSellers() {
    return this.ProductList.sort(x => x.OrderedCount).slice(0, 6);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }
}
