import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpSenderService } from './http-sender-service';

@Injectable({
  providedIn: 'root'
})
export class RisultatiService extends HttpSenderService {
  /**
   * Costruttore
   * @param http Servizio richieste HTTP
   */
  constructor(private http: HttpClient) {
    super();
  }

  getCalendario() {
    return this.http.get(`${this.buildURL("risultati")}`).pipe(
      map((res) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getClassifica() {
    return this.http.get(`${this.buildURL("classifica")}`).pipe(
      map((res) => {

        let classifiche: any = res['data'];
      
        let girone: string = classifiche[0].girone;
        let risultati = [];
        let result = []
        for (let gironi of classifiche) {
          if (gironi.girone == girone) {
            risultati.push(gironi)
          }
          else {

            let single = { girone: girone, lista: risultati }
            result.push(single)
            risultati = []
            risultati.push(gironi)
            girone = gironi.girone;

          }
        }
        girone = classifiche[classifiche.length - 1].girone;
        let single = { girone: girone, lista: risultati }
        result.push(single)

        return result;

      }),
      catchError(this.handleError));
  }
}
