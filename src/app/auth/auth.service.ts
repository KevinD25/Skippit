import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import {Plugins} from '@capacitor/core';
import { parse } from 'url';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          environment.firebase.apiKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
  }

  autoLogin(){
    return from(Plugins.Storage.get({key : 'authData'})).pipe(
      map(storedData => {
        if(!storedData || !storedData.value) {
          return null;
        }
         const parsedData = JSON.parse(storedData.value) as {token: string, tokenExpirationDate : string, userId: string, email: string};
         const expirationTime = new Date(parsedData.tokenExpirationDate);
         if(expirationTime <= new Date()){
           return null;
         }
         const user = new User(parsedData.userId, parsedData.email, parsedData.token, expirationTime);
         return user;
      }),
      tap(user=>{
        if(user) {
          this._user.next(user);
        }
      })
      , map(user=> {
        return !!user; //boolean
      }));
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
          environment.firebase.apiKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }



  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.storeAuthData(userData.localId, userData.idToken, expirationTime.toISOString(), userData.email );
  }

  private storeAuthData(
    userId: string, 
    token : string, 
    tokenExpirationDate:string,
    email : string
    ){
      const data = JSON.stringify({ userId: userId, token : token, tokenExpirationDate : tokenExpirationDate, email : email });
     Plugins.Storage.set({key : 'authData' , value: data})
  }

  public setUserDataGoogle(userData: firebase.auth.UserCredential){
    userData.user.getIdTokenResult().then((data) => {
      const expirationTime = new Date( new Date().getTime() + data.expirationTime);
      userData.user.getIdToken().then((data) => {
        this._user.next(
          new User(
            userData.user.uid,
            userData.user.email,
            data,
            expirationTime
          )
        );
      });
    });
  }
}
