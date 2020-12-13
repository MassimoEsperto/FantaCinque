import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpSenderService } from './http-sender-service';
import { MyToken } from '../classes/models/my-token';
import { Utente } from '../classes/models/utente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpSenderService {
  token: MyToken;
  /**
   * Costruttore
   * @param http Servizio richieste HTTP
   */
  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  /**
   * Login
   * @param username Username
   * @param password Password
   */
  login(username: string, pass: string) {
    const params = new HttpParams()
      .set('user', username).set('pass', pass);

    return this.http.get<MyToken[]>(`${this.buildURL("sign-in")}`, { params: params })
      .pipe(map((res) => {
        if ('negato' == res['data']) {

          return null;
        }

        this.token = res['data'];

        return this.token;

      }),
        catchError(this.handleError));
  }




  /**
   * Effettua il logout
   */
  logout(): void {
    localStorage.removeItem("tk-user");
  }

  /**
   * Verifica se l'utente è loggato
   */
  isLogged(): boolean {

    let token = localStorage.getItem("tk-user")

    if (!token) return false; //nel caso nn ci sia token

    let now = new Date();
    let scadenza: Date = new Date(JSON.parse(localStorage.getItem("tk-user")).scadenza);

    // Ritorna true se il token è presente nella sessione false nel caso sia scaduto
    return !!token && now < scadenza

  }


   /**
   * salva il token in sessione
   * @param tkuser 
   */
  setToken(tkuser: any) {
    tkuser.scadenza = this.scadenza().toString();
    let input=JSON.stringify(tkuser)
    localStorage.setItem('tk-user', input);
  }

/**
 * recupera la password
 * @param username 
 * @param email 
 */
  recupera(username: string, email: string) {
    const params = new HttpParams()
      .set('user', username).set('email', email);
    return this.http.get<any>(`${this.buildURL("rec_password")}`, { params: params })
      .pipe(map((res) => {

        return 'ok';

      }),
        catchError(this.handleError));
  }

  insert(utente: Utente): Observable<Utente[]> {

    return this.http.post(`${this.buildURL("register")}`, { data: utente })
       .pipe(map((res) => {
         let utente=res['data'];
         return utente;
       }),
       catchError(this.handleError));
   }
  

   verificaVersioneWeb() {
    return this.http.get(`${this.buildURL("versione")}`)
      .pipe(map((res) => {
        let verifica={
          applicazione:res['data'],
          locale:this.versione(),
          error:res['data']!=this.versione()
        }
        return verifica;
      }),
      catchError(this.handleError));
  }
}