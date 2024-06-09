import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:5177/api/PetController/GetPets'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getValues(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  getValue(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}`);
  }

  postValue(value: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { value });
  }
}
