import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalIDPipe'
})
export class NationalIDPipe implements PipeTransform {

  transform(value: string, DatePart: string): unknown {
    var res = "";
    var year = value.slice(1,3);
    var month = value.slice(3,5);
    var day = value.slice(5,7);

    if(DatePart == "FullDate"){
      res = "Your Birthdate is "+day +"/"+month+"/"+year;
    }else if(DatePart == "YY"){
      res = "Your birth year is " + year;
    }else if(DatePart == "MM"){
      res = "Your birth month is " + month;
    }else if(DatePart == "DD"){
      res = "Your birth day is " + day;
    }
    return res;
  }
}
