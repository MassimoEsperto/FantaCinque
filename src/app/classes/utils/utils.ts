import { ElementRef } from '@angular/core';

export class Utils{

    public static backgroundBlue(elementRef: ElementRef){
        elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1B98CE';
    }
}