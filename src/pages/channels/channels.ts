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
    this.channels = afDB.list('/channels', {
        query: {
          limitToLast: 24
        }
      }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }

  ngOnInit() {
    this.username = this.authData.getName();
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
  console.log('model clicked');
}

  presentAddModal() {
  let addModal = this.modalCtrl.create(AddChannelPage, {data: null}, {

  });
  addModal.onDidDismiss(data => {
    console.log(data);
  });
  addModal.present();
  console.log('model clicked');
  }

  itemTapped(event, item) {
    this.navCtrl.push(ChannelPage, {
      item: item
    });
}

}
