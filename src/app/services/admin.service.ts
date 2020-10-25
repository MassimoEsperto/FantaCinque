import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Utente } from '../classes/models/utente';
import { HttpSenderService } from './http-sender-service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpSenderService {
  
  utenti: Utente[];

  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  getUtenti(): Observable<Utente[]> {
    return this.http.get(`${this.buildURL("utenti")}`).pipe(
      map((res) => {
        this.utenti = res['data'];
       
        return res['data'];
    }),
    catchError(this.handleError));
  }



  validate(utente: Utente) {
    return this.http.put(`${this.buildURL("validate_utenti")}`, { data: utente })
      .pipe(map((res) => {
        return 'ok';
      }),
      catchError(this.handleError));
  }

  delete(id_utente:string) {
    const params = new HttpParams()
      .set('id_utente', id_utente);

    return this.http.get(`${this.buildURL("delete_user")}`, { params: params })
      .pipe(map(res => {    
        return 'ok';
      }),
      catchError(this.handleError));
  }


}

