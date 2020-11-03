import { SUCCESS } from './../../../classes/utils/costanti';
import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Rosa } from 'src/app/classes/models/rosa';
import { FormazioniService } from 'src/app/services/formazioni.service';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'formazione',
  templateUrl: './formazione.component.html',
  styleUrls: ['./formazione.component.scss']
})
export class FormazioneComponent extends GlobalComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private service: FormazioniService) {
    super();
  }

  ngOnInit() {
    this.getRosa(); //Calcola la rosa all'avvio
  }

  //dichiara le variabili
  rosa = [];
  squadra = [];


  drop(event: CdkDragDrop<Rosa[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  validate(item: CdkDrag<Rosa>, allList: CdkDragDrop<Rosa>) {

    let lista = allList['data'];
    let player = item.data;

    let size = lista.length;

    if (size > 4)
      return false;

    let centro = lista.filter(e => e.tipo === 'C').length;
    let difensori = lista.filter(e => e.tipo === 'D').length;
    let attaccanti = lista.filter(e => e.tipo === 'A').length;
    let portieri = lista.filter(e => e.tipo === 'P').length;

    switch (player.tipo) {
      case 'P': {
        return portieri < 1 && (size < 4 || (centro > 0 && attaccanti > 0 && difensori > 0));
        break;
      }
      case 'D': {
        return difensori < 2 && (size < 4 || (centro > 0 && attaccanti > 0));
        break;
      }
      case 'C': {
        return centro < 2 && (size < 4 || (difensori > 0 && attaccanti > 0));
        break;
      }
      case 'A': {
        return attaccanti < 2 && (size < 4 || (centro > 0 && difensori > 0));
        break;
      }
      default: {
        return true;
        break;
      }
    }

    return true;
  }

  getRosa() {
    this.loading_page = true;
    this.spinner.view();
    let id_utente = this.service.id_utente();

    this.service.getRosa(id_utente)
      .pipe(finalize(() => {
        this.spinner.clear(), this.loading_page = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.rosa = result //assegna la rosa
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  enableInsert() {
    let ver: number = this.squadra.length;
    let vel: boolean = ver == 5 ? false : true;
    return vel;
  }

  //prepara la formazione da inserire
  formazione() {
    this.loading_btn = true;
    let id_utente = this.service.id_utente()
    this.service.getPartitaAttuale(id_utente)
      .subscribe({

        next: (result: string) => {
          this.schieramento(result)
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  //inserisce materialmente nel db la formazione
  schieramento(giornata: string) {

    let id_utente = this.service.id_utente();

    let payload = {
      lista: [],
      id_partita: giornata,
      id_utente: id_utente,
    }

    for (let membro of this.squadra) {
      payload.lista.push(membro.id)
    }

    this.service.insert(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


}
