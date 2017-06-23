import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class AppSettingsPage {

  screenOn: boolean;
  logout: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
      this.logout =  this.navParams.get('logout');
      this.screenOn = this.navParams.get('screenOn');
  }

  logoutParent() {
    this.viewCtrl.dismiss();
    this.logout();
  }

    dismiss() {
    let data = { screenOn: this.screenOn };
    this.viewCtrl.dismiss(data);
  }

}
