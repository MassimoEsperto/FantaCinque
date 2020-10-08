import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.scss']
})
export class InfoUtenteComponent implements OnInit {

  constructor(private service: UploadService) { }
  currentFile: File;
  username: string;

  ngOnInit() {
    this.username = this.service.username();
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    console.log("formData", this.currentFile)
    this.uploadFile(this.currentFile)
  }

  uploadFile(file: File) {

    const formData = new FormData();
    formData.append('myfile', file, this.username + '.png');

    this.service.upload(formData)
      .subscribe({

        next: (result: any) => {
          console.log("result", result)

        },
        error: (error: any) => {
          console.log("errore", error)
          // Stampa messaggio d'errore
          //  this.error = error
        }
      })

  }


}
