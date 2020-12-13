import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Utils } from 'src/app/classes/utils/utils';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements AfterViewInit {

  errore:boolean=true;
  verifica:any;

  constructor(private elementRef: ElementRef, private service: AuthService){}

  ngAfterViewInit(){
    Utils.backgroundBlue(this.elementRef)
 }
 ngOnInit() {
   this.verificaVersione();
}

verificaVersione() {

  this.service.verificaVersioneWeb()
    .pipe(finalize(() => {
      
    }
    ))
    .subscribe({

      next: (result: any) => {
        this.verifica=result;
        this.errore=result.error
      },
      error: (error: any) => {
        

      }
    })

}

}