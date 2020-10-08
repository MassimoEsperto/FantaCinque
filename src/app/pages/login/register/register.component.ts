import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Utils } from 'src/app/classes/utils/utils';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef){

  }
  ngAfterViewInit(){
    Utils.backgroundBlue(this.elementRef)
 }
}