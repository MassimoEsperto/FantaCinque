import { ComboRuolo, Ruolo } from './enums';


export abstract class  GlobalComponent {

    loading_page: boolean = true;
    loading_btn: boolean = false;

    resetLoading() {
        this.loading_page = false;
        this.loading_btn = false;
    }

    getRuolo(input:any){
        switch (Number(input)) {
            case Ruolo.ADMIN:
                return ComboRuolo.ADMIN_DESC
                break;
            case Ruolo.GIOCATORE:
                return ComboRuolo.GIOCATORE_DESC
                break;
             default:
             return ComboRuolo.VISITATORE_DESC   
             break;
        }
    }

}