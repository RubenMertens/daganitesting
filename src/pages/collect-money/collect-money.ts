import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";
import {ConnectionService} from "../../providers/connection-service";

/*
  Generated class for the CollectMoney page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-collect-money',
  templateUrl: 'collect-money.html'
})
export class CollectMoneyPage {

  private moneyInTreasury:number;
  private errorMessage:string;
  private value:number;

  private team:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public player:Player, public connectionService:ConnectionService) {
    this.team = this.player.team;
    this.value = this.team.treasury;
    console.log(this.team);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectMoneyPage');
  }

  handleCancel(){
    this.navCtrl.pop();
  }

  handleCollect(){

    if(this.team.treasury > 0 && (this.team.treasury - this.value) >= 0){
      this.player.carriedMoney += this.value;
      this.team.treasury -= this.value;
      this.connectionService.sendTreasuryCollect(this.value,this.team.districts[0].id);
      this.navCtrl.pop();
    }else{
      this.errorMessage = "Can't collect that amount of money!"
    }



  }

}
