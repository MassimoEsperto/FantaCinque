import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MyToken } from 'src/app/classes/models/my-token';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { Utils } from 'src/app/classes/utils/utils';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends GlobalComponent implements OnInit {

  ngAfterViewInit() { }
  utente: MyToken;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private alert: AlertService,
    private service: AuthService) {
    super();
  }

  ngOnInit() { }

  /**
   * 
   * @param loggami effettivo login
   */
  login(loggami) {

    let usr = loggami.value;
    this.loading_btn = true;

    this.service.login(usr.username, usr.password)
      .subscribe({

        next: (result: any) => {
          this.resetSucces()//nessun alert poichè deve navigare
          this.utente = result;
          // this.utente.scadenza = this.service.scadenza().toString();
          // this.service.setLogged(JSON.stringify(this.utente));
          this.service.setToken(this.utente);
          this.router.navigate(['home/dashboard']);

        },
        error: (error: any) => {
          this.alert.error(error);
          this.stampaErrore(error);
        }
      })

  }


}
