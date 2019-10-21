import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-establishment-menu-item-picker',
  templateUrl: './establishment-menu-item-picker.component.html',
  styleUrls: ['./establishment-menu-item-picker.component.scss'],
})
export class EstablishmentMenuItemPickerComponent implements OnInit  {

  totalPrice: number;
  choosenTime: Date;
  establishment = {} as IEstablishment;
  menuItems = [] as IItem[];
  names: string[] = [
    'Café misto', 'Iced Coffee met melk', 'Pike Place Roast', 'Caramel Frappuccino', 'Espresso Frappuccino'
  ];
  prices: number[] = [5.00, 4.08, 6.00, 4.95, 5.05];
  constructor() {
    this.choosenTime = new Date();
    this.totalPrice =  0;
    let i = 0;
    for (i = 0; i < 5; i++){
      const menuItem = {
        Name: this.names[i],
        Price: this.prices[i],
        Description: '',
        Size: 'Venti',
        Amount: 0
      } as IItem;
      this.menuItems[i] = menuItem;
    }
    this.establishment.Name =  'Starbucks Antwerpen Centraal';
    this.establishment.Menu = this.menuItems;
    console.log(this.establishment.Menu);
   }

  ngOnInit() {}

  AmountUp(item: IItem){
    item.Amount += 1;
    this.CheckTotal();
  }

  AmountDown(item: IItem){
    if (item.Amount > 0) {
      item.Amount -= 1;
    }
    this.CheckTotal();
  }

  CheckTotal(){
    let i = 0;
    this.totalPrice = 0;
    this.establishment.Menu.forEach(element => {
      this.totalPrice += element.Amount * element.Price;
    });
    console.log(this.totalPrice);
  }

  SetTimeLater(){

  }

}

interface IEstablishment {
  Name: string;
  Adress: string;
  // Location: 
  Menu: IItem[];
  Description: string;
  Type: string;
}

interface IItem {
  Name: string;
  Description: string;
  Price: number;
  Size: string;
  Amount: number;
}
