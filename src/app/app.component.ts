import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myAngularApp';
  cartClicked: boolean = false;

  toggleCart(){
    this.cartClicked = !this.cartClicked;
    console.log(this.cartClicked);
  }
}
