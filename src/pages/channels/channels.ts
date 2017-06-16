import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AppSettingsPage } from './settings';
import { AddChannelPage } from './addChannel';
import { ChannelPage } from '../channel/channel';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../auth';
import { ChannelsProvider } from '../../getChannels';

import "rxjs/add/operator/map";
import { Subscription } from 'rxjs';

@Component({
  selector: 'channels-page',
  templateUrl: 'channels.html'
})
export class ChannelsPage {

  public channelsSub: Subscription;
  public channels: any[];
  public username: string;
  public loading: Loading;
  public loaded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public modalCtrl: ModalController, public channelsProvider: ChannelsProvider, public authData: AuthProvider,
    public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    this.username = this.authData.getName();
    console.log('username: ' + this.username);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.channelsSub = this.channelsProvider.getChannels().subscribe(channels => {
      this.channels = channels;
      loading.dismiss();
    })
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
    this.channels = null;
  }

  presentSettingsModal() {
  let settingsModal = this.modalCtrl.create(AppSettingsPage, {logout: this.logout.bind(this)}, {
  });
  settingsModal.onDidDismiss(data => {
    if (data) {
      console.log(data);
    }
  });
  settingsModal.present();
}

  presentAddModal() {
  let addModal = this.modalCtrl.create(AddChannelPage, {data: null}, {
  });
  addModal.onDidDismiss(data => {
    if (data) {
      console.log('new channel data: ' + data);
      this.channelsProvider.addChannel(data).then(data => {
        console.log('successfully created new channel');
      }, error => {
        console.log('ERROR creating new channel ' + error);
      });
    }
  });
  addModal.present();
  }

  itemTapped(channel, index) {
    console.log('passing channel index: ' + channel.$key)
    let params = {
      index: channel.$key,
      name: channel.name,
      user: this.username
    }
    this.navCtrl.push(ChannelPage, params);
}

}
