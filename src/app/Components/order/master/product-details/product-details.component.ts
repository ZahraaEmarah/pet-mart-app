import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  PID: number=0;
  count:number=0;
  constructor(private prdSrv: ProductServiceService, 
    private activatedRoute: ActivatedRoute, 
    private router:Router,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.PID=Number(paramMap.get("pid"));
      this.count=Number(paramMap.get("pCount"));
      console.log(this.PID);
    });
  }

  getProd(){
    return this.prdSrv.getByID(this.PID);
  }

  getImg(){
    return this.getProd()?.img;
  }

  getName(){
    return this.getProd()?.Name;
  }

  getPrice(){
    return this.getProd()?.Price;
  }

  getDescription(){
    return this.getProd()?.Name;
  }

  getQuantity(){
    return this.getProd()?.Quantity;
  }

  Add(){
    this.prdSrv.AddToCart(this.getProd()!);
  }

  getCountInCart(){
    var foundIndex = this.prdSrv.getCart().findIndex(x => x.ID == this.PID)
    if(foundIndex != -1){
      return this.prdSrv.getCart()[foundIndex].count;
    }
    return -1;
  }

  Decrement(){
    this.prdSrv.Decrement(this.prdSrv.getByID(this.PID)!);
  }

  Increment(){
    this.prdSrv.Increment(this.prdSrv.getByID(this.PID)!);
  }

  getNextProd(){
    var nxtItem = this.prdSrv.getNext(this.PID);
    this.router.navigate(['/Details', nxtItem.ID, nxtItem.Quantity]);
  }

  getPrevProd(){
    var PrvItem = this.prdSrv.getPrev(this.PID);
    this.router.navigate(['/Details', PrvItem.ID, PrvItem.Quantity]);
  }

  isLast(){
    if(this.prdSrv.getByID(this.PID + 1)){
      return false;
    }
    return true;
  }

  goBack()
  {
    this.location.back();
  }
}
