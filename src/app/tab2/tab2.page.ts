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
  favorites:any = []; 

  constructor(public navCtrl: NavController, public data:DataService) {
    this.LoadData();
    this.data.favorites.subscribe(x => {
      this.favorites = x; 
      this.SetHearts(); 
    });
  }

  LoadData(){
    this.establishments = this.data.establishments;
    this.data.GetFavorites();
  }
  SetHearts(){
    this.establishments.forEach(establishment => {
      this.favorites.forEach(favorite => {
        if(establishment.Id == favorite.placeId){
          this.establishments[establishment.Id-1].Heart = "heart"; 
        }
      });
    });
  }

  Favorite(establishment){
    if(establishment.Heart == "heart-empty"){
      establishment.Heart = "heart"; 
      this.data.AddFavorite(establishment.Id); 
    }
    else{
      establishment.Heart = "heart-empty"; 
      this.data.RemoveFavorite(establishment.Id); 
    } 
  }

  ItemClicked(establishment){
    console.log(establishment);
    this.navCtrl.navigateForward('/tabs/tab2/info/' + establishment.Id);
  }
}