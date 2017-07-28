import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

constructor(public afAuth: AngularFireAuth) {
}

loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  console.log('login triggered');
  return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
}

resetPassword(email: string): firebase.Promise<any> {
  console.log('reset triggered');
  return this.afAuth.auth.sendPasswordResetEmail(email);
}

logoutUser(): firebase.Promise<any> {
  console.log('logout triggered');
  return this.afAuth.auth.signOut();
}

signupUser(newEmail: string, newPassword: string, newName: string): firebase.Promise<any> {
  console.log('signup triggered');
  return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
}

getName() {
  return this.afAuth.auth.currentUser.displayName;
}

updateName(name: string) {
  console.log('updating username to ' + name);
  return this.afAuth.auth.currentUser.updateProfile({displayName: name, photoURL: null})
}

isLoggedin() {
  let loggedIn: boolean;
  const authObserver = this.afAuth.authState.subscribe(user => {
    if (user) {
      loggedIn = true;
      authObserver.unsubscribe();
    } else {
      loggedIn = false;
      authObserver.unsubscribe();
    }
  });
  return loggedIn;
  }
}
