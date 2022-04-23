import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imgURL: string;
  isLogged = false;
  isHomePage = true;

  constructor(private usrAuthSrv: UserAuthService, private router: Router) {
    this.imgURL = "assets/banner.jpg";
  }

  ngOnInit(): void {
    this.usrAuthSrv.isLoggedSubject().subscribe((loginStatus) => {
      this.isLogged = loginStatus;
    })
  }
}
