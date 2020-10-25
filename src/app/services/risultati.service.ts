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
}
