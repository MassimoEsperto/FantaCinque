import { SUCCESS } from 'src/app/classes/utils/costanti';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Utente } from 'src/app/classes/models/utente';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { MyModalValidate } from 'src/app/components/my-modal-validate/my-modal-validate.component';
import { Utils } from 'src/app/classes/utils/utils';

@Component({
  selector: 'gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.scss']
})
export class GestioneUtentiComponent extends GlobalComponent implements OnInit {

  utenti: Utente[];
  editField: string;

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    public dialog: MatDialog,
    private admin: AdminService) {
    super();
  }

  ngOnInit() {
    this.getAllUtenti();
  }

 

  /* CHIAMATE AI SERVIZI */
  getAllUtenti() {
    this.loading_page = true;
    this.spinner.view();

    this.admin.getUtenti()
      .pipe(finalize(() => {
        this.spinner.clear(),
          this.loading_page = false;
      }))
      .subscribe({
        next: (result: Utente[]) => {
          this.utenti = result;
          
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  remove(id: any, id_utente: string) {

    this.loading_page = true;
    this.spinner.view();
    this.admin.delete(id_utente)
      .pipe(finalize(() => {
        this.spinner.clear(),
          this.loading_page = false;
      }))
      .subscribe({
        next: (result: any) => {
          this.utenti.splice(id, 1);
          this.alert.success(SUCCESS)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  validate(user: Utente) {
    this.loading_page = true;
    this.spinner.view();
    this.admin.validate(user)
      .pipe(finalize(() => {
        this.spinner.clear(),
          this.loading_page = false;
      }))
      .subscribe({
        next: (result: any) => {
          this.alert.success(SUCCESS)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }
  /* FINE CHIAMATE AI SERVIZI */


  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.utenti[id][property] = editField;
  }

  onDelete(id: any, id_utente: string) {
    const dialogRef = this.dialog.open(MyModalValidate);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.remove(id, id_utente);
    });
  }

  onValidate(element: Utente) {
    const dialogRef = this.dialog.open(MyModalValidate);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.validate(element);
    });
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }


}