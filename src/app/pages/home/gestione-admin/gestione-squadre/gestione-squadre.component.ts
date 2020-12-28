import { SUCCESS } from './../../../../classes/utils/costanti';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Utente } from 'src/app/classes/models/utente';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { RoseService } from 'src/app/services/rose.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MyModalValidate } from 'src/app/components/my-modal-validate/my-modal-validate.component';

@Component({
  selector: 'gestione-squadre',
  templateUrl: './gestione-squadre.component.html',
  styleUrls: ['./gestione-squadre.component.scss']
})
export class GestioneSquadreComponent extends GlobalComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private service: RoseService,
    public dialog: MatDialog,
    private admin: AdminService,
    private alert: AlertService) {
    super();
  }

  listaRose: any;
  formazioni: any = [];
  selectedTeam: any;
  selectedUtente: Utente;
  utenti: Utente[];

  ngOnInit() { this.listaCalciatori(), this.getAllUtenti() }

  /* CHIAMATE AI SERVIZI */
  listaCalciatori() {

    this.loading_btn = true;
    this.spinner.view();

    this.service.getListaCalciatorigenerale()
      .pipe(finalize(() => {
        this.loading_btn = false;
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

  getAllUtenti() {

    this.admin.getUtenti()
      .subscribe({
        next: (result: Utente[]) => {
          this.utenti = result;
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  clean(payload: any) {

    this.loading_btn = true;

    this.service.delete(payload.id_utente)
      .subscribe({
        next: (result: any) => {
          this.associaCalciatori(payload);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })
  }

  associaCalciatori(payload: any) {

    this.service.associa(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS);
          this.selectedTeam=[]
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  /* FINE CHIAMATE AI SERVIZI */

  importSquadre(event: any) {
    let file: File
    let arrayBuffer: any;
    let formazione_S: any = [];
    let formazione_D: any = [];


    file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      arrayBuffer = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");

      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      let _EMPTY_0 = worksheet.A1['h']

      var arraylist: any = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });

      let team_S: string = "";
      let team_D: string = "";
      for (let i = 0; i < arraylist.length; i++) {

        let element = arraylist[i];

        let ruolo_S: string = element[_EMPTY_0] ? element[_EMPTY_0].toString().trim() : "";
        let ruolo_D: string = element['__EMPTY_4'] ? element['__EMPTY_4'].toString().trim() : "";

        if (ruolo_S && ruolo_S.length < 2) {
          team_S = team_S ? team_S : arraylist[i - 2][_EMPTY_0].toLocaleUpperCase().replace("'", "").replace(".", "").trim()

          let nome_calciatore = element['__EMPTY'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
          let ele = {
            nome: nome_calciatore,
            id_calciatore: this.listaRose.find(x => x['nome_calciatore'] == nome_calciatore).id_calciatore
          }

          formazione_S.push(ele);
        } else {
          if (team_S) {
            let singolo = {
              utente: team_S,
              squadra: formazione_S
            }
            this.formazioni.push(singolo)
            team_S = "";
            formazione_S = [];
          }
        }

        if (ruolo_D && ruolo_D.length < 2) {
          team_D = team_D ? team_D : arraylist[i - 2]['__EMPTY_4'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()

          let nome_calciatore = element['__EMPTY_5'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
          let ele = {
            nome: nome_calciatore,
            id_calciatore: this.listaRose.find(x => x['nome_calciatore'] == nome_calciatore).id_calciatore
          }

          formazione_D.push(ele);
        } else {
          if (team_D) {
            let singolo = {
              utente: team_D,
              squadra: formazione_D
            }
            this.formazioni.push(singolo)
            team_D = "";
            formazione_D = [];
          }
        }

      }

    }
  }


  onSelectedSquadra(event) {
    this.selectedTeam = event.value.squadra;
  }

  onSelectedUtente(event) {
    this.selectedUtente = event.value;
  }

  onAssocia() {

    let payload = {
      id_utente: this.selectedUtente.id,
      lista: this.selectedTeam
    }

      const dialogRef = this.dialog.open(MyModalValidate);
      dialogRef.afterClosed().subscribe(result => {
        if (result)
        this.clean(payload);
      });
  }
}
