import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  establishments:any[] = [
    {Id: 1, Name: "Moonbucks"},
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
