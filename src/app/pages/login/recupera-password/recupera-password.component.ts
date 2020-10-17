import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MyToken } from 'src/app/classes/models/my-token';
import { SUCCESS } from 'src/app/classes/utils/costanti';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.scss']
})
export class RecuperaPasswordComponent extends GlobalComponent implements OnInit {

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
   * @param recupera password
   */
  recupera(element: any) {

    let usr = element.value;
    this.loading_btn = true;

    this.service.recupera(usr.username, usr.mail)
      .pipe(finalize(() => this.resetLoading()))
      .subscribe({
        next: (result: any) => {
          this.resetLoading();
          this.alert.error(SUCCESS);
        },
        error: (error: any) => {
          this.resetLoading();
          this.alert.error(error);
        },

      })

  }


}
