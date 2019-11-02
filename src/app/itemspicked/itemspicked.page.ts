import { Component, OnInit } from '@angular/core';
import { MenuService, IItem } from '../services/menu.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { element } from 'protractor';

@Component({
  selector: 'app-itemspicked',
  templateUrl: './itemspicked.page.html',
  styleUrls: ['./itemspicked.page.scss'],
})
export class ItemspickedPage implements OnInit {
  totalPrice: number;

  constructor(protected menuSvc: MenuService) {
    console.log(menuSvc.order);
    this.totalPrice = 0;
    this.CalculateTotal();
    console.log(this.totalPrice);
    
   }

  ngOnInit() {
  }

  private CalculateTotal() {
    this.menuSvc.order.items.forEach(element => {
      this.totalPrice = element.amount * element.price;
    });
  }

}
