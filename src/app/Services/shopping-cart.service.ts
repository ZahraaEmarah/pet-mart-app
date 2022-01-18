import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../ViewModels/ICart';
import { IProduct } from '../ViewModels/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: ICart[] = [];
  private noOfItemsInCart: BehaviorSubject<number>;

  constructor() {
    this.noOfItemsInCart = new BehaviorSubject<number>(0);

  }

  getCart() {
    return this.shoppingCart;
  }

  AddToCart(item: IProduct) {
    var newItem: ICart = {
      id: item.id,
      Name: item.Name,
      img: item.img,
      Price: item.Price,
      TPrice: item.Price,
      count: 1,
      CategoryID: item.CategoryID
    };
    this.shoppingCart.push(newItem);
    this.noOfItemsInCart.next(this.shoppingCart.length);
    return this.shoppingCart;
  }

  IncrementItem(item: IProduct) {
    var foundIndex = this.shoppingCart.findIndex(x => x.id == item.id);
    if (foundIndex != -1) {
      if (item.Quantity > 1) {
        this.shoppingCart[foundIndex].count += 1;
        this.shoppingCart[foundIndex].TPrice += item.Price;
      }
    }
    return this.shoppingCart[foundIndex].count;
  }

  DecrementItem(item: IProduct) {
    var foundIndex = this.shoppingCart.findIndex(x => x.id == item.id);
    if (foundIndex != -1) {
      if (this.shoppingCart[foundIndex].count == 1) {
        this.RemoveFromCart(this.shoppingCart[foundIndex]);
      } else {
        this.shoppingCart[foundIndex].count -= 1;
        this.shoppingCart[foundIndex].TPrice -= item.Price;
      }
    }
    return this.shoppingCart[foundIndex].count;
  }

  RemoveFromCart(item: ICart) {
    var foundIndex = this.shoppingCart.findIndex(x => x.id == item.id);
    this.shoppingCart.splice(foundIndex, 1);
    this.noOfItemsInCart.next(this.shoppingCart.length);
  }

  calcTotalPrice() {
    var TotPrice = 0;
    this.shoppingCart.forEach(element => {
      TotPrice += element.TPrice;
    });
    return TotPrice;
  }

  resetCart(){
    this.shoppingCart = [];
  }

  getCartLength(): Observable<number> {
    return this.noOfItemsInCart.asObservable();
  }
}
