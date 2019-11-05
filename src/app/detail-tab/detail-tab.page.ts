import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

declare var google; 

@Component({
  selector: 'app-detail-tab',
  templateUrl: './detail-tab.page.html',
  styleUrls: ['./detail-tab.page.scss'],
})
export class DetailTabPage implements OnInit {
  @ViewChild('map', {static: false}) ElementRef; 
  map : any; 
  private id:string;
  establishment:any;
  adress : any; 

  constructor(private route: ActivatedRoute, private data: DataService, private mapElementRef: ElementRef, private renderer: Renderer2) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.establishment = data.getInfo(this.id);
    console.log(this.id);
    console.log(this.establishment);
    console.log(this.establishment.lat); 
  }
  private key = 'AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw';
  ngOnInit() {
    var mapOptions = {
      center: {lat: Number(this.establishment.lat), lng: Number(this.establishment.lng)}, 
      zoom: 17
    }; 
    this.map = new google.maps.Map(document.getElementsByClassName("map")[0], mapOptions); 
    let marker = new google.maps.Marker({
      map: this.map, 
      position: {lat: Number(this.establishment.lat), lng: Number(this.establishment.lng)}
    })
  }
}
