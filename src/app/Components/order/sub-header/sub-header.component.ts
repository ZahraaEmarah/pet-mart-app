import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { Discount } from 'src/app/ViewModels/Discounts';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { ProductsComponent } from '../master/products/products.component';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit, AfterViewInit {

  CatList: ICategory[] = [];
  selectedValue: number = 0;
  done: boolean = false;
  logo:string = "";
  StoreName:string = "";
  Discount:string = "";

  @ViewChild(ProductsComponent) child!:ProductsComponent;

  constructor(private catSrv: CategoryService) { 
    
  }

  ngOnInit(): void {
    this.catSrv.getAllCategories().subscribe((ctList) => {
      this.CatList = ctList;
    })
  }

  ngAfterViewInit(): void {
    this.CatList = this.child.CatList;
    this.selectedValue = this.child.selectedValue;
    this.StoreName = this.child.myStore.Name;
    this.logo = this.child.logo;
    this.Discount = this.child.Discount.toString();
  }

}
