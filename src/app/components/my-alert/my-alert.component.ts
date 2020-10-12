import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'my-alert',
    templateUrl: './my-alert.component.html',
    styleUrls: ['./my-alert.component.scss']
})
export class MyAlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alert: AlertService) { }

    ngOnInit() {
        this.subscription = this.alert.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success alert-dismissible';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-warning alert-dismissible';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    closeAlert() {
        this.alert.clear()
    }
}