import { Component, OnInit } from '@angular/core';
import { MenuService, IItem } from '../services/menu.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { element } from 'protractor';
import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { NavController } from '@ionic/angular';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient } from '@angular/common/http';

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
  stripe_key = 'pk_test_i06kldVjd2NLqz99Lpbg1r8800KaZC8V7H';
  cardDetails: any = {};

  constructor(protected menuSvc: MenuService, private payPal: PayPal, private stripe: Stripe, private navCtrl: NavController, private http: HttpClient) {
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

  payWithStripe() {
    this.stripe.setPublishableKey(this.stripe_key);

    this.cardDetails = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    }

    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        console.log(token);
        this.makePayment(token.id);
      })
      .catch(error => console.error(error));
  }

  makePayment(token) {
    this.http
    .post('API LINK HIER', {
    amount: this.totalPrice,
    currency: "eur",
    token: token.id
    })
    .subscribe(data => {
    console.log(data);
    });
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
