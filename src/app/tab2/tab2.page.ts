import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'
import { DataService, Favorite } from '../data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  establishments:any = [];
  favorites:any = []; 
  favorite : Favorite = {PlaceId : 0}; 
  id : number = 0; 


  constructor(public navCtrl: NavController, public data:DataService) {
    this.LoadData();
    this.GetFavorites(); 
  }

  LoadData(){
    this.establishments = this.data.establishments;
  }

  GetFavorites(){
    this.data.GetFavorites().subscribe(x => {
      this.favorites = x; 
      this.SetHearts(); 
    });
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
      this.data.AddFavorite(establishment.Id).subscribe(x => this.GetFavorites()); 
    }
    else{
      establishment.Heart = "heart-empty"; 
      var x = 0;
      var promise = new Promise((resolve, reject) => {
        this.favorites.forEach(element => {
          if(element.placeId == establishment.Id){
            x = element.id; 
          }
        })
        resolve(); 
      });
      promise.then(() => {        
      this.data.RemoveFavorite(x).subscribe(x => {
        console.log(x); 
        this.GetFavorites()}); 
        }); 
    }     
  }

  ItemClicked(establishment){
    console.log(establishment);
    this.navCtrl.navigateForward('/tabs/tab2/info/' + establishment.Id);
  }
}
