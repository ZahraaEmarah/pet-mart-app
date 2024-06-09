import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // get<T>(url: string, options?: any): Observable<T> {
  //   return this.http.get<T>(url, { ...options, observe: 'body' }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // post<T>(url: string, body: any, options?: any): Observable<T> {
  //   return this.http.post<T>(url, body, { ...options, observe: 'body' }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle errors here
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
