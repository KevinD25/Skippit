import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  establishments:any[] = [
    {Id: 1, Name: "Moonbucks", lat: "51.217050", lng: "4.420691", adress: "Koningin Astridplein 27, \n 2018 Antwerpen", ClosingTime: "20:00", OrderHour: "17:00"},
    {Id: 2, Name: "Soubway"},
    {Id: 3, Name: "BurgerQueen"},
    {Id: 4, Name: "Babbel en Knabbel"},
    {Id: 5, Name: "Panus"},
    {Id: 6, Name: "LunchYard"}
  ];
  constructor() { }

  getInfo(id): any{
    return this.establishments.find(establishment => establishment.Id == id);
  }
}
