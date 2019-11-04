import { Component, OnInit } from '@angular/core';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  qrData = 'www.google.com';
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor(private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  downloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log(imageData);

    let data = imageData.split(',')[1];
    this.base64ToGallery.base64ToGallery(data, {
      prefix: '_savedQR',
      mediaScanner: true
    }).then(async res => {
      let toast = await this.toastCtrl.create({
        header: 'QR code saved in library'
      })
    }, err => {
      console.log('error', err);
    });
  }

}
