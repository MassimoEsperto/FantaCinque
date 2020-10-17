

export abstract class  GlobalComponent {

    loading_page: boolean = true;
    loading_btn: boolean = false;

    resetLoading() {
        this.loading_page = false;
        this.loading_btn = false;
    }


}