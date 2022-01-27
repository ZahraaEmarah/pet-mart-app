import { Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, map, Subscription } from 'rxjs';
import { ScheduledAdsService } from 'src/app/Services/scheduled-ads.service';
import { Store } from 'src/app/Models/Store';
import { StoreInfo } from 'src/app/Models/StoreInfo';
import { IPet } from 'src/app/Models/IPet';
import { PetServiceService } from 'src/app/Services/PetService/pet-service.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private subscriptionList: Subscription[] = [];
  sInfo: Store;
  clientFeedback: string = "";
  Ads: string = "";
  imgURL: string;
  petsList: IPet[] = [];
  likedList: IPet[] = [];
  index: number = 3;
  heart: string = "assets/heart.png";
  hearted: string = "assets/hearted.png";
  split: number = 6;

  constructor(private schAds: ScheduledAdsService,
    private petSrv: PetServiceService) {
    this.imgURL = "assets/banner.jpg";
    this.sInfo = new Store("The Pet Store"
      , "https://picsum.photos/seed/picsum/500/150"
      , ["Egypt", "UK", "UAE"]
      , true);
  }

  ngOnInit() {
    this.getAllPets();
  }

  async getAllPets() {
    this.petsList = await firstValueFrom(this.petSrv.getAllPets());
    this.getMostLiked();
  }

  getMostLiked() {
    this.likedList = this.petsList.sort((a, b) => b.likes - a.likes).slice(0, 6);
  }

  Next() {
    this.index = 0;
    this.split = 3;
  }

  Prev() {
    this.index = 3;
    this.split = 6;
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

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }

}
