import { Component } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        // let timestamp = firebase.database.ServerValue.TIMESTAMP
        let d = new Date();
        let dateArray = d.toString().split(' ');
        let time = dateArray[4].slice(0, -3);
        let timestamp = time + ', ' + dateArray[0] + ' ' + dateArray[2]
        let data = {
           name : this.currentUser,
           message: this.addPost.value.message,
           timestamp: timestamp,
           uri: 'none'
        };
        this.viewCtrl.dismiss(data);
    }
  }

  deleteLast() {
    let data = {
      deleteLast: true
    }
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
  this.viewCtrl.dismiss();
  }

}
