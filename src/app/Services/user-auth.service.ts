import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isloggedSubject: BehaviorSubject<boolean>;
  
  constructor() {
    this.isloggedSubject = new BehaviorSubject<boolean>(false);
  }

  login(usrName: string, password: string) {
    let fakeToken: string = "17d0cb24-60cb-4e5b-8857-6601e5da7427";
    localStorage.setItem("Token", fakeToken);
    this.isloggedSubject.next(true);
  }

  logOut() {
    localStorage.removeItem("Token");
    this.isloggedSubject.next(false);
  }

  isUsrLogged(): Observable<boolean> {
    return this.isloggedSubject.asObservable();
  }

}
