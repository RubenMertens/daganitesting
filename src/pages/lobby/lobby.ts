import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";
import {ConnectionService} from "../../providers/connection-service";
import {MessageWrapper} from "../../domain/MessageWrapper";
import {MapPage} from "../map/map";
import {Game} from "../../domain/Game";

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

  private heartBeatTimer:any;
  private game:Game;

  constructor(public navCtrl: NavController, public navParams: NavParams, player:Player, public connectionService:ConnectionService) {
    let gameId = navParams.data[1];
    let token = navParams.data[0].clientToken;

    this.connectionService.setupTCPSocket(token, gameId);
    this.heartBeatTimer = setInterval(() => this.connectionService.sendHeartBeat(),1000);
    let self = this;
    this.connectionService.addMessageHandler(function (message) {
        self.handleSocketMessage(message,self) //todo refactor
    })

  }



  handleSocketMessage(message,self){
    console.log(message.data);
    let messageWrapper:MessageWrapper = JSON.parse(message.data);
    console.log(messageWrapper);
    if(messageWrapper.messageType == "GAME_START"){
      clearInterval(this.heartBeatTimer);
      self.navCtrl.push(MapPage,this.game);

      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LobbyPage');

    this.connectionService.getGame().subscribe(data => {
      console.log(data);
      this.game = new Game(data.id,data.roomName,data.districts,data.markets,data.tradePosts,data.teams,data.maxPlayersPerTeam,data.maxTeams);
      console.log(this.game);
    })
  }

  ionViewWillLeave(){
    console.log("about to leave the server list page");
    this.connectionService.unregisterFromGame();
    clearInterval(this.heartBeatTimer);
  }

  leavePage(){
    console.log("player is leaving game");
    this.connectionService.unregisterFromGame();
    console.log(this.heartBeatTimer);
    clearInterval(this.heartBeatTimer);
    this.heartBeatTimer.
    this.navCtrl.pop();
  }



}
