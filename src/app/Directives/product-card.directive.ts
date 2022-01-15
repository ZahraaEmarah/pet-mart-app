import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appProductCard]'
})
export class ProductCardDirective {
  @Input() defaultColor: string = "gray";

  constructor(private elem: ElementRef) {
    this.elem.nativeElement.style = `border-radius: 15px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;`;
  }

  @HostListener('mouseover') onMouseOver() {
    this.elem.nativeElement.style = `border-radius: 15px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; cursor: pointer;`;
  }

  @HostListener('mouseout') onMouseOut() {
    this.elem.nativeElement.style = `border-radius: 15px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;`;
  }

}
