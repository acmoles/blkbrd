import { Animation, PageTransition } from 'ionic-angular';

export class ModalScaleUpEnterTransition extends PageTransition {

  public init() {
    const ele = this.enteringView.pageRef().nativeElement;
    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));

    wrapper.beforeStyles({ 'transform': 'scale(1)', 'opacity': 1 });
    wrapper.fromTo('transform', 'scale(0.95)', 'scale(1.0)');
    wrapper.fromTo('opacity', 0.01, 1);

    this
      .element(this.enteringView.pageRef())
      .duration(120)
      .easing('cubic-bezier(0.47,0,0.745,0.715)')
      .add(wrapper);
  }
}
