import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { FormazioniService } from 'src/app/services/formazioni.service';
import { RisultatiService } from 'src/app/services/risultati.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends GlobalComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private router: Router,
    private formazioni: FormazioniService,
    private risultati: RisultatiService,
    public dialog: MatDialog) {
    super();
  }

  attuale: string;
  classifiche: any;
  headElements = ['SQUADRA', 'GOL', 'PT'];
  palinsesto: any;
  prossimo: any;



  ngOnInit() {
    this.start()
  }

  start() {
    this.loading_page = true;
    this.spinner.view();
    this.giornata();
  }

  classifica() {
    this.risultati.getClassifica()
      .pipe(finalize(() => {
        this.spinner.clear(),
          this.loading_page = false;
      }))
      .subscribe({
        next: (result: any) => {
          this.classifiche = result

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  calendario() {
    this.risultati.getCalendario()

      .subscribe({
        next: (result: any) => {
          this.palinsesto = result;
          this.prossimoMatch();
          this.classifica();
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  giornata() {
    this.formazioni.getGiornataAttuale()
      .subscribe({

        next: (result: string) => {
          this.attuale = result;
          this.calendario()
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  prossimoMatch() {
    let idUser = this.formazioni.id_utente();

    this.prossimo = this.palinsesto.find(x =>
      x['giornata'] == this.attuale && (x['id_casa'] == idUser || x['id_trasferta'] == idUser)
    );

  }

  inserisciFormazione() {
    this.router.navigate(['/home/formazione']);
  }
}