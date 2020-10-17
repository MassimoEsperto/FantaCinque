import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent extends GlobalComponent implements OnInit {

  constructor(private spinner:SpinnerService) {
    super();
  }

  ngOnInit(){
    this.loading_page=true;
    this.spinner.view();
    setTimeout(() => {
      this.spinner.clear()
      this.loading_page=false;
    }, 5000);
  }

}