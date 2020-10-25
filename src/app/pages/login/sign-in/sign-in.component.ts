import { SpinnerService } from 'src/app/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MyToken } from 'src/app/classes/models/my-token';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends GlobalComponent implements OnInit {

  utente: MyToken;

  constructor(
    private router: Router,
    private alert: AlertService,
    private service: AuthService) {
    super();
  }

  ngOnInit() { }

  /**
   * 
   * @param element effettivo login
   */

  login(element: any) {

    let usr = element.value;
    this.loading_btn = true;

    this.service.login(usr.name, usr.password)
      .pipe(finalize(() => this.resetLoading()))
      .subscribe({

        next: (result: any) => {
          this.utente = result;
          this.service.setToken(this.utente);
          this.router.navigate(['home/dashboard']);

        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


}
