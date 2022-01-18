import { Component, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { ScheduledAdsService } from 'src/app/Services/scheduled-ads.service';
import { Store } from 'src/app/ViewModels/Store';
import { StoreInfo } from 'src/app/ViewModels/StoreInfo';

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
  constructor(private schAds: ScheduledAdsService) {
    this.sInfo = new Store("The Pet Store"
      , "https://picsum.photos/seed/picsum/500/150"
      , ["Egypt", "UK", "UAE"]
      , true);
  }

  ngOnInit(): void {

    let filteredObservable = this.schAds.getScheduledAds(2).pipe(
      // filter((ad) => ad.includes("50%")),
      // map((ad) =>ad)
    );

    let adsSubscribtion = filteredObservable.subscribe(
      {
        next: (ad: string) => {
          console.log(ad);
          document.getElementById("Ads")!.innerHTML += "<h3>" + ad + "</h3>";
        },
        error: (err) => {
          console.log(`Error: ${err}`);
        },
        complete: () => {
          console.log("Ads finished...")
        }
      });

    this.subscriptionList.push(adsSubscribtion);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe();
    }
  }

}
