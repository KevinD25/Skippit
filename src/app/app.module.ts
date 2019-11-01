import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DistanceService } from './services/distance.service';
import { EstablishmentMenuItemPickerModule } from './establishment-menu-item-picker/establishment-menu-item-picker.module';
import { MenuListPageModule } from './menu-list/menu-list.module';

@NgModule({
  declarations:
  [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    EstablishmentMenuItemPickerModule,
    MenuListPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DistanceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
