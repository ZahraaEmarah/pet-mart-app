import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  onDisplay: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  HomePage(){
    this.onDisplay = 0;
    this.router.navigate(['/']);
  }

  ShoppingCart(){
    this.onDisplay = 1;
    this.router.navigate(['/Order']);
  }
}
