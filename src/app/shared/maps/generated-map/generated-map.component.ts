import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EstablishmentMenuItemPickerComponent } from 'src/app/establishment-menu-item-picker/establishment-menu-item-picker.component';
import { NavController } from '@ionic/angular';
import { MenuListPage } from 'src/app/menu-list/menu-list.page';

declare var google;

@Component({
  selector: 'app-generated-map',
  templateUrl: './generated-map.component.html',
  styleUrls: ['./generated-map.component.scss'],
})
export class GeneratedMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static: false}) mapElementRef: ElementRef;

  private key = 'AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw';

  constructor(private modalCtrl: ModalController, private renderer: Renderer2, private navCtrl: NavController) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new google.maps.Map(mapEl, {
        center: {lat: 51.2194475, lng: 4.4024643},
        zoom: 16
      });

      const locations = [
        [51.2194475, 4.4024643, 'Antwerpen'],
        [51.219836, 4.400929, 'Starbucks Groenplaats'],
        [51.219752, 4.402452, 'Panos Groenplaats'],
        [51.219980, 4.401159, 'McDonalds Groenplaats'],
        [51.219153, 4.421533, 'Starbucks Raddisson Blu'],
        [51.217959, 4.406311, 'Panos Meir'],
        [51.218080, 4.407448, 'McDonalds Meir'],
        [51.218735, 4.405227, 'Burger King Meir'],
        [51.217276, 4.419755, 'McDonalds Keyserlei'],
        [51.217681, 4.416271, 'Panos Keyserlei'],
        [51.217820, 4.416799, 'Five Guys Keyserlei'],
        [51.217615, 4.416874, 'Quick Keyserlei'],
        [51.217053, 4.420740, 'Starbucks Antwerpen Centraal'],
        [51.216822, 4.420664, 'Panos Antwerpen Centraal']
      ];
      let i;
      for (i = 0; i < locations.length; i++) {
        let marker = new google.maps.Marker({
          position: {lat: locations[i][0], lng: locations[i][1]},
          map: map,
          title: locations[i][2]
        });
        marker.addListener('click', () => {
          console.log(marker.title);
          this.navCtrl.navigateForward('test');
        });
      }
      
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any>{
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadGoogleModule = win.google;
        if (loadGoogleModule && loadGoogleModule.maps){
          resolve(loadGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.')
        }
      };
    });
  }

  myMarkerHandler(text: string) {
    alert(text);
    console.log(text);
  }
}
