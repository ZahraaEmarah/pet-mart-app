import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ErrorComponent } from './Components/error/error.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/order/master/product-details/product-details.component';
import { ShoppingCartComponent } from './Components/order/master/shopping-cart/shopping-cart.component';
import { SubHeaderComponent } from './Components/order/sub-header/sub-header.component';

const routes: Routes = [ //First match wins strategy
   {path:'', redirectTo:'/Home', pathMatch: 'full'}, //Default path
   {path:'Home', component:HomeComponent},
   {path:'Order', component:ShoppingCartComponent},
   {path:'Details/:pid/:pCount', component:ProductDetailsComponent},
   {path:'About', component:AboutComponent},
   {path:'Contact-Us', component:ContactUsComponent},
   {path:'Products', component:SubHeaderComponent},
   {path:'Error/:eid', component:ErrorComponent},
   {path:"**", component:ErrorComponent} //Wild card path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
