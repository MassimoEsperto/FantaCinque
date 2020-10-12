import { SUCCESS } from './costanti';

export class GlobalComponent {

    error = '';
    success = '';
    loading_page: boolean = true;
    loading_btn: boolean = false;

    successo() {
        this.success = SUCCESS;
        this.resetErrors();
    }

    resetSucces() {
        this.loading_page = false;
        this.loading_btn = false;
        this.success = '';
        this.error = '';
    }

    resetErrors() {
        this.loading_page = false;
        this.loading_btn = false;
        setTimeout(() => {
            this.success = '';
            this.error = '';
        }, 4000);

    }

    stampaErrore(errore) {
        console.log("errore", errore)
        this.error = errore
        this.resetErrors();
    }

}