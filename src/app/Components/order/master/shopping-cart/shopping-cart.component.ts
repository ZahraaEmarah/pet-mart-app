import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { ICart } from 'src/app/ViewModels/ICart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  purchaseDate: Date = new Date();
  shoppingCart: ICart[] = [];
  total: number = 0;
  clientName: string = "";
  NationalID: string = "";
  creditCard: string = "";
  Ischeck: boolean = false;
  IsSubmit: boolean = false;
  date: Date = new Date();
  OrderHistory: ICart[] = [];


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private prdSrv: ProductServiceService) {
  }

  ngOnInit(): void {
    this.shoppingCart = this.prdSrv.getCart();
    this.total = this.prdSrv.calcTotalPrice();
    this.OrderHistory = this.prdSrv.getOrder();
    if(this.shoppingCart.length < 1){
      this.router.navigate(['/Error',1]);
    }
    console.log(this.shoppingCart);
  }

  ngAfterViewInit(): void {
    this.shoppingCart = this.prdSrv.getCart();
    this.total = this.prdSrv.calcTotalPrice();
    this.OrderHistory = this.prdSrv.getOrder();
  }

  ViewPayment() {
    this.IsSubmit = true;
  }

  remove(item: ICart) {
    this.prdSrv.Delete(item);
    this.total = this.prdSrv.calcTotalPrice();
    if(this.shoppingCart.length < 1){
      this.router.navigate(['/Error',1]);
    }
  }

  checkout() {
    this.Ischeck = true;
    this.prdSrv.OrdercheckOut();
  }

  Home(){
    this.shoppingCart = [];
    this.total = 0;
    this.router.navigate(['/Home']);
  }

  ToBeViewed(){
    if(!this.Ischeck){
      return this.shoppingCart;
    }
    return this.OrderHistory;
  }

  Decrement(item: ICart){
    this.prdSrv.RemoveFromCart(item);
    this.total = this.prdSrv.calcTotalPrice();
  }

  Increment(item: ICart){
    if(this.prdSrv.getByID(item.ID)){
      this.prdSrv.Increment(this.prdSrv.getByID(item.ID)!);
      this.total = this.prdSrv.calcTotalPrice();
    }   
  }
}
