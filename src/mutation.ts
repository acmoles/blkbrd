import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[mutation-observer]'
})
export class mutationObserverDirective {
    public observer;
    public firstMutation: boolean = true;
    @Output() onMutation = new EventEmitter<boolean>();

    constructor(public elRef: ElementRef) {

      this.observer = new MutationObserver(mutations => {

        let onMutation = this.onMutation;
        let self = this;
        mutations.forEach(function(mutation) {
          console.log(mutation.type);

          if (mutation.type === 'childList' && self.firstMutation) {
            self.didMutate()
            onMutation.emit(true);
          }

        });
      });
      var config = { attributes: true, childList: true, characterData: true };

      this.observer.observe(this.elRef.nativeElement, config);
    }

    didMutate() {
      this.firstMutation = false;
    }

}
