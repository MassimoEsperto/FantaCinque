import { SUCCESS } from './../../../../classes/utils/costanti';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { RoseService } from 'src/app/services/rose.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as XLSX from 'xlsx';
import { Rosa } from 'src/app/classes/models/rosa';
import { MatDialog } from '@angular/material/dialog';
import { MyModalValidate } from 'src/app/components/my-modal-validate/my-modal-validate.component';

@Component({
  selector: 'gestione-rose',
  templateUrl: './gestione-rose.component.html',
  styleUrls: ['./gestione-rose.component.scss']
})
export class GestioneRoseComponent extends GlobalComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private service: RoseService,
    public dialog: MatDialog,
    private alert: AlertService) {
    super();
  }

  ngOnInit() { this.listaCalciatori()}

  attuali: any;
  rose: Rosa[] = [];

  importListaCalciatori(event: any) {
    let file: File
    let arrayBuffer: any;

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
    
      for (let element of arraylist) {
       
        let ruolo_iniz: string = element[_EMPTY_0]? element[_EMPTY_0].toString().trim():"";
        if(ruolo_iniz&&ruolo_iniz.length<2){
          let nome: string = element['__EMPTY'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
          let ele:Rosa=new Rosa(ruolo_iniz,nome);
       
          let esiste:boolean=this.attuali.some(x => x.nome_calciatore == nome)
          if(!esiste)this.rose.push(ele);
        }
        if(element['__EMPTY_4']&&element['__EMPTY_4'].length<2){
          let nome: string = element['__EMPTY_5'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
          let ruolo: string = element['__EMPTY_4'].toString().trim()
          
          let ele:Rosa=new Rosa(ruolo,nome);
        
          let esiste:boolean=this.attuali.some(x => x.nome_calciatore == nome)
          if(!esiste)this.rose.push(ele);
        }
      }

    }
  }

  listaCalciatori() {

    this.loading_btn = true;
    this.spinner.view();

    this.service.getListaCalciatori()
      .pipe(finalize(() => {
          this.loading_btn = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.attuali=result;
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  aggiungiCalciatori() {

    this.loading_btn = true;
   
    this.service.insert(this.rose)
      .pipe(finalize(() => {
          this.loading_btn = false;
      }
      ))
      .subscribe({
        next: (result: any) => {
          this.alert.success(SUCCESS);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })
  }

  onAggiungiCalciatori() {
  
      const dialogRef = this.dialog.open(MyModalValidate);
      dialogRef.afterClosed().subscribe(result => {
        if (result)
        this.aggiungiCalciatori();
      });
  }
}
