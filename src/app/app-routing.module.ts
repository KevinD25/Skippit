import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EstablishmentMenuItemPickerComponent } from './establishment-menu-item-picker/establishment-menu-item-picker.component';
import { MenuListPage } from './menu-list/menu-list.page';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'detail-tab', loadChildren: './detail-tab/detail-tab.module#DetailTabPageModule' },
  { path: 'menu-list', loadChildren: './menu-list/menu-list.module#MenuListPageModule' },
  { path: 'check-order', loadChildren: './itemspicked/itemspicked.module#ItemspickedPageModule' },
  { path: 'order-details', loadChildren: './order-details/order-details.module#OrderDetailsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

