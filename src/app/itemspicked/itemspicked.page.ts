import { Component, OnInit } from '@angular/core';
import { MenuService, IItem } from '../services/menu.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { element } from 'protractor';
import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-itemspicked',
  templateUrl: './itemspicked.page.html',
  styleUrls: ['./itemspicked.page.scss'],
})
export class ItemspickedPage implements OnInit {
  
  totalPrice: number;
  paymentAmount: string = '3.33';
  currency: string = 'EUR';
  currencyIcon: string = '€';

  constructor(protected menuSvc: MenuService, private payPal: PayPal, private applePay: ApplePay, private navCtrl: NavController) {
    console.log(menuSvc.order);
    this.totalPrice = 0;
    this.CalculateTotal();
   }

  ngOnInit() {
  }

  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AYnLptNAf03O4KgDeY_-yJojaH8Jj-nFs7cySbaRFPgPsFJJ_2SlbaUJUii1WmVbrCjcie97d5a97QVS'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  payWithApplePay(){

  }

  temporaryNotAbleToPay() {
    this.navCtrl.navigateForward('test');
  }

  private CalculateTotal() {
    this.menuSvc.order.items.forEach(element => {
      this.totalPrice = element.amount * element.price;
    });
  }

}
