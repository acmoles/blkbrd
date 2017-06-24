import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ChannelsPage } from '../channels/channels';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../email';

import { AuthProvider } from '../../auth';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm:FormGroup;
  loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
  public formBuilder: FormBuilder, public alertCtrl: AlertController,
  public loadingCtrl: LoadingController) {

    this.signupForm = formBuilder.group({
    email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
    password: ['', Validators.compose([Validators.minLength(6),
    Validators.required])],
    name: ['']
});

}

  signUp(formData) {

    if (!this.signupForm.valid){
          console.log(this.signupForm.value);
          let validAlert = this.alertCtrl.create({
            message: "Please enter a valid email address and password (longer than 6 characters)",
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
          this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
          .then((user) => {
            user.updateProfile({
                displayName: this.signupForm.value.name
              }).then(() => {
                console.log('success adding name!')
                this.loading.dismiss();
                this.navCtrl.setRoot(ChannelsPage);
              }
          )}, (error) => {
            this.loading.dismiss().then( () => {
              var errorMessage: string = error.message;
                let alert = this.alertCtrl.create({
                  message: errorMessage,
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


}
