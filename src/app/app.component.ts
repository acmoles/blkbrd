import { Component, ViewChild } from '@angular/core';
import { Platform, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ChannelsPage } from '../pages/channels/channels';
// import { AppLoading } from './app.loading';

// import { ClockPage } from '../pages/clock/clock';

import { AngularFireAuth } from 'angularfire2/auth';
// import { AuthProvider } from '../auth';

@Component({
  templateUrl: 'app.html'
})
export class blkbrd {
  public rootPage:any;
  public loading: Loading;
  pages: Array<{ title: string, component: any }>;
  @ViewChild('blkbrdNav') nav

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {

    platform.ready().then(() => {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      const authObserver = this.afAuth.authState.subscribe(user => {
        if (user) {
          this.rootPage = ChannelsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
        }
        this.loading.dismiss();
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()){ //Can we go back?
          this.nav.pop();
        } else {
          platform.exitApp(); //Exit from app
        }
      })

      statusBar.styleBlackOpaque();
      statusBar.overlaysWebView(true);
      splashScreen.hide();
    });
  }
}
