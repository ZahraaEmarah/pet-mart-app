import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ErrorComponent } from './Components/error/error.component';
import { HomeComponent } from './Components/home/home.component';
import { MainLayoutComponent } from './Components/Layout/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/order/master/product-details/product-details.component';
import { ProductsComponent } from './Components/order/master/products/products.component';
import { ShoppingCartComponent } from './Components/order/master/shopping-cart/shopping-cart.component';
import { SubHeaderComponent } from './Components/order/sub-header/sub-header.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';

const routes: Routes = [ //First match wins strategy
  { path: 'Login', component: UserLoginComponent },
  { path: 'Register', component: UserRegistrationComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' }, //Default path

  // Child routes
  {
    path: '', component: MainLayoutComponent, children: [
      { path: 'Products', component: SubHeaderComponent },
      { path: 'Products/:pid', component: ProductDetailsComponent },
      { path: 'Order', component: ShoppingCartComponent },
      { path: 'AddProduct', component: AddProductComponent },
      {
        path: 'User',
        loadChildren: () => import('src/app/Components/User/user.module')
          .then(m => m.UserModule)
      },
      { path: 'About', component: AboutComponent },
      { path: 'Contact', component: ContactUsComponent },
      {path:'Admin/Dashboard', component:AdminDashboardComponent},
    ]
  },
  { path: "**", component: ErrorComponent } //Wild card path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
