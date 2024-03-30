import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isloggedSubject: BehaviorSubject<boolean>;
  private httpHeaders;

  constructor(private httpClient: HttpClient) {
    this.isloggedSubject = new BehaviorSubject<boolean>(false);
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  RegisterNewUser(newUser: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.API_Base_URL}/Users`, JSON.stringify(newUser), this.httpHeaders);
  }

  login(usrName: string, password: string) {
    let fakeToken: string = "17d0cb24-60cb-4e5b-8857-6601e5da7427";
    fakeToken = usrName + - + password
    localStorage.setItem("Token", fakeToken);
    this.isloggedSubject.next(true);
  }

  logOut() {
    localStorage.removeItem("Token");
    this.isloggedSubject.next(false);
  }

  isLoggedSubject(): Observable<boolean> {
    return this.isloggedSubject.asObservable();
  }

  get isLogged() {
    return localStorage.getItem('Token') ? true : false;
  }

  checkUniqueEmail(email: string) : Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${environment.API_Base_URL}/Users?email=${email}`);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${environment.API_Base_URL}/Users`);
  }
}
