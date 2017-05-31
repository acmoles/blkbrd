import { Component } from '@angular/core';
import { ViewController, NavController, ModalController, NavParams } from 'ionic-angular';

@Component({
  selector: 'add-post',
  templateUrl: 'addPost.html'
})
export class AddPostPage {

  screenOn: boolean;

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
  let data = { 'foo': 'bar' };
  this.viewCtrl.dismiss(data);
}

}
