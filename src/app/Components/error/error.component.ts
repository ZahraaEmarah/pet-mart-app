import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errID: number=0;
  constructor(private activatedRoute: ActivatedRoute
    , private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.errID=Number(paramMap.get("eid"));
      console.log(this.errID);
    });
  }

}
