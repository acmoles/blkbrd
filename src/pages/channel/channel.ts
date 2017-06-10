import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ChannelHistoryPage } from './history';
import { AddPostPage } from './addPost';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import "rxjs/add/operator/map";

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

  public channels: FirebaseListObservable<any[]>;
  public messages: any = [];
  public currentUser: string;
  public currentChannel: string;
  public channelIndex: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private statusBar: StatusBar,
    public navParams: NavParams, public viewCtrl: ViewController, public afDB: AngularFireDatabase
  ) {
  }

  ionViewDidLoad() {
    this.statusBar.hide();

    this.currentUser = this.navParams.get('user');
    this.currentChannel = this.navParams.get('name');
    this.channelIndex = this.navParams.get('index');
    console.log('current user: ' + this.currentUser + 'current channel: ' + this.currentChannel)

    this.channels = this.afDB.list('/channels', {
        query: {
          limitToLast: 24
        }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;

    this.channels.subscribe(channels => {
      this.messages = channels[this.channelIndex].messages.slice().reverse();
    })

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


  ngOnDestroy() {
    this.statusBar.show();
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
  let addPostModal = this.modalCtrl.create(AddPostPage, {data: null}, {

  });
  addPostModal.onDidDismiss(data => {
    console.log(data);
  });
  addPostModal.present();
  console.log('model clicked');
}

  // presentHistoryModal() {
  // let historyModal = this.modalCtrl.create(ChannelHistoryPage, {data: null}, {
  //
  // });
  // historyModal.onDidDismiss(data => {
  //   console.log(data);
  // });
  // historyModal.present();
  // console.log('model clicked');
  // }

}
