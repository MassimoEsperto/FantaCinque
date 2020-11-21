import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Utente } from 'src/app/classes/models/utente';
import { MAX_IMG, SUCCESS } from 'src/app/classes/utils/costanti';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.scss']
})
export class InfoUtenteComponent extends GlobalComponent implements OnInit {

  constructor(
    private service: UploadService,
    private alert: AlertService) {
    super();
  }

  fileData: File = null;
  previewUrl: any = null;
  id_utente: string;
  username: string;
  element: any;

  fileProgress(fileInput: any) {
    let tmp: File = <File>fileInput.target.files[0];

    if (tmp.size > MAX_IMG) {
      this.alert.error("Immagine troppo grande max "+MAX_IMG+" kb");
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
  }



  ngOnInit() {
    this.username = this.service.username()
    this.id_utente = this.service.id_utente();
    this.element = this.service.getToken();
  }

  uploadFile() {

    this.loading_btn = true;

    const formData = new FormData();
    formData.append('myfile', this.fileData, 'utente_' + this.id_utente + '.png');

    this.service.upload(formData)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.alert.success(SUCCESS);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  update(element: any) {

    this.loading_btn = true;
    let utente: Utente = new Utente(element.username, '', element.email, element.squadra.toUpperCase())
    utente.id = element.id_utente
    this.service.update(utente)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.alert.success(SUCCESS);
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })
  }

}
