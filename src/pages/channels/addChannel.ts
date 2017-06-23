import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';


@Component({
  selector: 'add-channel',
  templateUrl: 'addChannel.html'
})
export class AddChannelPage {

  addChannel: FormGroup;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.addChannel = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      password: ['']
    });
  }

  addNewChannel() {
    if (!this.addChannel.valid) {
      let validAlert = this.alertCtrl.create({
        message: "Please enter a channel name",
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
      let d = new Date();
      let dateArray = d.toString().split(' ');
      let time = dateArray[4].slice(0, -3);
      let timestamp = time + ', ' + dateArray[0] + ' ' + dateArray[2]
      let data = {
        messages: [{
          name: 'BLKBRD',
          message: 'Hello channel, this is the first post in the channel',
          timestamp: timestamp,
          uri: 'none'
        }],
        name: this.addChannel.value.name,
        password: this.addChannel.value.password
      };
      this.viewCtrl.dismiss(data);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
