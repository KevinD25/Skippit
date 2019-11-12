import { Component, OnInit } from '@angular/core';
import { MenuService, IItem } from '../services/menu.service';
import { NavController } from '@ionic/angular';

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

  private hasOrderSomething: boolean;
  constructor(protected menuSvc: MenuService, private navCtrl: NavController) {
    this.timeCheck();
    menuSvc.getEstablishmentData();
    console.log(menuSvc.establishment.menu);
    this.hasOrderSomething = false;
   }

  ngOnInit() {}

  ngAfterViewInit() {
    this.hasOrderSomething = false;
    this.menuSvc.establishment.menu.forEach(element =>{
      element.amount = 0;
    });
}

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
        if (element.amount > 0) {
          element.amount -= 1;
        }
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
    this.timeCheck();
    if (hours > this.currentHour) {
      return false;
    } else if (hours === this.currentHour) {
      if (minutes >= this.currentMinutes) {
        return false;
      } else {
        return true;
      }
    }
  }

  ResetValues() {
    this.menuSvc.establishment.menu.forEach(element => {
      element.amount = 0;
    });
    this.menuItems = [];
    this.hasOrderSomething = false;
    this.menuSvc.totalPriceForOrder = 0;
  }

  PaymentButtonPressed() {
    this.menuSvc.establishment.menu.forEach(element => {
      if (element.amount > 0) {
        this.menuItems.push(element);
        this.hasOrderSomething = true;
      }
    });
    if (this.hasOrderSomething){
      console.log(this.menuItems);
      this.menuSvc.setOrder(this.menuItems, this.choosenTime);
      this.ResetValues();
      this.navCtrl.navigateForward('check-order');
    }
  }
}
