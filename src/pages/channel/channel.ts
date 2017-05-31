import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams } from 'ionic-angular';
import { ChannelHistoryPage } from './history';
import { AddPostPage } from './addPost';

@Component({
  selector: 'channel-page',
  templateUrl: 'channel.html'
})
export class ChannelPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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
