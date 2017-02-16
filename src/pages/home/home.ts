import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {ServerListPage} from "../server-list/server-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  goToServerList(){
    this.navCtrl.push(ServerListPage);
    console.log("test");
  }


}
