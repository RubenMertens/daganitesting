import { Component } from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from "ionic-angular";
import {ServerListPage} from "../server-list/server-list";
import {Device} from "ionic-native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  playerName:string ="";



  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public platform : Platform
              ,public alertCtrl:AlertController
  ) {
    console.log(Device.uuid);

  }


  goToServerList(){

    if(this.playerName == ""){
      let prompt = this.alertCtrl.create({});
      prompt.setTitle("Geen naam!");
      prompt.setMessage("Je moet eerst een naam ingeven.");
      prompt.present();
    }else{
      this.navCtrl.push(ServerListPage,{"playerName":this.playerName});
    }

  }




}
