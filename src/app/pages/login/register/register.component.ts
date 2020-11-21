import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MyToken } from 'src/app/classes/models/my-token';
import { Utente } from 'src/app/classes/models/utente';
import { SUCCESS } from 'src/app/classes/utils/costanti';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends GlobalComponent implements OnInit {

  utente: MyToken;

  constructor(
    private router: Router,
    private alert: AlertService,
    private service: AuthService) {
    super();
  }

  ngOnInit() { }


  registrati(element: any) {

    let ut: any = element.value;
    this.loading_btn = true;

    let newUtente: Utente = new Utente(ut.username, ut.password, ut.email, ut.squadra.toUpperCase());

    this.service.insert(newUtente)
      .pipe(finalize(() => this.resetLoading()))
      .subscribe({
        next: (result: any) => {
          this.alert.success(SUCCESS);
          this.navigateToHome()
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })

  }


  navigateToHome() {
    setTimeout(() => {
      this.router.navigate(['/sign-in'])
    }, 2000);
  }

}
