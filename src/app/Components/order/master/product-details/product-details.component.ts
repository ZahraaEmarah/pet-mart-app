import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { Location } from '@angular/common'
import { ProductAPIService } from 'src/app/Services/product-api.service';
import { IProduct } from 'src/app/Models/IProduct';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  PID: number = 0;
  count: number = 0;
  ViewInput: boolean = false;
  private myProduct = <IProduct>{};

  constructor(private prdSrv: ProductAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private shoppingCartSrv: ShoppingCartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.PID = Number(paramMap.get("pid"));
      this.count = Number(paramMap.get("pCount"));
      console.log(this.PID);
    });
    this.prdSrv.getProductByID(this.PID)
      .subscribe((myProduct) => {
        this.myProduct = myProduct;
      });
    console.log(this.myProduct);
  }

  getImg() {
    return this.myProduct.img;
  }

  getName() {
    return this.myProduct.Name;
  }

  getPrice() {
    return this.myProduct.Price;
  }

  getDescription() {
    return this.myProduct.Name;
  }

  getQuantity() {
    return this.myProduct.Quantity;
  }

  Add() {
    this.shoppingCartSrv.AddToCart(this.myProduct);
  }

  getCountInCart() {
    var foundIndex = this.shoppingCartSrv.getCart().findIndex(x => x.id == this.PID)
    if (foundIndex != -1) {
      return this.shoppingCartSrv.getCart()[foundIndex].count;
    }
    return -1;
  }

  Decrement() {
    this.shoppingCartSrv.DecrementItem(this.myProduct);
  }

  Increment() {
    this.shoppingCartSrv.IncrementItem(this.myProduct);
  }

  getNextProd() {
    // var nxtItem = this.prdSrv.getNext(this.PID);
    // if (nxtItem.ID != this.PID) {
    //   this.router.navigate(['/Details', nxtItem.ID, nxtItem.Quantity]);
    // }
  }

  getPrevProd() {
    // var PrvItem = this.prdSrv.getPrev(this.PID);
    // this.router.navigate(['/Details', PrvItem.ID, PrvItem.Quantity]);
  }

  isLast() {
    if (this.prdSrv.getProductByID(this.PID + 1)) {
      return false;
    }
    return true;
  }

  goBack() {
    this.location.back();
  }

  Delete() {
    if (confirm("Are you sure you want to Delete this product?") == true) {
      this.prdSrv.deleteProduct(this.PID).subscribe({
        next: (prd => {
          this.router.navigate(['/Products'])
        }),
        error: (err) => {
          console.log(err);
        }
      });;
    } else {

    }
  }
}
