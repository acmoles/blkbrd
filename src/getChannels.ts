import { Injectable } from '@angular/core';
// import { Subscription } from 'rxjs';


import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import "rxjs/add/operator/map";
import * as firebase from 'firebase/app';

@Injectable()
export class ChannelsProvider {
public channels: FirebaseListObservable<any[]>;
public channel: FirebaseObjectObservable<any>;
public messages: FirebaseObjectObservable<any>;

constructor(public afDB: AngularFireDatabase) {
}

  getChannels(): FirebaseListObservable<any[]> {
    this.channels = this.afDB.list('/channels', {
        query: {
          limitToLast: 24,
          orderByChild: "date"
        }
      });
      // .map((array) => array.reverse()) as FirebaseListObservable<any[]>
    return this.channels
  }

  addChannel(data) {
    return this.channels.push(data)
  }

  getChannel(id: number): FirebaseObjectObservable<any> {
    this.channel = this.afDB.object('/channels/' + id);
    return this.channel
  }

  addMessage(id: number, messages) {
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.messages = this.afDB.object('/channels/' + id + '/messages');
    return this.messages.set(messages)
  }


}
