import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-establishment-menu-item-picker',
  templateUrl: './establishment-menu-item-picker.component.html',
  styleUrls: ['./establishment-menu-item-picker.component.scss'],
})
export class EstablishmentMenuItemPickerComponent implements OnInit  {

  totalPrice: number;
  choosenTime: string;
  currentHour: number;
  currentMinutes: number;
  establishment = {} as IEstablishment;
  menuItems = [] as IItem[];
  names: string[] = [
    'Café misto', 'Iced Coffee met melk', 'Pike Place Roast', 'Caramel Frappuccino', 'Espresso Frappuccino'
  ];
  prices: number[] = [5.00, 4.08, 6.00, 4.95, 5.05];
  constructor() {
    this.totalPrice =  0;
    this.timeCheck();
    let i = 0;
    for (i = 0; i < 5; i++){
      const menuItem = {
        Name: this.names[i],
        Price: this.prices[i],
        Description: '',
        Size: 'Venti',
        Amount: 0
      } as IItem;
      this.menuItems[i] = menuItem;
    }
    this.establishment.Name =  'Starbucks Antwerpen Centraal';
    this.establishment.Menu = this.menuItems;
    console.log(this.establishment.Menu);
   }

  ngOnInit() {}

  timeCheck() {
    const time = new Date().toLocaleTimeString();
    this.choosenTime = time.slice(0, -3);
    this.currentMinutes = this.WhatTimeIsItInMinutes();
    this.currentHour = this.WhatTimeIsItInHours();
  }

  AmountUp(item: IItem){
    item.Amount += 1;
    this.CheckTotal();
  }

  AmountDown(item: IItem){
    if (item.Amount > 0) {
      item.Amount -= 1;
    }
    this.CheckTotal();
  }

  CheckTotal(){
    let i = 0;
    this.totalPrice = 0;
    this.establishment.Menu.forEach(element => {
      this.totalPrice += element.Amount * element.Price;
    });
    console.log(this.totalPrice);
  }

  WhatTimeIsItInMinutes(){
    const str = this.choosenTime.slice(3);
    const nummer = +str;
    return nummer;
  }

  WhatTimeIsItInHours(){
    const str = this.choosenTime.slice(0, -3);
    const nummer = +str;
    return nummer;
  }

  SetTimeBackToString(minutes: number, hours: number) {
    if (hours < 10) {
      if (minutes < 10) {
        this.choosenTime = '0' + hours + ':0' + minutes;
      } else {
        this.choosenTime = '0' + hours + ':' + minutes;
      }
    } else {
      if (minutes < 10) {
        this.choosenTime = hours + ':0' + minutes;
      } else {
        this.choosenTime = hours + ':' + minutes;
      }
    }
    console.log(this.choosenTime);
  }

  SetTimeLater() {
    let minutes = this.WhatTimeIsItInMinutes();
    let hours = this.WhatTimeIsItInHours();
    if (minutes < 59 && minutes >= 0) {
      // all good
      minutes += 1;
      this.SetTimeBackToString(minutes, hours);
    } else {
      // update hour to plus time
      hours = this.WhatTimeIsItInHours();
      minutes = 0;
      hours += 1;
      this.SetTimeBackToString(minutes, hours);
    }
  }

  SetTimeEarlier() {
    let minutes = this.WhatTimeIsItInMinutes();
    let hours = this.WhatTimeIsItInHours();
    if (minutes <= 59 && minutes > 0) {
      // all good
      minutes -= 1;
      if (!this.checkIfBorderCrossed(minutes, hours)) {
        this.SetTimeBackToString(minutes, hours);
      }
    } else {
      // update hour to min time
      minutes = 59;
      hours -= 1;
      if (!this.checkIfBorderCrossed(minutes, hours)) {
        this.SetTimeBackToString(minutes, hours);
      }
    }
  }

  checkIfBorderCrossed(minutes: number, hours: number) {
    console.log('help');
    this.timeCheck();
    if (hours > this.currentHour) {
      console.log('whut1');
      return false;
    } else if (hours === this.currentHour) {
      if (minutes >= this.currentMinutes) {
        console.log('whut1');
        return false;
      } else {
        console.log('whut2');
        return true;
      }
    }
  }
}

interface IEstablishment {
  Name: string;
  Adress: string;
  // Location: 
  Menu: IItem[];
  Description: string;
  Type: string;
}

interface IItem {
  Name: string;
  Description: string;
  Price: number;
  Size: string;
  Amount: number;
}
