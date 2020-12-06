import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpSenderService } from './http-sender-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormazioniService extends HttpSenderService {
  /**
   * Costruttore
   * @param http Servizio richieste HTTP
   */
  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  /*
   * restituisce la rasa in base all' id
   * @param id_user 
   */
  getRosa(id_user: string) {
    const params = new HttpParams()
      .set('id_user', id_user);

    return this.http.get<any>(`${this.buildURL("rosa_utente")}`, { params: params })
      .pipe(map((res) => {

        return res['data'];

      }),
        catchError(this.handleError));
  }

  getGiornataAttuale() {
    return this.http.get(`${this.buildURL("giornata_attuale")}`).pipe(
      map((res) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getPartitaAttuale(id_user: string) {
    const params = new HttpParams()
      .set('id_user', id_user);

    return this.http.get<any>(`${this.buildURL("partita_attuale")}`, { params: params })
      .pipe(map((res) => {

        let items = res['data'];
        let attuale = items[0].id_partita
        let precedente = [];
        for (let i = 1; i < items.length; i++) {
          let item = items[i];
          precedente.push(item);
        }
        return {attuale:attuale,precedente:precedente};

      }),
        catchError(this.handleError));
  }


  insert(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("schieramento")}`, { data: payload })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  getFormazioni(giornata: string) {

    const params = new HttpParams()
      .set('giornata', giornata);

    return this.http.get<any>(`${this.buildURL("formazioni")}`, { params: params })
      .pipe(map((res) => {

        return res['data'];

      }),
        catchError(this.handleError));
  }


  calcolo(input: any, filelist: any) {

    let partite = [];
    let result = [];
    for (let ele of input) {
      let tmp = filelist.find(x => x['nome'] == ele['calciatore']);

      ele.voto = tmp ? Number(tmp.voto) : 4;
      let esiste = partite.some(x => x == ele.id_partita)
      if (!esiste) {
        partite.push(ele.id_partita)

        let casa = []
        let trasferta = []
        let match = input.filter(x => x.id_partita == ele.id_partita);

        for (let i = 0; i < 5; i++) {
          casa.push(match[i])
        }
        for (let i = 5; i < 10; i++) {
          trasferta.push(match[i])
        }

        let singola = {
          id_partita: ele.id_partita,
          casa: {
            squadra: casa[0].squadra,
            id_utente: casa[0].id_utente,
            totale: 0,
            gol: 0,
            formazione: casa
          },
          trasferta: {
            squadra: trasferta[0].squadra,
            id_utente: trasferta[0].id_utente,
            totale: 0,
            gol: 0,
            formazione: trasferta
          }
        }
        result.push(singola)
      }
    }

    return result;
  }

  voti(risultati: any): Observable<any[]> {

    let payload_voti = [];
    let payload_ris = [];
    for (let ris of risultati) {
      let voti_casa = {
        id_partita: ris.id_partita,
        id_utente: ris.casa.id_utente,
        lista: ris.casa.formazione,
      }
      let voti_trasf = {
        id_partita: ris.id_partita,
        id_utente: ris.trasferta.id_utente,
        lista: ris.trasferta.formazione,
      }

      let ris_match = {
        id_partita: ris.id_partita,
        gol_casa: ris.casa.gol,
        gol_trasferta: ris.trasferta.gol,
        pt_casa: ris.casa.gol > ris.trasferta.gol ? 3 : ris.casa.gol == ris.trasferta.gol ? 1 : 0,
        pt_trasferta: ris.trasferta.gol > ris.casa.gol ? 3 : ris.casa.gol == ris.trasferta.gol ? 1 : 0
      }

      payload_voti.push(voti_casa);
      payload_voti.push(voti_trasf);
      payload_ris.push(ris_match)
    }

    return this.http.post(`${this.buildURL("voti")}`, { data: payload_voti })
      .pipe(map((res) => {
        return payload_ris;
      }),
        catchError(this.handleError));
  }

  calendario(payload: any): Observable<any[]> {

    return this.http.post(`${this.buildURL("calcolo")}`, { data: payload })
      .pipe(map((res) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  match(match: string) {

    const params = new HttpParams()
      .set('match', match);

    return this.http.get<any>(`${this.buildURL("match_live")}`, { params: params })
      .pipe(map((res) => {

        return res['data'];

      }),
        catchError(this.handleError));
  }

}
