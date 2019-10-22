import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  establishments:any = [];

  constructor(public navCtrl: NavController, public data:DataService) {
    this.LoadData();
  }

  LoadData(){
    this.establishments = this.data.establishments;
  }

  ItemClicked(establishment){
    console.log(establishment);
    this.navCtrl.navigateForward('/tabs/tab2/info/' + establishment.Id);
  }
}