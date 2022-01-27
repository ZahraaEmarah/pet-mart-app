import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  isLogged: boolean = true;
  registerFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private usrAuth: UserAuthService, private router: Router) {
    this.registerFormGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.isLogged = this.usrAuth.isLogged;
  }

  get email() {
    return this.registerFormGroup.get('email');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  login() {
    console.log("Login")
    this.usrAuth.login(this.email?.value, this.password?.value);
    this.isLogged = this.usrAuth.isLogged;
    this.router.navigate(['/Home']);
  }

  logout() {
    this.usrAuth.logOut();
    this.isLogged = this.usrAuth.isLogged;
  }

}
