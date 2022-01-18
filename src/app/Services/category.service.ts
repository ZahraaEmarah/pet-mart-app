import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../ViewModels/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpHeaders;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.API_Base_URL}/Categories`);
  }

  getCategoryByID(CID: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${environment.API_Base_URL}/Categories/${CID}`);
  }

  postCategory(newCat: ICategory): Observable<ICategory> {
    return this.httpClient.post<ICategory>(`${environment.API_Base_URL}/Categories`, JSON.stringify(newCat), this.httpHeaders);
  }

  putCategory(catID: number, newCat: ICategory) {

  }

  deleteCategory(catID: number) {

  }
}
