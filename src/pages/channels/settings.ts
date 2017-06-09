import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AuthProvider } from '../../auth';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class AppSettingsPage {

  screenOn: boolean;

  constructor(public viewCtrl: ViewController, public authData: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  logout() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
    // this.navCtrl.setRoot(LoginPage);

    this.authData.logoutUser();
  }

    dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
