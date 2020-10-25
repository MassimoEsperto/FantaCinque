import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { finalize } from 'rxjs/operators';
import { Utente } from 'src/app/classes/models/utente';
import { SUCCESS } from 'src/app/classes/utils/costanti';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.scss']
})
export class InfoUtenteComponent extends GlobalComponent implements OnInit {

  constructor(
    private service: UploadService,
    private alert: AlertService,
    private spinner: SpinnerService) {
    super();
  }

  fileData: File = null;
  previewUrl: any = null;
  id_utente: string;
  username: string;
  element:any;

  fileProgress(fileInput: any) {
    let tmp: File = <File>fileInput.target.files[0];
   
    if (tmp.size > 40000) {
      this.alert.error("Immagine troppo grande");
      return;
    }
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }

    this.alert.success(SUCCESS);
  }



  ngOnInit() {
    this.username = this.service.username()
    this.id_utente = this.service.id_utente();
    this.element=this.service.getToken();
    console.log("this.element",this.element)
  }

  uploadFile() {
 
    this.loading_btn = true;

    const formData = new FormData();
    formData.append('myfile', this.fileData,'utente_'+ this.id_utente + '.png');

    this.service.upload(formData)
      .subscribe({

        next: (result: any) => {
          this.resetLoading();
          this.alert.error(SUCCESS);

        },
        error: (error: any) => {
          this.resetLoading();
          this.alert.error(error);
        }
      })

  }

  update(element: any) {

    this.loading_btn = true;
    let utente:Utente=new Utente(element.username,'',element.email,element.squadra)
    utente.id=element.id_utente
    this.service.update(utente)
      .pipe(finalize(() =>   
      this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.alert.error(SUCCESS);
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })
  }

}
