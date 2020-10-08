import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Utils } from 'src/app/classes/utils/utils';


@Component({
  selector: 'presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef){

  }
  ngAfterViewInit(){
    Utils.backgroundBlue(this.elementRef)
 }
}