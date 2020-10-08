import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Utils } from 'src/app/classes/utils/utils';

@Component({
  selector: 'recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.scss']
})
export class RecuperaPasswordComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef){

  }
  ngAfterViewInit(){
    Utils.backgroundBlue(this.elementRef)
 }
}
