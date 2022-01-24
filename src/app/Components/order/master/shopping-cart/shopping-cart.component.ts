import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAPIService } from 'src/app/Services/product-api.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ICart } from 'src/app/Models/ICart';
import { IProduct } from 'src/app/Models/IProduct';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  purchaseDate: Date = new Date();
  shoppingCart: ICart[] = [];
  ProductsList: IProduct[] = [];
  total: number = 0;
  msg: number = 0;
  clientName: string = "";
  NationalID: string = "";
  creditCard: string = "";
  Ischeck: boolean = false;
  IsSubmit: boolean = false;
  date: Date = new Date();
  OrderHistory: ICart[] = [];


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private prdSrv: ProductAPIService,
    private shoppingCartSrv: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartSrv.getCart();
    this.prdSrv.getAllProducts()
      .subscribe((pList) => {
        this.ProductsList = pList;
      });
    this.total = this.shoppingCartSrv.calcTotalPrice();
    if (this.shoppingCart.length < 1) {
      this.msg = 1;
    }
  }

  ngAfterViewInit(): void {
    this.shoppingCart = this.shoppingCartSrv.getCart();
    this.total = this.shoppingCartSrv.calcTotalPrice();
    //this.OrderHistory = this.shoppingCartSrv.getOrder();
  }

  ViewPayment() {
    this.IsSubmit = true;
  }

  remove(item: ICart) {
    this.shoppingCartSrv.RemoveFromCart(item);
    this.total = this.shoppingCartSrv.calcTotalPrice();
    if (this.shoppingCart.length < 1) {
      this.msg = 1;
    }
  }

  OrdercheckOut() {
    this.shoppingCart.forEach(element => {
      var myItem = this.ProductsList.find(x => x.id == element.id);
      if (myItem) {
        var newQuantity = myItem!.Quantity - element.count;
        this.DecrementProductQuantity(element, newQuantity);
      }
    });
    this.shoppingCartSrv.resetCart();
  }

  DecrementProductQuantity(item: ICart, newQuantity: number) {
    this.prdSrv.getProductByID(item.id)
      .subscribe((myItem) => {
        console.log("Product is" + myItem);
        myItem.Quantity = newQuantity;
        this.prdSrv.putProduct(myItem.id, myItem).subscribe({
          next: (prd => {
            this.Ischeck = true;
          }),
          error: (err) => {
            console.log(err);
          }
        });
      });
  }

  Home() {
    this.shoppingCart = [];
    this.total = 0;
    this.router.navigate(['/Products']);
  }

  ToBeViewed() {
    if (!this.Ischeck) {
      return this.shoppingCart;
    }
    return this.OrderHistory;
  }

  Decrement(item: ICart) {
    this.prdSrv.getProductByID(item.id)
      .subscribe((myItem) => {
        this.shoppingCartSrv.DecrementItem(myItem);
        this.total = this.shoppingCartSrv.calcTotalPrice();
      });
  }

  Increment(item: ICart) {
    this.prdSrv.getProductByID(item.id)
      .subscribe((myItem) => {
        this.shoppingCartSrv.IncrementItem(myItem);
        this.total = this.shoppingCartSrv.calcTotalPrice();
      });
  }
}
