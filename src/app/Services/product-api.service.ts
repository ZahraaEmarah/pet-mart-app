import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart } from '../Models/ICart';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {

  private httpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.API_Base_URL}/Products`);
  }

  getProductsByCatID(cID: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.API_Base_URL}/Products?CategoryID=${cID}`);
  }

  filterProducts(filter: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.API_Base_URL}/Products?CategoryID=${filter}`);
  }

  getProductByID(pid: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.API_Base_URL}/Products/${pid}`);
  }

  postProduct(newPrd: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(`${environment.API_Base_URL}/Products`, JSON.stringify(newPrd), this.httpHeaders);
  }

  putProduct(prdID: number, newPrd: IProduct) {
    return this.httpClient.put<IProduct>(`${environment.API_Base_URL}/Products/${prdID}`, JSON.stringify(newPrd), this.httpHeaders);
  }

  deleteProduct(prdID: number) {
    return this.httpClient.delete<IProduct>(`${environment.API_Base_URL}/Products/${prdID}`);
  }
}
