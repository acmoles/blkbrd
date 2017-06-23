import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[mutationObserver]' })
export class mutationObserverDirective {
    public observer;

    constructor(public elRef: ElementRef) {
      this.observer = new MutationObserver(mutations => {
        mutations.forEach(function(mutation) {
          console.log(mutation.type);
          if (mutation.type === 'childList') {

          }
        });
      });
      var config = { attributes: true, childList: true, characterData: true };

      this.observer.observe(this.elRef.nativeElement, config);
    }

}
