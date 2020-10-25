import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { MyModalValidateComponent } from 'src/app/components/my-modal-validate/my-modal-validate.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends GlobalComponent implements OnInit {

  constructor(private spinner:SpinnerService,public dialog: MatDialog) {
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