import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardpipe'
})
export class CreditCardpipePipe implements PipeTransform {

  transform(value: string): unknown {
    var card = "";
    if(value.length == 16){
      for(let i=0; i<value.length; i++){
        card += value[i];
        if(i!=0 && i%4 == 3){
          card += "-";
        }
      }
    }
    return card.slice(0, card.length-1);
  }
}
