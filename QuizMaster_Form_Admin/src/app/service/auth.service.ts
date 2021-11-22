import { Admin } from './../models/admin.model';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor( public afs: AngularFirestore, public afAuth: AngularFireAuth,public router: Router,  public ngZone: NgZone ) { 
    console.log("****AuthService constructor CALLED****");
    this.afAuth.authState.subscribe(user => {
      console.log("****user****", user);
      if (user){
        this.user = user;
        console.log("****constructor****", this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("****SignIn SetUserData****", result.user);
        this.router.navigate(['form']).then(res=>{
          console.log("Navigate to Form", res);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(username, email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, username).then(()=>{
          console.log("SetUserData promise respond")
        });
        console.log("****SignUp SetUserData****", result.user);
        this.router.navigate(['sign-in']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user: firebase.User, username:string): Promise<void> {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Admin/${user.uid}`);
    var userData: Admin;

    return user.updateProfile({
      displayName: username,
    }).then(function() {
      userData = {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
      }
      userRef.set(userData, {
        merge: true
      }).then(()=>{
        console.log("DATABASE UPDATED");
      })
    });

  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

}
