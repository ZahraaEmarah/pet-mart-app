import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  onDisplay: number = 0;
  itemsNo: number = 0;
  constructor(private router: Router, private shoppingCartSrv: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartSrv.getCartLength().subscribe((itemsNoInCart)=>
    {
      this.itemsNo=itemsNoInCart;
    })
  }
}
