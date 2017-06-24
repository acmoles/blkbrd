import { Component, ContentChild } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AppSettingsPage } from './settings';
import { AddChannelPage } from './addChannel';
import { ChannelPage } from '../channel/channel';
import { LoginPage } from '../login/login';

import { mutationObserverDirective } from '../../mutation';

import { AuthProvider } from '../../auth';
import { ChannelsProvider } from '../../getChannels';
import { FirebaseListObservable } from 'angularfire2/database';

import { Insomnia } from '@ionic-native/insomnia';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/finally';
// import { Observable } from 'rxjs';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'channels-page',
  templateUrl: 'channels.html'
})
export class ChannelsPage {

  public channelsObserv: FirebaseListObservable<any[]>;
  public channels: any[];
  public username: string;
  public loading: Loading;

  public firstLoad: boolean = true;
  public screenOn: boolean = true;

  @ContentChild(mutationObserverDirective) mutation;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public modalCtrl: ModalController, public channelsProvider: ChannelsProvider, public authData: AuthProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public insomnia: Insomnia) {
  }

  ionViewDidLoad() {
    this.username = this.authData.getName();
    console.log('username: ' + this.username);
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.channelsObserv = this.channelsProvider.getChannels();

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

  onMutation() {
    setTimeout(() => {
      this.loading.dismissAll();
    }, 2000)
  }

  ionViewWillLeave() {
    this.firstLoad = false;
  }

  logout() {
    // this.channelsSub.unsubscribe();
    this.navCtrl.setRoot(LoginPage);
    // this.channels = null;
  }

  presentSettingsModal() {
    let settingsModal = this.modalCtrl.create(AppSettingsPage, { logout: this.logout.bind(this), screenOn: this.screenOn }, {
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
    let addModal = this.modalCtrl.create(AddChannelPage, { data: null }, {
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

  itemTapped(channel) {
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

  deleteChannel(channel) {
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
                  this.removeChannelCallback(channel);
              } else {
                return false;
              }
            }
          },
        ]
      });
      passwordAlert.present();
    } else {
      this.removeChannelCallback(channel);
    }
  }

  removeChannelCallback(channel) {
    let key = channel.$key;
    this.channelsProvider.removeChannel(key).then(data => {
      console.log('successfully removed channel: ' + key);
    }, error => {
      console.log('ERROR creating new channel ' + error);
    });
  }

}
