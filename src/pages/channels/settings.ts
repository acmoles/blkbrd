import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class AppSettingsPage {

  screenOn: boolean;
  colorChanging: boolean;
  wordClock: boolean;
  name: string;
  logout: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
      this.logout =  this.navParams.get('logout');

      this.name =  this.navParams.get('name');

      this.screenOn = this.navParams.get('screenOn');
      this.colorChanging = this.navParams.get('colorChanging');
      this.wordClock = this.navParams.get('wordClock');
  }

  logoutParent() {
    this.viewCtrl.dismiss();
    this.logout();
  }

    dismiss() {
    let data = { screenOn: this.screenOn, colorChanging: this.colorChanging, wordClock: this.wordClock, name: this.name };
    this.viewCtrl.dismiss(data);
  }

}
