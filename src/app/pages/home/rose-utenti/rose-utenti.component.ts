import { Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { finalize } from 'rxjs/operators';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { RoseService } from 'src/app/services/rose.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'rose-utenti',
  templateUrl: './rose-utenti.component.html',
  styleUrls: ['./rose-utenti.component.scss']
})
export class RoseUtentiComponent extends GlobalComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private spinner: SpinnerService,
    private service: RoseService,
    private alert: AlertService) {
    super();
  }

  listaRose: any;

  ngOnInit(){this.listaRoseUtenti()}

   /* CHIAMATE AI SERVIZI */
   listaRoseUtenti() {

    this.loading_page = true;
    this.spinner.view();

    this.service.getListaRose()
      .pipe(finalize(() => {
        this.loading_page = false;
        this.spinner.clear();
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.listaRose = result;
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }
}
