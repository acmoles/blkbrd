import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Config } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Insomnia } from '@ionic-native/insomnia';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { blkbrd } from './app.component';
import { AppLoading } from './app.loading';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChannelsPage } from '../pages/channels/channels';
import { AppSettingsPage } from '../pages/channels/settings';
import { AddChannelPage } from '../pages/channels/addChannel';
import { ChannelPage } from '../pages/channel/channel';
import { AddPostPage } from '../pages/channel/addPost';
// import { ChannelHistoryPage } from '../pages/channel/history';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthProvider } from '../auth';
import { ChannelsProvider } from '../getChannels';
import { ReversePipe } from '../reversePipe';

import { ionicConfig } from '../ionConfig';
import { firebaseConfig } from '../firebaseConfig';

import { mutationObserverDirective } from '../mutation';

import { ModalScaleUpLeaveTransition } from '../scale-up-leave.transition';
import { ModalScaleUpEnterTransition } from '../scale-up-enter.transition';

@NgModule({
  declarations: [
    blkbrd,
    LoginPage,
    SignupPage,
    ChannelsPage,
    AppSettingsPage,
    ChannelPage,
    AddChannelPage,
    AddPostPage,
    mutationObserverDirective,
    ReversePipe,
    AppLoading,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot( blkbrd, ionicConfig ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    blkbrd,
    AppLoading,
    LoginPage,
    SignupPage,
    ChannelsPage,
    AppSettingsPage,
    ChannelPage,
    AddChannelPage,
    AddPostPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Insomnia,
    AndroidFullScreen,
    AuthProvider,
    ChannelsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(public config: Config) {
        this.setCustomTransitions();
    }

    private setCustomTransitions() {
        this.config.setTransition('modal-scale-up-leave', ModalScaleUpLeaveTransition);
        this.config.setTransition('modal-scale-up-enter', ModalScaleUpEnterTransition);
    }
}
