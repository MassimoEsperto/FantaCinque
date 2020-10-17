import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent implements OnInit {

  //parametri di input valorizzati di default
  @Input() submit=false;
  @Input() disabled = false;
  @Input() color:string="info";
  @Input() label:string="Clicca";
  @Input() block = false;
  @Input() loading = false;
  type:string;
  
  constructor() { }

  ngOnInit(){
    this.type=this.submit?"submit":"button";  
  }

}
