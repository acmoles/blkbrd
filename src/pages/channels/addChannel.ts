import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams } from 'ionic-angular';

@Component({
  selector: 'add-channel',
  templateUrl: 'addChannel.html'
})
export class AddChannelPage {

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
  let data = { 'foo': 'bar' };
  this.viewCtrl.dismiss(data);
}

}
