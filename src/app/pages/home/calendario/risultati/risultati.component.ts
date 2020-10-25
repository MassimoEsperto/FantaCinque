import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { MyModalValidateComponent } from 'src/app/components/my-modal-validate/my-modal-validate.component';

@Component({
  selector: 'risultati',
  templateUrl: './risultati.component.html',
  styleUrls: ['./risultati.component.scss']
})
export class RisultatiComponent implements OnInit {

  @Input() num:number;
  @Input() palinsesto:any;
  selected:any;

  constructor(  
    private spinner: SpinnerService,
    private alert: AlertService,
    public dialog: MatDialog,) { }

  ngOnInit() {}

  ngOnChanges() {
    this.selected = this.palinsesto.filter(e => e.giornata === this.num);
    console.log("selected",this.selected)
    
  }

  viewmatch(match:string){
    console.log("match selezionato",match);
    const dialogRef = this.dialog.open(MyModalValidateComponent);
  }

}
