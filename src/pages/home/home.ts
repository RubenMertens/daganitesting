import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from "ionic-angular";
import {ServerListPage} from "../server-list/server-list";
import {MapPage} from "../map/map";
import {ConnectionService} from "../../providers/connection-service";
import {ShopPage} from "../shop/shop";
import {Device} from "ionic-native";
import {BankPage} from "../bank/bank";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  playerName:string ="";



  constructor(public navCtrl: NavController, public navParams: NavParams , public platform : Platform , public connectionService : ConnectionService) {
    console.log(Device.uuid);

  }


  goToServerList(){
    this.navCtrl.push(ServerListPage,{"playerName":this.playerName});
  }




}
