import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

// import * as firebase from 'firebase/app';


@Component({
  selector: 'about-page',
  templateUrl: 'about.html'
})
export class AboutPage {


  constructor(public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
