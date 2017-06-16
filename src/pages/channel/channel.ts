import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
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

  public isVisible: boolean = true;
  public isInvisible: boolean = false;
  public touchOverlay: boolean = false;
  public overlayTimeout: any;
  public initialTimout: any;

  public channelSub: Rx.Subscription;
  public messages: Rx.Observable<any>;
  public messagesSub: Rx.Subscription;
  public messsagesArray: any[];
  public currentUser: string;
  public currentChannel: string;
  public channelIndex: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private statusBar: StatusBar,
    public navParams: NavParams, public viewCtrl: ViewController, public channelsProvider: ChannelsProvider
  ) {
  }

  ionViewDidLoad() {
    this.statusBar.hide();

    this.currentUser = this.navParams.get('user');
    this.currentChannel = this.navParams.get('name');
    this.channelIndex = this.navParams.get('index');
    console.log('current user: ' + this.currentUser + ', current channel: ' + this.currentChannel);

    this.channelSub = this.channelsProvider.getChannel(this.channelIndex).subscribe(channel => {
      this.messages = Rx.Observable.create(observer => {
          observer.next(channel.messages);
      });
    })

    this.messagesSub = this.messages.subscribe(messages => {
      this.messsagesArray = messages
      this.slides.update();
      // this.updateSlider();
    });

    this.initialTimout = setTimeout(() => {
      this.isVisible= false;
      this.isInvisible= true;
      this.touchOverlay= true;
    }, 4000);

    this.slides.ionSlideDidChange.subscribe(() => {
      clearTimeout(this.overlayTimeout);
      clearTimeout(this.initialTimout);
      this.overlayTimeout = setTimeout(() => {
        this.isVisible= false;
        this.isInvisible= true;
        this.touchOverlay= true;
      }, 8000);
    })

  }

//   ionViewDidEnter() {
//     if (this.messages) {
//     this.updateSlider();
//   } else {
//     console.log('something went wrong');
//   }
// }

  ionViewWillLeave() {
    this.statusBar.show();
  }

  updateSlider() {
    let messagesLength = this.messsagesArray.length;
    this.slides.slideTo(messagesLength - 1, 500);
  }

  removeOverlay() {
    this.isVisible= true;
    this.isInvisible= false;
    this.touchOverlay= false;
    this.overlayTimeout = setTimeout(() => {
      this.isVisible= false;
      this.isInvisible= true;
      this.touchOverlay= true;
    }, 8000);
  }

  presentNewPostModal() {
  let addPostModal = this.modalCtrl.create(AddPostPage, {userName: this.currentUser}, {
  });
  addPostModal.onDidDismiss(data => {
    if (data) {
      console.log(data);
      this.messsagesArray.push(data);
      this.channelsProvider.addMessage(this.channelIndex, this.messsagesArray).then(data => {
        console.log('successfully added new message');
      }, error => {
        console.log('ERROR creating new channel ' + error);
      });
    }
  });
  addPostModal.present();
}

}
