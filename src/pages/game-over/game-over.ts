import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";
import {HomePage} from "../home/home";

/*
  Generated class for the GameOver page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-over',
  templateUrl: 'game-over.html'
})
export class GameOverPage {

  private winningTeam:string;
  private hasWon:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public player:Player) {
    this.winningTeam = this.navParams.data;
    if(this.player.team.teamName === this.winningTeam){
      this.hasWon= true;
    }else{
      this.hasWon=false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameOverPage');
  }

  gotoHomePage(){
    this.player.reset();
    this.navCtrl.push(HomePage);
  }

}
