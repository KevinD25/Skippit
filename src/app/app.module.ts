import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SharedModule } from './shared/shared.module';
import { DistanceService } from './services/distance.service';
import { EstablishmentMenuItemPickerModule } from './establishment-menu-item-picker/establishment-menu-item-picker.module';
import { MenuListPageModule } from './menu-list/menu-list.module';
import { PayPal } from '@ionic-native/paypal/ngx';
import { ApplePay } from '@ionic-native/apple-pay/ngx';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@NgModule({
  declarations:
  [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),// imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    EstablishmentMenuItemPickerModule,
    MenuListPageModule,
    NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    PayPal,
    ApplePay,
    DistanceService,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
