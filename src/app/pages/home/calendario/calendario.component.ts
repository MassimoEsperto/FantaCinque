import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { RisultatiService } from 'src/app/services/risultati.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent extends GlobalComponent implements OnInit {

  palinsesto:any;

  giornate = [];
 

  constructor(
    private spinner:SpinnerService,
    private alert: AlertService,
    private risultati:RisultatiService) {
    super();
  }

  ngOnInit(){
    this.calendario();
  }


calendario() {
  this.loading_page = true;
  this.spinner.view();

  this.risultati.getCalendario()
    .pipe(finalize(() => {
      this.spinner.clear(),
        this.loading_page = false;
    }))
    .subscribe({
      next: (result: any) => {
        this.palinsesto = result;
      
        let giornate = this.palinsesto.map(({ giornata }) => giornata);
        this.giornate= giornate.filter((n, i) => giornate.indexOf(n) === i);
      },
      error: (error: any) => {
        this.alert.error(error);
      }
    })
}

}