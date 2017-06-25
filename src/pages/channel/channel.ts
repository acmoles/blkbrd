import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
// import { ChannelHistoryPage } from './history';
import { AddPostPage } from './addPost';

import { ChannelsProvider } from '../../getChannels';
import * as Rx from 'rxjs';

@Component({
  selector: 'channel-page',
  templateUrl: 'channel.html'
})
export class ChannelPage {
  @ViewChild(Slides) slides: Slides;
  public haveSlides: boolean = true;

  public isVisible: boolean = true;
  public isInvisible: boolean = false;
  public touchOverlay: boolean = false;
  public overlayTimeout: any;
  public initialTimout: any;

  public channel$: Rx.Subscription;
  public messages: any[];
  public currentUser: string;
  public currentChannel: string;
  public channelIndex: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private statusBar: StatusBar,
    public navParams: NavParams, public viewCtrl: ViewController, public channelsProvider: ChannelsProvider,
    public androidFullScreen: AndroidFullScreen
  ) {
  }

  ionViewDidLoad() {
    this.currentUser = this.navParams.get('user');
    this.currentChannel = this.navParams.get('name');
    this.channelIndex = this.navParams.get('index');
    console.log('current user: ' + this.currentUser + ', current channel: ' + this.currentChannel + ', current channel index: ' + this.channelIndex);

    this.channel$ = this.channelsProvider.getChannel(this.channelIndex).subscribe(channel => {
      this.messages = channel.messages;
      console.log('messages incoming: ')
      console.log(this.messages);
    });

    this.initialTimout = setTimeout(() => {
      this.isVisible = false;
      this.isInvisible = true;
      this.touchOverlay = true;
    }, 8000);

    this.slides.ionSlideDidChange.subscribe(() => {
      clearTimeout(this.overlayTimeout);
      clearTimeout(this.initialTimout);
      this.overlayTimeout = setTimeout(() => {
        this.isVisible = false;
        this.isInvisible = true;
        this.touchOverlay = true;
      }, 10000);
    })

  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.statusBar.hide();
      this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));
    }, 10000)
    window.addEventListener('orientationchange', () => {
      console.log('orientation changed');
      this.haveSlides = false;
      // this.haveSlides = true;
      setTimeout(() => { this.haveSlides = true; }, 500);
    });
  }

  ionViewWillLeave() {
    this.channel$.unsubscribe();
    this.statusBar.show();
    this.androidFullScreen.showSystemUI();
  }

  slideChanged() {
    console.log('slides did change');
  }

  removeOverlay() {
    this.isVisible = true;
    this.isInvisible = false;
    this.touchOverlay = false;
    this.overlayTimeout = setTimeout(() => {
      this.isVisible = false;
      this.isInvisible = true;
      this.touchOverlay = true;
    }, 8000);
  }

  presentNewPostModal() {
    let addPostModal = this.modalCtrl.create(AddPostPage, { userName: this.currentUser }, {
    });
    addPostModal.onDidDismiss(data => {
      if (data) {
        if (data.deleteLast) {
          this.messages.shift();
          this.channelsProvider.updateMessageList(this.channelIndex, this.messages).then(data => {
            console.log('successfully deleted last message');
          }, error => {
            console.log('ERROR deleting last message ' + error);
          });
        } else {
          console.log(data);
          this.messages.unshift(data);
          this.channelsProvider.updateMessageList(this.channelIndex, this.messages).then(data => {
            console.log('successfully added new message');
          }, error => {
            console.log('ERROR adding new message ' + error);
          });
        }
      }
    });
    addPostModal.present();
  }

}
