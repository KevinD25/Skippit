import { Component, OnInit } from '@angular/core';
import { MenuService, IItem } from '../services/menu.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-itemspicked',
  templateUrl: './itemspicked.page.html',
  styleUrls: ['./itemspicked.page.scss'],
})
export class ItemspickedPage implements OnInit {

  constructor(protected menuSvc: MenuService) {
    console.log(menuSvc.order);
   }

  ngOnInit() {
  }

}
