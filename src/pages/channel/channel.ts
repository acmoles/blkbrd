import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ChannelHistoryPage } from './history';
import { AddPostPage } from './addPost';

@Component({
  selector: 'channel-page',
  templateUrl: 'channel.html'
})
export class ChannelPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private statusBar: StatusBar) {

  }

  isVisible= true;
  isInvisible= false;
  touchOverlay= false;

  ngOnInit() {
    this.statusBar.hide();
    setTimeout(() => {
      this.isVisible= false;
      this.isInvisible= true;
      this.touchOverlay= true;
    }, 2000);
  }

  ngOnDestroy() {
    this.statusBar.show();
  }

  removeOverlay() {
    this.isVisible= true;
    this.isInvisible= false;
    this.touchOverlay= false;
    setTimeout(() => {
      this.isVisible= false;
      this.isInvisible= true;
      this.touchOverlay= true;
    }, 5000);
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

  presentHistoryModal() {
  let historyModal = this.modalCtrl.create(ChannelHistoryPage, {data: null}, {

  });
  historyModal.onDidDismiss(data => {
    console.log(data);
  });
  historyModal.present();
  console.log('model clicked');
  }

}
