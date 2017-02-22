import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from "ionic-angular";
import {ServerListPage} from "../server-list/server-list";
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from "ionic-native";
import {MapPage} from "../map/map";
import {ConnectionService} from "../../providers/connection-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ConnectionService]
})
export class HomePage {


  constructor(public navCtrl: NavController, public navParams: NavParams , public platform : Platform , public connectionService : ConnectionService) {
    connectionService.connectToDepartment("58ad5fcbe7a34900046ed3e7").subscribe((data) => {
      console.log(data);
    });

  }


  goToServerList(){
    this.navCtrl.push(ServerListPage);
  }

  goToMap(){
    this.navCtrl.push(MapPage);


  }


}
