import { Component, OnInit } from '@angular/core';
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
  username: string;

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
  }



  ngOnInit() {
    this.username = this.service.username();

    this.loading_page = true;
    this.spinner.view();
    setTimeout(() => {
      this.spinner.clear()
      this.loading_page = false;
    }, 5000);
  }

  uploadFile() {

    this.loading_btn = true;

    const formData = new FormData();
    formData.append('myfile', this.fileData, this.username + '.png');

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


}
