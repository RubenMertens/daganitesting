import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ServerListPage} from "../pages/server-list/server-list";
import {MapPage} from "../pages/map/map";
import {InventoryPage} from "../pages/inventory/inventory";
import {ShopPage} from "../pages/shop/shop";
import {SelltabPage} from "../pages/selltab/selltab";
import {BuytabPage} from "../pages/buytab/buytab";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServerListPage,
    MapPage,
    InventoryPage,
    ShopPage,

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
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
