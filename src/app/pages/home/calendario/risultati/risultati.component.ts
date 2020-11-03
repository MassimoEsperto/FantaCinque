import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { MyModalMatch } from 'src/app/components/my-modal-match/my-modal-match.component';
import { FormazioniService } from 'src/app/services/formazioni.service';

@Component({
  selector: 'risultati',
  templateUrl: './risultati.component.html',
  styleUrls: ['./risultati.component.scss']
})
export class RisultatiComponent implements OnInit {

  @Input() num: number;
  @Input() palinsesto: any;
  selected: any;

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private service: FormazioniService,
    public dialog: MatDialog,) { }

  ngOnInit() { }

  ngOnChanges() {
    this.selected = this.palinsesto.filter(e => e.giornata === this.num);
    console.log("this.selected ",this.selected)
  }


  viewMatch(partita: string) {

    this.service.match(partita)
      .subscribe({

        next: (result: any) => {
          this.dialog.open(MyModalMatch, { data: result });
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }



}
