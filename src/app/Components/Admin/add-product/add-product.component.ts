import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductAPIService } from 'src/app/Services/product-api.service';
import { ICategory } from 'src/app/Models/ICategory';
import { IProduct } from 'src/app/Models/IProduct';

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

    if (this.PID) {
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

//   postFile(fileToUpload: File): Observable<boolean> {
//     const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.httpClient
//       .post(endpoint, formData, { headers: yourHeadersConfig })
//       .map(() => { return true; })
//       .catch((e) => this.handleError(e));
// }

  insertProduct() {

    const fileElement = document.getElementById('prdImg') as HTMLInputElement
    if (fileElement) {
      console.log(fileElement.files)
    }
    console.log(this.newPrd.img)
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
