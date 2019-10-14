import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  establishments:any = [];

  constructor(public navCtrl: NavController, public data:DataService) {
    this.LoadData();
  }

  LoadData(){
    this.establishments = this.data.establishments;
  }

  ItemClicked(establishment){
    console.log(establishment);
    this.navCtrl.navigateForward('/tabs/tab3/info/' + establishment.Id);
  }

}
