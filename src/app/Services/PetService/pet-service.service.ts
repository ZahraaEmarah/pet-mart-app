import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPet } from 'src/app/Models/IPet';

@Injectable({
  providedIn: 'root'
})
export class PetServiceService {

  private httpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getAllPets(): Observable<IPet[]> {
    let p = this.httpClient.get<IPet[]>(`${environment.API_Base_URL}/api/pet/GetPets`);
    console.log(p);
    return p;
  }

  getPetsByOwnerID(oID: number): Observable<IPet[]> {
    return this.httpClient.get<IPet[]>(`${environment.API_Base_URL}/Pets?ownerID=${oID}`);
  }

  getPetByID(pid: number): Observable<IPet> {
    return this.httpClient.get<IPet>(`${environment.API_Base_URL}/Pets/${pid}`);
  }

  postPet(newPet: IPet): Observable<IPet> {
    return this.httpClient.post<IPet>(`${environment.API_Base_URL}/Pets`, JSON.stringify(newPet), this.httpHeaders);
  }

  putPet(petID: number, newPet: IPet) {
    return this.httpClient.put<IPet>(`${environment.API_Base_URL}/Pets/${petID}`, JSON.stringify(newPet), this.httpHeaders);
  }

  deletePet(petID: number) {
    return this.httpClient.delete<IPet>(`${environment.API_Base_URL}/Pets/${petID}`);
  }

  async likePet(petID: number) {
    var myPet= <IPet> {};
    myPet = await firstValueFrom(this.getPetByID(petID));
    myPet.likes += 1;
    await firstValueFrom(this.putPet(petID, myPet));
    console.log(myPet)
  }

  async unlikePet(petID: number) {
    var myPet= <IPet> {};
    myPet = await firstValueFrom(this.getPetByID(petID));
    myPet.likes -= 1;
    await firstValueFrom(this.putPet(petID, myPet));
    console.log(myPet)
  }
}
