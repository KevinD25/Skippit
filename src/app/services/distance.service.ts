import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor(private _http: HttpClient) { }

  getDistanceBetween(origin:string, destination:string) : Observable<IDistanceResult>
    {
      //var url: string = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw";
      var url: string = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw`
      var proxyurl: string = "https://cors-anywhere.herokuapp.com/";
      //var data;
      //this._http.get<IDistanceResult>(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=AIzaSyD64jp4WQ6_StkjlXBDdH3RyEQWdFLCMuw`);
      return this._http.get<IDistanceResult>(proxyurl + url);
     
        
        //.do(data => console.log(JSON.stringify(data)));
    }
}

export interface IDistanceResult {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: Row[];
  status: string;
}

export interface Row {
  elements: Element[];
}

export interface Element {
  distance: Distance;
  duration: Distance;
  status: string;
}

export interface Distance {
  text: string;
  value: number;
}