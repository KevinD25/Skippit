import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneratedMapComponent } from '../generated-map/generated-map.component';

@Component({
  selector: 'app-location-marker',
  templateUrl: './location-marker.component.html',
  styleUrls: ['./location-marker.component.scss'],
})
export class LocationMarkerComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {
    this.mapClicker();
   }

  ngOnInit() {}

  mapClicker(){
    this.modalCtrl.create({component: GeneratedMapComponent}).then(modalEl =>{
      modalEl.present();
    });
  }

}
