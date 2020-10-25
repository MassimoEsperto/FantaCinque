import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../classes/models/utente';
import { HttpSenderService } from './http-sender-service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadService extends HttpSenderService {

  constructor(private http: HttpClient) {
    super();
  }

  public upload(formData) {
    
    return this.http.post<any>(`${this.buildURL("upload_file")}`, formData)
      .pipe(map((res) => {

        return res['data'];
      }),
        catchError(this.handleError));
  }


  update(utente: Utente) {
    return this.http.put(`${this.buildURL("update_utente")}`, { data: utente })
      .pipe(map((res) => {
        return 'ok';
      }),
      catchError(this.handleError));
  }

}
