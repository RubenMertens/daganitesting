import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from "ionic-angular";
import {ServerListPage} from "../server-list/server-list";
import {MapPage} from "../map/map";
import {ConnectionService} from "../../providers/connection-service";
import {ShopPage} from "../shop/shop";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ConnectionService]
})
export class HomePage {

  playerName:string;



  constructor(public navCtrl: NavController, public navParams: NavParams , public platform : Platform , public connectionService : ConnectionService) {
  //connectionService.setupTCPSocket();
  }


  goToServerList(){
    this.navCtrl.push(ServerListPage,{"playerName":this.playerName});
  }

  goToMap(){
    this.navCtrl.push(MapPage);


  }

  goToShop(){
    this.navCtrl.push(ShopPage);
  }


}
