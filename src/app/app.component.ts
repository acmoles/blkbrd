import { Component, ViewChild } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
// import { SignupPage } from '../pages/signup/signup';
import { ChannelsPage } from '../pages/channels/channels';

import { AngularFireAuth } from 'angularfire2/auth';
// import { AuthProvider } from '../auth';

@Component({
  templateUrl: 'app.html'
})
export class blkbrd {
  rootPage:any;
  pages: Array<{ title: string, component: any }>;
  @ViewChild('blkbrdNav') nav

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public afAuth: AngularFireAuth) {

    const authObserver = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = ChannelsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    platform.ready().then(() => {
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
