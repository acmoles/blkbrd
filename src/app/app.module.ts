import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChannelsPage } from '../pages/channels/channels';
import { AppSettingsPage } from '../pages/channels/settings';
import { AddChannelPage } from '../pages/channels/addChannel';
import { ChannelPage } from '../pages/channel/channel';
import { AddPostPage } from '../pages/channel/addPost';
import { ChannelHistoryPage } from '../pages/channel/history';

import { ionicConfig } from '../ionConfig';

@NgModule({
  declarations: [
    MyApp,
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
    IonicModule.forRoot( MyApp, ionicConfig ),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
