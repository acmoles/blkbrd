import { Component } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';


@Component({
  selector: 'add-post',
  templateUrl: 'addPost.html'
})
export class AddPostPage {

  addPost: FormGroup;
  currentUser: string;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public navParams: NavParams) {
    this.addPost = formBuilder.group({
      message: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.currentUser = this.navParams.get('userName');
    console.log('modal sees user: ' + this.currentUser)
  }

  addNewPost() {
    if (!this.addPost.valid){
        let validAlert = this.alertCtrl.create({
          message: "Please enter a message",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {

              }
            }
          ]
        });
        validAlert.present();
      } else {
        let data = {
           name : this.currentUser,
           message: this.addPost.value.message,
           timestamp: firebase.database.ServerValue.TIMESTAMP,
           uri: 'none'
        };
        this.viewCtrl.dismiss(data);
    }
  }

  dismiss() {
  this.viewCtrl.dismiss();
  }

}
