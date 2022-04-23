import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IPet } from 'src/app/Models/IPet';
import { PetServiceService } from 'src/app/Services/PetService/pet-service.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent implements OnInit {
  
  petsList: IPet[] = [];
  heart: string = "assets/heart.png";
  hearted: string = "assets/hearted.png";
  selectedValue: number = 0;
  types = ["cats", "dogs"]

  constructor(private petSrv: PetServiceService) { }

  ngOnInit() {
    this.getAllPets();
  }

  async getAllPets() {
    this.petsList = await firstValueFrom(this.petSrv.getAllPets());
  }

  heartIt(item: IPet) {
    const pet = (<HTMLInputElement>document.getElementById(item.id.toString())).src;
    if (pet.includes(this.hearted)) {
      (<HTMLInputElement>document.getElementById(item.id.toString())).src = this.heart;
      item.likes-=1;
      this.petSrv.unlikePet(item.id);
    } else {
      (<HTMLInputElement>document.getElementById(item.id.toString())).src = this.hearted;
      item.likes+=1;
      this.petSrv.likePet(item.id);
    }
  }
}
