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

  ruolo() {
    return JSON.parse(localStorage.getItem("tk-user")).ruolo
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
    if (ruolo == Ruolo.ADMIN || ruolo == Ruolo.VISITATORE) {
      return true
    }
    else {
      return false
    }
  }



  handleError(response: HttpErrorResponse) {
    return throwError(response.error.message);
  }
}