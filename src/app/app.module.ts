import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ServerListPage} from "../pages/server-list/server-list";
import {MapPage} from "../pages/map/map";
import {InventoryPage} from "../pages/inventory/inventory";
import {ShopPage} from "../pages/shop/shop";
import {ConfirmsalePage} from "../pages/confirmsale/confirmsale";
import {Player} from "../providers/Player";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServerListPage,
    MapPage,
    InventoryPage,
    ShopPage,
    ConfirmsalePage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServerListPage,
    MapPage,
    InventoryPage,
    ShopPage,
    ConfirmsalePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Player]
})
export class AppModule {}
