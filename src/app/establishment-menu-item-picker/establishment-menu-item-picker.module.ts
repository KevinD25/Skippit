import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EstablishmentMenuItemPickerComponent } from './establishment-menu-item-picker.component';


@NgModule({
  declarations: [EstablishmentMenuItemPickerComponent],
  imports: [
    CommonModule, 
    IonicModule
  ]
})
export class EstablishmentMenuItemPickerModule { }
