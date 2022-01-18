import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isLogged=false;
  constructor(private usrAuth: UserAuthService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.usrAuth.login("Username","password");
    this.isLogged=true;
  }

  logout()
  {
    this.usrAuth.logOut();
    this.isLogged=false;
  }

}
