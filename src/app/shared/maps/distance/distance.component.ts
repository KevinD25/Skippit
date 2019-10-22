import { Component, OnInit } from '@angular/core';
import { DistanceService, IDistanceResult } from 'src/app/services/distance.service';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss'],
})
export class DistanceComponent implements OnInit {

//komma -> %2C 
//pipeline ( | ) -> %7C

  private _origin: string = "51.2194475,4.4024643";
  private _destination: string= "51.4667,4.4667"
  data: IDistance

  constructor(private _svc: DistanceService) { }

  ngOnInit() {
    this._svc.getDistanceBetween(this._origin, this._destination)
      .subscribe(result => this.data = this.MapResult(result));

      console.log('data->' + JSON.stringify(this.data))
  }
  private MapResult(result: IDistanceResult): IDistance {
    console.log('result->' + JSON.stringify(result))
    return {
      destination: result.destination_addresses,
      origin: result.origin_addresses[0],
      distancetext: result.rows[0].elements[0].distance.text,
      distancevalue: result.rows[0].elements[0].distance.value,
      durationtext: result.rows[0].elements[0].duration.text,
      durationvalue: result.rows[0].elements[0].duration.value
    };
  }

  get Origin() {
    return this._origin;
  }

  get Destination(){
    return this._destination
  }

  set Origin(value: string ) {
    this._origin = value;
    //this._svc.getDistanceBetween(this._origin, this._destination).subscribe(result => this.data = this.MapResult(result));
  }

  set Destination(value:string){
    this._destination = value;
  }
}

interface IDistance {
  destination: string[];
  origin: string;
  distancetext: string;
  distancevalue: number;
  durationtext: string;
  durationvalue: number;
}
