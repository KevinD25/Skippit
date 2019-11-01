import { Component, OnInit } from '@angular/core';
import { MenuService, IItem } from '../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.page.html',
  styleUrls: ['./menu-list.page.scss'],
})
export class MenuListPage implements OnInit {

  totalPrice: number;
  choosenTime: string;
  currentHour: number;
  currentMinutes: number;
  // establishment = {} as IEstablishment;
  menuItems = [] as IItem[];
  names: string[] = [
    'Café misto', 'Iced Coffee met melk', 'Pike Place Roast', 'Caramel Frappuccino', 'Espresso Frappuccino'
  ];
  prices: number[] = [5.00, 4.08, 6.00, 4.95, 5.05];
  constructor(protected menuSvc: MenuService) {
    this.timeCheck();
    menuSvc.getEstablishmentData();
    console.log(menuSvc.establishment.menu);
   }

  ngOnInit() {}

  timeCheck() {
    const time = new Date().toLocaleTimeString();
    this.choosenTime = time.slice(0, -3);
    this.currentMinutes = this.WhatTimeIsItInMinutes();
    this.currentHour = this.WhatTimeIsItInHours();
  }

  AmountUp(item: IItem){
    this.menuSvc.establishment.menu.forEach(element => {
      if (element.id === item.id) {
        element.amount += 1;
      }
    });
    this.CheckTotal();
  }

  AmountDown(item: IItem){
    this.menuSvc.establishment.menu.forEach(element => {
      if (element.id === item.id) {
        element.amount -= 1;
      }
    });
    this.CheckTotal();
  }

  CheckTotal(){
    this.menuSvc.totalPriceForOrder = 0;
    this.menuSvc.establishment.menu.forEach(element => {
      this.menuSvc.totalPriceForOrder += element.amount * element.price;
    });
    console.log(this.menuSvc.totalPriceForOrder);
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
