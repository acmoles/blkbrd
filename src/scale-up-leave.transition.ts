import { Animation, PageTransition } from 'ionic-angular';

export class ModalScaleUpLeaveTransition extends PageTransition {

  public init() {
    const ele = this.leavingView.pageRef().nativeElement;
    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    const contentWrapper = new Animation(this.plt, ele.querySelector('.wrapper'));

    wrapper.beforeStyles({ 'transform': 'scale(1)', 'opacity': 1 });
    wrapper.fromTo('transform', 'scale(1)', 'scale(0.9)');
    wrapper.fromTo('opacity', 1, 0.01);

    this
      .element(this.leavingView.pageRef())
      .duration(120)
      .easing('cubic-bezier(0.47,0,0.745,0.715)')
      .add(contentWrapper)
      .add(wrapper);
  }
}
