import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpSenderService } from './http-sender-service';
import { Observable } from 'rxjs';
import { Rosa } from '../classes/models/rosa';

@Injectable({
  providedIn: 'root'
})
export class RoseService extends HttpSenderService {
  /**
   * Costruttore
   * @param http Servizio richieste HTTP
   */
  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  getListaCalciatori() {
    return this.http.get(`${this.buildURL("lista_calciatori")}`).pipe(
      map((res) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getListaCalciatoriByRuolo() {
    return this.http.get(`${this.buildURL("lista_by_ruolo")}`).pipe(
      map((res) => {
        let generale: any = res['data'];
        let ordinata = {
          d: generale.filter(x => x.ruolo == 'D'),
          p: generale.filter(x => x.ruolo == 'P'),
          c: generale.filter(x => x.ruolo == 'C'),
          a: generale.filter(x => x.ruolo == 'A'),
        }
        return ordinata;

      }),
      catchError(this.handleError));
  }

  getListaCalciatorigenerale() {
    return this.http.get(`${this.buildURL("lista_by_ruolo")}`).pipe(
      map((res) => {
       
        return res['data'];

      }),
      catchError(this.handleError));
  }

  insert(rose: Rosa[]) {

    return this.http.post(`${this.buildURL("insert_svincolati")}`, { data: rose })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  delete(id_utente:string) {
    const params = new HttpParams()
      .set('id_utente', id_utente);

    return this.http.get(`${this.buildURL("clean_rosa")}`, { params: params })
      .pipe(map(res => {    
        return 'ok';
      }),
      catchError(this.handleError));
  }

  associa(lista: any) {

    return this.http.post(`${this.buildURL("associa_calciatori")}`, { data: lista })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }
}
