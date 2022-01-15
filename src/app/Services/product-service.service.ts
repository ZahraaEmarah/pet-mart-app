import { Injectable } from '@angular/core';
import { ICart } from '../ViewModels/ICart';
import { IProduct } from '../ViewModels/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private prdList: IProduct[];
  private shoppingCart: ICart[] = [];
  private purchasedOrder: ICart[] = [];
  constructor() {
    this.prdList = [{ ID: 7, Name: "Portable bag", Quantity: 12, Price: 68.8, img: "assets/7.jpg", CategoryID: 3 },
    { ID: 1, Name: "Dry Food 1", Quantity: 1, Price: 55.9, img: "assets/1.jpg", CategoryID: 1 },
    { ID: 6, Name: "Toy3", Quantity: 150, Price: 19.9, img: "assets/6.jpg", CategoryID: 2 },
    { ID: 2, Name: "Dry Food 2", Quantity: 45, Price: 35.4, img: "assets/2.jpg", CategoryID: 1 },
    { ID: 3, Name: "Dry Food 3", Quantity: 56, Price: 45.7, img: "assets/3.jpg", CategoryID: 1 },
    { ID: 4, Name: "Toy1", Quantity: 43, Price: 16.2, img: "assets/4.jpg", CategoryID: 2 },
    { ID: 9, Name: "Pet House", Quantity: 109, Price: 79.9, img: "assets/9.jpg", CategoryID: 3 },
    { ID: 5, Name: "Toy2", Quantity: 1, Price: 13.4, img: "assets/5.jpg", CategoryID: 2 },
    { ID: 8, Name: "Dog Bed", Quantity: 145, Price: 66.5, img: "assets/8.jpg", CategoryID: 3 },
    ];
  }

  getAll(): IProduct[] {
    return this.prdList;
  }

  getByCatID(catID: number): IProduct[] {
    return (catID != 0) ?
      this.prdList.filter(prd => prd.CategoryID == catID)
      : this.prdList;
  }

  getByID(prdID: number): IProduct | null {
    let foundPrd = this.prdList.find(prd => prd.ID == prdID);
    return (foundPrd) ? foundPrd : null;
  }

  getCart() {
    return this.shoppingCart;
  }

  getOrder() {
    return this.purchasedOrder;
  }

  AddToCart(item: IProduct) {
    this.purchasedOrder = [];
    var newItem: ICart = {
      ID: item.ID,
      Name: item.Name,
      img: item.img,
      Price: item.Price,
      TPrice: item.Price,
      count: 1,
      CategoryID: item.CategoryID
    };
    this.shoppingCart.push(newItem);
    return this.shoppingCart;
  }

  RemoveFromCart(item: ICart) {
    var foundIndex = this.shoppingCart.findIndex(x => x.ID == item.ID);
    if (this.shoppingCart[foundIndex].count == 1) {
      this.shoppingCart.splice(foundIndex, 1);
    } else {
      this.shoppingCart[foundIndex].count -= 1;
      this.shoppingCart[foundIndex].TPrice -= item.Price;
    }
  }

  Increment(item: IProduct) {
    var foundIndex = this.shoppingCart.findIndex(x => x.ID == item.ID);
    if (foundIndex != -1) {
      if (item.Quantity > 1) {
        this.shoppingCart[foundIndex].count += 1;
        this.shoppingCart[foundIndex].TPrice += item.Price;
      }
    }
    return this.shoppingCart[foundIndex].count;
  }

  Decrement(item: IProduct) {
    var foundIndex = this.shoppingCart.findIndex(x => x.ID == item.ID);
    if (foundIndex != -1) {
      if (this.shoppingCart[foundIndex].count == 1) {
        this.Delete(this.shoppingCart[foundIndex]);
      } else {
        this.shoppingCart[foundIndex].count -= 1;
        this.shoppingCart[foundIndex].TPrice -= item.Price;
      }
    }
    return this.shoppingCart[foundIndex].count;
  }

  calcTotalPrice() {
    var TotPrice = 0;
    this.shoppingCart.forEach(element => {
      TotPrice += element.TPrice;
    });
    return TotPrice;
  }

  OrdercheckOut() {
    this.shoppingCart.forEach(element => {
      var index = this.prdList.findIndex(x => x.ID == element.ID);
      this.prdList[index].Quantity -= element.count;
    });
    this.purchasedOrder = this.shoppingCart;
    this.shoppingCart = [];
  }

  Delete(item: ICart) {
    var foundIndex = this.shoppingCart.findIndex(x => x.ID == item.ID);
    this.shoppingCart.splice(foundIndex, 1);
  }
}
