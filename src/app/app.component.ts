import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChannelsPage } from '../pages/channels/channels';
import { AppSettingsPage } from '../pages/channels/settings';
import { AddChannelPage } from '../pages/channels/addChannel';
import { ChannelPage } from '../pages/channel/channel';
import { AddPostPage } from '../pages/channel/addPost';
import { ChannelHistoryPage } from '../pages/channel/history';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class blkbrd {
  rootPage:any;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
        const authObserver = afAuth.authState.subscribe( user => {
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
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
