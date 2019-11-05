import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Url = "https://localhost:44392/api/favorite"; 

  favorite : Favorite = {PlaceId : 0}; 

  establishments:any[] = [
    {Id: 1, Name: "Moonbucks", lat: "51.217050", lng: "4.420691", adress: "Koningin Astridplein 27, \n 2018 Antwerpen", ClosingTime: "20:00", OrderHour: "17:00", Heart: "heart-empty"},
    {Id: 2, Name: "Soubway", Heart: "heart-empty"},
    {Id: 3, Name: "BurgerQueen", Heart: "heart-empty"},
    {Id: 4, Name: "Babbel en Knabbel", Heart: "heart-empty"},
    {Id: 5, Name: "Panus", Heart: "heart-empty"},
    {Id: 6, Name: "LunchYard", Heart: "heart-empty"}
  ];

  favorites = new Subject<any>(); 

  constructor(private http : HttpClient) { }

  getInfo(id): any{
    return this.establishments.find(establishment => establishment.Id == id);
  }
  GetFavorites(){
    return this.http.get(this.Url);
  }
  AddFavorite(Id : number){
    this.favorite.PlaceId = Id; 
    return this.http.post(this.Url, this.favorite);  
    console.log(this.favorite);
    console.log(this.favorites); 
  }
  RemoveFavorite(Id : number){
    return this.http.delete(this.Url + "/" + Id); 
  }
}
export interface Favorite{
  //Id: number, 
  PlaceId: number
}
