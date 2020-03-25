import { Directive, ElementRef } from '@angular/core';

/**
 * Dyrektywa dodawana do przycisku aby naciśniecie enter klikało w niego
 */
@Directive({
    selector: '[appClickOnEnter]'
})
export class ClickOnEnterDirective {

    private static onEnterPressListener: (event: any) => void = null;
    private static readonly ENTER_KEY_CODE = 13;


    constructor(element: ElementRef) {

        if (ClickOnEnterDirective.onEnterPressListener === null) {
            ClickOnEnterDirective.onEnterPressListener = (event) => {

                try {
                    console.log(event);

                    if (event.keyCode === ClickOnEnterDirective.ENTER_KEY_CODE) {
                        element.nativeElement.click();
                    }
                    return false;
                } catch (e) { }
                return true;
            };
            window.addEventListener('onkeydown', ClickOnEnterDirective.onEnterPressListener);
        }
    }
}
