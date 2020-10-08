import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { HttpSenderService } from './http-sender-service';


@Injectable({
  providedIn: 'root'
})
export class UploadService extends HttpSenderService {

  SERVER_URL: string = "http://fantashitcup.altervista.org/base/uploadFile.php";

  constructor(private http: HttpClient) {
    super();
  }

  public upload(formData) {

    return this.http.post<any>(this.SERVER_URL, formData)
      .pipe(map((res) => {

        return res['data'];
      }),
        catchError(this.handleError));
  }


}
