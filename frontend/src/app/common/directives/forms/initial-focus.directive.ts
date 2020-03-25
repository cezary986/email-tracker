import { Directive, ElementRef } from '@angular/core';

/**
 * Dyrektywa ustawiająca startowy focus na element w formularzu
 */
@Directive({
  selector: '[appInitialFocus]'
})
export class InitialFocusDirective {

  constructor(element: ElementRef) {
    element.nativeElement.focus();
    setTimeout(() => {
      element.nativeElement.focus();
    }, 100);
  }
}
