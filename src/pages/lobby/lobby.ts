import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";
import {ConnectionService} from "../../providers/connection-service";
import {MessageWrapper} from "../../domain/MessageWrapper";
import {MapPage} from "../map/map";

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



  constructor(public navCtrl: NavController, public navParams: NavParams, player:Player, public connectionService:ConnectionService) {
    let gameId = navParams.data[1];
    let token = navParams.data[0].clientToken;

    this.connectionService.setupTCPSocket(token, gameId);

    this.connectionService.addMessageHandler(this.handleSocketMessage);

  }

  handleSocketMessage(message){
    console.log("handling message in handler, yeah. mother fucker");
    console.log(message.data);
    let messageWrapper:MessageWrapper = JSON.parse(message.data);
    console.log(messageWrapper);
    if(messageWrapper.messageType == "GAME_START"){
        this.navCtrl.push(MapPage);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LobbyPage');
  }



  leavePage(){
    console.log("player is leaving game");
    this.connectionService.unregisterFromGame();
    this.navCtrl.pop();
  }



}
