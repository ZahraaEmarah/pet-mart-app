import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAdsService {

  private adsList: string[];
  constructor() {
    this.adsList = ["Big Sale for limited time..."
      , "Discounts up to 50%"
      , "Shop now, and get unlimited Offers up to 50%"
      , "Thanks for shopping with us"];
  }

  getScheduledAds(adsIntervalInSec: number = 3): Observable<string> {

    let adsTimer: any;
    let counter = 0;

    return new Observable<string>((observer) => {
      adsTimer = setInterval(() => {
        if (this.adsList[counter] == "") {
          observer.error("Empty Ad.");
        }
        observer.next(this.adsList[counter]);
        counter++;

        if (counter == this.adsList.length) {
          observer.complete();
        }
      }, adsIntervalInSec * 1000);

      return {
        unsubscribe() {
          console.log("In Observable unsubscribe");
          clearInterval(adsTimer);
        }
      }
    })
  }

  getSerialAds(): Observable<string> {
    return from(this.adsList);
  }
}
