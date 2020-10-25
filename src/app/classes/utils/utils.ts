import { Ruolo, ComboRuolo } from './enums';
import { ElementRef } from '@angular/core';

export class Utils{

    public static backgroundBlue(elementRef: ElementRef){
        elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1B98CE';
    }

    public static backgroundWhite(elementRef: ElementRef){
        elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    }

}