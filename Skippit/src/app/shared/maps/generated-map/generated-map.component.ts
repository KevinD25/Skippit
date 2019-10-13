import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generated-map',
  templateUrl: './generated-map.component.html',
  styleUrls: ['./generated-map.component.scss'],
})
export class GeneratedMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static: false}) mapElementRef: ElementRef;

  private key = 'AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw';

  constructor(private modalCtrl: ModalController, private renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit(){
    const latt = parseFloat('51.4667');
    const longi = parseFloat('4.4667');

    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new google.maps.Map(mapEl, {
        center: {lat: 51.4667, lng: 4.4667},
        zoom: 16
      });

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
}
