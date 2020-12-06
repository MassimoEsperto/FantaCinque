import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'
import { WS_BASE_URL } from '../classes/utils/costanti'
import { Ruolo } from '../classes/utils/enums'


export class HttpSenderService {



  buildURL(operation: string = ""): string {

    let URL: string = WS_BASE_URL

    URL = URL + "/" + operation + ".php"

    return URL

  }

  username() {
    return JSON.parse(localStorage.getItem("tk-user")).username
  }

  id_utente() {
    return JSON.parse(localStorage.getItem("tk-user")).id_utente
  }

  ruolo() {
    return JSON.parse(localStorage.getItem("tk-user")).ruolo
  }

  getToken() {
    return JSON.parse(localStorage.getItem("tk-user"))
  }

  isAdmin() {
    let ruolo = this.ruolo();
    if (ruolo == Ruolo.ADMIN) {
      return true
    }
    else {
      return false
    }
  }

  isPlayer() {
    let ruolo = this.ruolo();
    if (ruolo == Ruolo.ADMIN || ruolo == Ruolo.GIOCATORE) {
      return true
    }
    else {
      return false
    }
  }

  scadenza() {
    let primaDate = new Date();
    primaDate.setHours(primaDate.getHours() + 2);

    return primaDate;
  }


  handleError(response: HttpErrorResponse) {
    console.log("response",response)
    return throwError(response.error.message);
  }

  versione(){
    return 2.1
  }
}