import { SUCCESS } from './../../../classes/utils/costanti';
import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from 'src/app/classes/utils/global-component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Rosa } from 'src/app/classes/models/rosa';
import { FormazioniService } from 'src/app/services/formazioni.service';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { RisultatiService } from 'src/app/services/risultati.service';

@Component({
  selector: 'formazione',
  templateUrl: './formazione.component.html',
  styleUrls: ['./formazione.component.scss']
})
export class FormazioneComponent extends GlobalComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private risultati: RisultatiService,
    private service: FormazioniService) {
    super();
  }

  ngOnInit() {
    this.getPartitaAttuale(); //Calcola la rosa all'avvio
  }

  //dichiara le variabili
  rosa = [];
  squadra = [];
  precedente = [];
  attuale: string;


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



  enableInsert() {
    let ver: number = this.squadra.length;
    let vel: boolean = ver == 5 ? false : true;
    return vel;
  }

  sortedByRuoli() {
    let sortedsquadra = this.squadra.sort((n1, n2) => {
      if (n1.tipo < n2.tipo) {
        return 1;
      }

      if (n1.tipo > n2.tipo) {
        return -1;
      }

      return 0;
    });

    return sortedsquadra;
  }


  //inserisce materialmente nel db la formazione
  formazione() {

    let id_utente = this.service.id_utente();
    this.loading_btn = true;
    let payload = {
      lista: [],
      id_partita: this.attuale,
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



  getPartitaAttuale() {
    this.loading_page = true;
    this.spinner.view();
    let id_utente = this.service.id_utente()
    this.service.getPartitaAttuale(id_utente)
      .subscribe({

        next: (result: any) => {
          this.attuale = result.attuale;
          this.precedente = result.precedente;
          this.calendario();

        },
        error: (error: any) => {
          console.log("getPartitaAttuale: ",error);
          this.spinner.clear();
          this.alert.error(error);

        }
      })

  }


  calendario() {
    this.risultati.getCalendario()

      .subscribe({
        next: (result: any) => {
          this.prossimoMatch(result);
        },
        error: (error: any) => {
          this.spinner.clear();
          this.alert.error(error);
        }
      })
  }


  /**
   * rosa al netto dello sfidante
   * @param id_utente 
   * @param sfidante a false se si gioca in casa
   */
  getRosaCasa(id_utente, sfidante) {

    this.service.getRosa(id_utente)
      .pipe(finalize(() => {
        this.spinner.clear(), this.loading_page = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.calcolaRosa(result, sfidante);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  getRosaSfidante(id_utente, id_sfidante) {

    this.service.getRosa(id_sfidante)
      .pipe(finalize(() => {
        this.spinner.clear(), this.loading_page = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.getRosaCasa(id_utente, result);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  /**
   * calcola la rosa in base allo sfdante
   * @param lista 
   * @param sfidante 
   */
  calcolaRosa(lista: any, sfidante: any) {

    for (let ele of lista) {
      let doppiato = sfidante.some(x => x.id == ele.id);
      ele.disabled = doppiato;
    }

    this.calcolaPrecedente(lista);
  }

  calcolaPrecedente(lista) {
    let pre = []
    let post = []
    if (this.precedente.length) {
      for (let item of lista) {
        let present = this.precedente.some(x => x.id_calciatore == item.id);
        if (present) {
          pre.push(item);
        }
        else {
          post.push(item)
        }
      }
      this.rosa = post;
    } else {
      this.rosa = lista;
    }

    this.squadra = pre;
  }

  /**
   * se il prossimo turno prevede che l'utente giochi in casa 
   * avrà a disposizione tutta la rosa, nel caso negativo 
   * gli verranno sottratti i giocatori presenti già nella squadra di casa
   * @param palinsesto 
   */
  prossimoMatch(palinsesto) {

    let id_casa = this.service.id_utente();
    let prossimo = palinsesto.find(x => x['partita'] == this.attuale);
    if (!prossimo) {
      this.spinner.clear();
      this.alert.error("Non sono previste partite col tuo account");
    } else {
      if (id_casa == prossimo.id_casa) {
        this.getRosaCasa(prossimo.id_casa, []);
      } else {
        this.getRosaSfidante(prossimo.id_trasferta, prossimo.id_casa);
      }
    }
  }

}
