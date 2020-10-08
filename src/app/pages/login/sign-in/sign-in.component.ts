import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MyToken } from 'src/app/classes/models/my-token';
import { Utils } from 'src/app/classes/utils/utils';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {

  ngAfterViewInit() {}

  utente: MyToken;
  error = '';
  isPresente: boolean;
  value7
  encapsulation: ViewEncapsulation.None

  constructor(private elementRef: ElementRef, private router: Router, private service: AuthService) { }

  ngOnInit() {
    this.isPresente = true;
  }

  /**
   * 
   * @param loggami effettivo login
   */
  login(loggami) {

    let usr = loggami.value;

    this.service.login(usr.username, usr.password)
      .subscribe({

        next: (result: any) => {
          this.utente = result;

          if (this.utente) {
            this.utente.scadenza = this.scadenza().toString();

            this.service.setLogged(JSON.stringify(this.utente));
            this.router.navigate(['home/dashboard']);
          }
          else {
            this.isPresente = false;
          }
        },
        error: (error: any) => {
          console.log("errore",error)
          // Stampa messaggio d'errore
          this.error = error

        }
      })

  }

  scadenza() {
    let primaDate = new Date();
    primaDate.setHours(primaDate.getHours() + 2);

    return primaDate;
  }

}
