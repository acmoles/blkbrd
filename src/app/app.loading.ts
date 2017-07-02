import { Component } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';


@Component({
  templateUrl: 'loading.html'
})
export class AppLoading {

public loading: Loading;

constructor(public loadingCtrl: LoadingController) {
}

ionViewDidLoad() {
  this.loading = this.loadingCtrl.create();
  this.loading.present();
}

ionViewWillLeave() {
  this.loading.dismiss();
}

}
