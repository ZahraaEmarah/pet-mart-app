import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imgURL: string;
  constructor() {
    this.imgURL = "assets/banner.jpg";
   }

  ngOnInit(): void {
  }

}
