import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";

/*
  Generated class for the Lobby page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, player:Player) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LobbyPage');
  }

}
