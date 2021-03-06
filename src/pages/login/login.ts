import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular';
import { ChannelsPage } from '../channels/channels';
import { SignupPage } from '../signup/signup';
import { AboutPage } from './about';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../email';

import { AuthProvider } from '../../auth';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm:FormGroup;
  loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
  public formBuilder: FormBuilder, public alertCtrl: AlertController,
  public loadingCtrl: LoadingController, public modalCtrl: ModalController) {

    this.loginForm = formBuilder.group({
    email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
    password: ['']
});

  }

  ionViewDidEnter() {
      this.authData.logoutUser();

      setTimeout(() => {
        let logoScene = document.getElementById('scene');
        logoScene.classList.remove('scene-login');
        logoScene.classList.add('scene-loop');
      }, 3100);

      // setTimeout(() => {
      //   let background = document.getElementById('background');
      //   background.classList.remove('gradient-background');
      //   background.classList.add('invisible');
      // }, 3600);
  }

  login(formData) {

    if (!this.loginForm.valid){
      let validAlert = this.alertCtrl.create({
        message: "Please enter a valid email address",
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
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ChannelsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
    }

}

reset() {

if (!this.loginForm.valid){
  let validAlert = this.alertCtrl.create({
    message: "Please enter your email address to reset your password",
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
      this.authData.resetPassword(this.loginForm.value.email)
      .then((user) => {
        let alert = this.alertCtrl.create({
          message: "We just sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {

              }
            }
          ]
        });
        alert.present();
      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
      });
    }
  }

gotoSignUp(event, item) {
  this.navCtrl.push(SignupPage, {
    item: item
  });
}

skipAuth(event, item) {
  this.navCtrl.push(ChannelsPage, {
    item: item
  });
}

gotoAbout() {
  let aboutModal = this.modalCtrl.create(AboutPage, { data: null }, {
    enableBackdropDismiss: true,
    enterAnimation: 'modal-scale-up-enter',
    leaveAnimation: 'modal-scale-up-leave'
  });
  aboutModal.onDidDismiss(data => {
  });
  aboutModal.present();
}

}
