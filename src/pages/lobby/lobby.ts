import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, LoadingController, ViewController, Platform, Navbar} from 'ionic-angular';
import {Player} from "../../providers/Player";
import {ConnectionService} from "../../providers/connection-service";
import {MessageWrapper} from "../../domain/MessageWrapper";
import {MapPage} from "../map/map";
import {Game} from "../../domain/Game";
import {BackgroundMode} from "ionic-native";

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

  @ViewChild(Navbar) navBar:Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, player:Player, public connectionService:ConnectionService,
              public loadingCtrl:LoadingController, private viewCtrl:ViewController, public platform:Platform
  ) {

    platform.registerBackButtonAction(() => {this.leavePage()},0);

    let token = navParams.data.clientToken;

    let loading = this.loadingCtrl.create();
    loading.setContent("Verbinding maken..");
    loading.present();
    this.connectionService.setupTCPSocket(token).subscribe(data => {
      console.log("in subscribe of setup");
      console.log(data);
      loading.dismiss();
      this.connectionService.sendHeartBeat(); //do one to init the connection
      this.heartBeatTimer = setInterval(() => this.connectionService.sendHeartBeat(),10000);
    });

    this.connectionService.addMessageHandler(message => this.handleSocketMessage(message,this));
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
      this.game = new Game(data.id,data.roomName,data.districts,data.markets,data.tradePosts,data.teams,data.maxPlayersPerTeam,data.maxTeams,data.banks);
      console.log(this.game);
    });
    BackgroundMode.enable();
    this.navBar.backButtonClick = () => this.leavePage();
  }


  ionViewWillLeave(){

    console.log("about to leave the server list page");
    //this.connectionService.unregisterFromGame();
    clearInterval(this.heartBeatTimer);

  }

  leavePage(){
    console.log("player is leaving game");
    this.connectionService.unregisterFromGame().subscribe(data => {
      console.log(data);
      console.log("Hey you actually got something from backend");
    });
    console.log(this.heartBeatTimer);
    clearInterval(this.heartBeatTimer);
    this.navCtrl.pop();
    BackgroundMode.disable();
  }



}
