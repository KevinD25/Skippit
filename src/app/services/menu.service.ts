import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public establishment: IEstablishment;
  public items = [] as IItem[];
  public order: IOrder;
  public totalPriceForOrder: number;

  names: string[] = [
    'Café misto', 'Iced Coffee met melk', 'Pike Place Roast', 'Caramel Frappuccino', 'Espresso Frappuccino', 
    'Cold Foam Iced Cappuccino', 'Cold Brew latte', 'Cold Brew', 'Iced Caffè Latte', 'Iced Caffè Mocha'
  ];
  prices: number[] = [5.00, 4.08, 6.00, 4.95, 5.05, 5.09, 6.05, 4.55, 3.95, 4.95];

  constructor() {
    this.totalPriceForOrder = 0;
    let i = 0;
    for (i = 0; i < 10; i++) {
      const item = {
        id: i,
        name: this.names[i],
        price: this.prices[i],
        description: 'leeg',
        size: 'venti',
        amount: 0
      } as IItem;
      this.items[i] = item;
    }
   }

  getEstablishmentData() {

    // Temporary code, need backend for this to work
    this.establishment = {
      id: 0,
      name: 'Starbucks Antwerpen Centraal',
      address: 'Koningin Astridplein 1',
      location: null,
      menu: this.items,
      description: 'Starbucks is een koffieketen met zaken verspreid over de hele wereld.',
      type: 'coffee bar'
    };
  }

  getMenuData() {
    return this.establishment.menu;
  }

  setItemOrderAmount(item: IItem) {
    let i = 0;
    while (item.id !== this.items[i].id) {
      i++;
    }
    this.items[i].amount = item.amount;
  }

  getItems() {
    return this.items;
  }
}

export interface IEstablishment {
  id: number;
  name: string;
  address: string;
  location: Location;
  menu: IItem[];
  description: string;
  type: string;
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  amount: number;
}

export interface IOrder {
  id: number;
  items: IItem[];
}

