import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from 'src/app/classes/utils/global-component';

@Component({
  selector: 'gestione-admin',
  templateUrl: './gestione-admin.component.html',
  styleUrls: ['./gestione-admin.component.scss']
})
export class GestioneAdminComponent extends GlobalComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(){}

 
}