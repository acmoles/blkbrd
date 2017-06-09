import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Insomnia } from '@ionic-native/insomnia';

import { blkbrd } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChannelsPage } from '../pages/channels/channels';
import { AppSettingsPage } from '../pages/channels/settings';
import { AddChannelPage } from '../pages/channels/addChannel';
import { ChannelPage } from '../pages/channel/channel';
import { AddPostPage } from '../pages/channel/addPost';
import { ChannelHistoryPage } from '../pages/channel/history';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthProvider } from '../auth';

import { ionicConfig } from '../ionConfig';
import { firebaseConfig } from '../firebaseConfig';

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
    ChannelHistoryPage,
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
    LoginPage,
    SignupPage,
    ChannelsPage,
    AppSettingsPage,
    ChannelPage,
    AddChannelPage,
    AddPostPage,
    ChannelHistoryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Insomnia,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
