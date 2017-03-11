import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public player:Player) {
    this.team = navParams.data;
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

    if(this.value > 0 && this.team.treasury - this.value > 0){
      this.player.carriedMoney += this.team.treasury;
      this.team.treasury -= this.value;
      //todo send message to backend!
      this.navCtrl.pop();
    }else{
      this.errorMessage = "Can't collect that amount of money!"
    }



  }

}
