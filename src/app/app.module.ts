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
import {ConnectionService} from "../providers/connection-service";
import {LobbyPage} from "../pages/lobby/lobby";
import {BankPage} from "../pages/bank/bank";
import {CollectMoneyPage} from "../pages/collect-money/collect-money";
import {MarketPage} from "../pages/market/market";
import {GameOverPage} from "../pages/game-over/game-over";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServerListPage,
    MapPage,
    InventoryPage,
    ShopPage,
    ConfirmsalePage,
    LobbyPage,
    BankPage,
    CollectMoneyPage,
    MarketPage,
    GameOverPage,

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
    ConfirmsalePage,
    LobbyPage,
    BankPage,
    CollectMoneyPage,
    MarketPage,
    GameOverPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Player,ConnectionService]
})
export class AppModule {}
