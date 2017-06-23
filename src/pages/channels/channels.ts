import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AppSettingsPage } from './settings';
import { AddChannelPage } from './addChannel';
import { ChannelPage } from '../channel/channel';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../auth';
import { ChannelsProvider } from '../../getChannels';

import { Insomnia } from '@ionic-native/insomnia';

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

  public firstLoad: boolean = true;
  public screenOn: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public modalCtrl: ModalController, public channelsProvider: ChannelsProvider, public authData: AuthProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public insomnia: Insomnia) {
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
    // initialize insomnia - default to on
    if (this.screenOn) {
        this.insomnia.keepAwake().then(
          () => console.log('insomnia success'),
          () => console.log('insomnia error')
        );
    } else {
      this.insomnia.allowSleepAgain().then(
          () => console.log('insomnia turn off success'),
          () => console.log('insomnia turn off error')
        );
    }
  }

  ionViewWillLeave() {
    this.firstLoad = false;
  }

  logout() {
    this.channelsSub.unsubscribe();
    this.navCtrl.setRoot(LoginPage);
    this.channels = null;
  }

  presentSettingsModal() {
  let settingsModal = this.modalCtrl.create(AppSettingsPage, {logout: this.logout.bind(this), screenOn: this.screenOn}, {
  });
  settingsModal.onDidDismiss(data => {
    if (data) {
      this.screenOn = data.screenOn;
      if (this.screenOn) {
          this.insomnia.keepAwake().then(
            () => console.log('insomnia success'),
            () => console.log('insomnia error')
          );
      } else {
        this.insomnia.allowSleepAgain().then(
            () => console.log('insomnia turn off success'),
            () => console.log('insomnia turn off error')
          );
      }
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
  if (channel.password) {
    let passwordAlert = this.alertCtrl.create({
      message: "Please enter the channel password",
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
        {
          text: "Ok",
          role: 'cancel',
          handler: (data) => {
            if (data.password === channel.password) {
                this.navCtrl.push(ChannelPage, params);
            } else {
              return false;
            }
          }
        },
      ]
    });
    passwordAlert.present();
  } else {
    this.navCtrl.push(ChannelPage, params);
  }
}

}
