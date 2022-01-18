import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductAPIService } from 'src/app/Services/product-api.service';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { IProduct } from 'src/app/ViewModels/IProduct';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newPrd: IProduct = {} as IProduct;
  catList: ICategory[];
  private subscriptionList: Subscription[] = [];
  PID: number = 0;
  count: number = 0;

  constructor(private prdSrv: ProductAPIService, private catSrv: CategoryService
    , private router: Router, private activatedRoute: ActivatedRoute) {
    this.catList = [];
    this.newPrd.img = '';
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.PID = Number(paramMap.get("pid"));
      this.count = Number(paramMap.get("pCount"));
      console.log(this.PID);
    });

    if(this.PID){
      this.prdSrv.getProductByID(this.PID)
      .subscribe((myProduct) => {
        this.newPrd = myProduct;
      });
    }

    let c = this.catSrv.getAllCategories().subscribe((ctList) => {
      this.catList = ctList;
    });
    this.subscriptionList.push(c);
  }

  insertProduct() {
    if (this.PID) {
      this.prdSrv.putProduct(this.PID, this.newPrd)
      .subscribe({
        next: (prd => {
          this.router.navigate(['/Products'])
        }),
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.prdSrv.postProduct(this.newPrd)
        .subscribe({
          next: (prd => {
            this.router.navigate(['/Products'])
          }),
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }
}
