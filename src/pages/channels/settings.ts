import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams } from 'ionic-angular';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class AppSettingsPage {

  screenOn: boolean;

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
  let data = { 'foo': 'bar' };
  this.viewCtrl.dismiss(data);
}

}
