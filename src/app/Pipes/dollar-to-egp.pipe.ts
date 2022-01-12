import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dollarToEgp'
})
export class DollarToEgpPipe implements PipeTransform {

  transform(value: number, rate: number = 15): number {
    return value * rate;
  }
}
