import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams } from 'ionic-angular';
import { AppSettingsPage } from './settings';
import { AddChannelPage } from './addChannel';
import { ChannelPage } from '../channel/channel';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import "rxjs/add/operator/map";

@Component({
  selector: 'channels-page',
  templateUrl: 'channels.html'
})
export class ChannelsPage {

  public channels: FirebaseListObservable<any[]>;
  public username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public modalCtrl: ModalController, public afDB: AngularFireDatabase, public authData: AuthProvider) {
  }

  ionViewDidLoad() {
    this.username = this.authData.getName();

    this.channels = this.afDB.list('/channels', {
        query: {
          limitToLast: 24
        }
      }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
    this.authData.logoutUser();
  }

  presentSettingsModal() {
  let settingsModal = this.modalCtrl.create(AppSettingsPage, {logout: this.logout.bind(this)}, {

  });
  settingsModal.onDidDismiss(data => {
    console.log(data);
  });
  settingsModal.present();
}

  presentAddModal() {
  let addModal = this.modalCtrl.create(AddChannelPage, {data: null}, {

  });
  addModal.onDidDismiss(data => {
    console.log(data);
  });
  addModal.present();
  }

  itemTapped(channel, index) {
    let params = {
      index: index,
      name: channel.name,
      user: this.username
    }
    this.navCtrl.push(ChannelPage, params);
}

}
