import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ServerListPage} from "../pages/server-list/server-list";
import {MapPage} from "../pages/map/map";
import  {LocationTracker} from "../providers/location-tracker"

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServerListPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServerListPage,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LocationTracker]
})
export class AppModule {}
