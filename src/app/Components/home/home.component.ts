import { Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, map, Subscription } from 'rxjs';
import { ScheduledAdsService } from 'src/app/Services/scheduled-ads.service';
import { Store } from 'src/app/Models/Store';
import { StoreInfo } from 'src/app/Models/StoreInfo';
import { IPet } from 'src/app/Models/IPet';
import { PetServiceService } from 'src/app/Services/PetService/pet-service.service';

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
  mostLiked = <IPet>{};

  constructor(private schAds: ScheduledAdsService,
    private petSrv: PetServiceService) {
    this.imgURL = "assets/banner.jpg";
    this.sInfo = new Store("The Pet Store"
      , "https://picsum.photos/seed/picsum/500/150"
      , ["Egypt", "UK", "UAE"]
      , true);
  }

  async ngOnInit() {

    this.getAllPets();
    // let filteredObservable = this.schAds.getScheduledAds(2).pipe(
    //   // filter((ad) => ad.includes("50%")),
    //   // map((ad) =>ad)
    // );

    // let adsSubscribtion = filteredObservable.subscribe(
    //   {
    //     next: (ad: string) => {
    //       console.log(ad);
    //       document.getElementById("Ads")!.innerHTML += "<h3>" + ad + "</h3>";
    //     },
    //     error: (err) => {
    //       console.log(`Error: ${err}`);
    //     },
    //     complete: () => {
    //       console.log("Ads finished...")
    //     }
    //   });

    // this.subscriptionList.push(adsSubscribtion);
  }

  async getAllPets() {

    this.petsList = await firstValueFrom(this.petSrv.getAllPets());
    this.mostLiked = this.getMostLiked();
    
    console.log(this.petsList)
    console.log(this.mostLiked)
  }

  getMostLiked(): IPet {
    var max = this.petsList.reduce(function (a, b) {
      return Math.max(a, b.likes);
    }, 0);
    console.log(max)
    return this.petsList.find(x => x.likes == max)!;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }

}
