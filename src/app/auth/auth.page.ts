import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, Platform, NavController } from '@ionic/angular';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  user: Observable<firebase.User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private navCtrl: NavController
  ) { 
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            console.log('NAVIGATING');
            this.router.navigateByUrl('/tabs');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }


  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': '877596530147-j0j6su526r2st312jvbevvcbqabat6ck.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
  
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      //console.log(credential.credential.toJSON());
      //this.authService.loginGoogle("eyJhbGciOiJSUzI1NiIsImtpZCI6IjljZWY1MzQwNjQyYjE1N2ZhOGE0ZjBkODc0ZmU3OTAwMzYyZDgyZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODc3NTk2NTMwMTQ3LWowajZzdTUyNnIyc3QzMTJqdmJldnZjYnFhYmF0NmNrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODc3NTk2NTMwMTQ3LWowajZzdTUyNnIyc3QzMTJqdmJldnZjYnFhYmF0NmNrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwNzE2ODA5MzI2ODA4MTEzMTc0IiwiZW1haWwiOiJ1YmVyZ2hvc3QxMTYxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicENFd0syZ3FIVHFZc2hDODhOVko2QSIsImlhdCI6MTU3Mjk2NzYxNSwiZXhwIjoxNTcyOTcxMjE1fQ.B7Q0_ZL9cJ9IFu7TegIC8FCcq0U76GoNuoZowYeq-9P_6IjE-005ZPppnPUf93s5_w9YFN7Ca3EJCi9VQ93OnaUqo0OlTWxBjzfBjTOx7lUq5CDDTZWbCRtYsQ1L4z7-Aq7XZqUqV1LNixj-t01XcH2HgmB5aO0iOttU3jTR5J4Wvl82mdPWFepYX6MEtIE7sbJP_bVif_YPDmiMRYhB9QGB7gtzo2Y77aR3V37d4PiB2OA6a2OarRD6rvo2CYmVaIVsEooB8aufSo7WhmN-f-oPbclZm0CGS8Ng0LO333TnlgOLMuJtwqgIg0K4k2I1eQCE6VgbQU6oWZAiA_g-QA");
      
      console.log(credential);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin().then(()=> {
        console.log("Done!");
        this.navigate();
      });

    } else {
      this.webGoogleLogin().then(()=> {
        console.log("Done!");
        this.navigate();
      });
    }
  }

  navigate(){
    console.log("Navigate..")
    this.router.navigateByUrl('/tabs');
  }
  
  signOut() {
    this.afAuth.auth.signOut();
  }
}
