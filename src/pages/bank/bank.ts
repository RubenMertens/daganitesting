import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Player} from "../../providers/Player";
import {ConnectionService} from "../../providers/connection-service";

/*
  Generated class for the Bank page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html'
})
export class BankPage {

  private moneyInBank:number;
  private playerMoney:number;
  private depositValue:number;
  private bank:any;
  private option:string;

  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl:AlertController, public player:Player, public connectionService:ConnectionService) {
    console.log("bank param");
    console.log(this.navParams.data);
    this.bank = this.navParams.data;
    this.moneyInBank = this.player.team.bankAccount;
    this.playerMoney=this.player.carriedMoney;
    this.depositValue= this.playerMoney;
    this.option= "deposit";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPage');
  }

  deposit(){
    console.log("depositing to bank");
    this.connectionService.sendPutMoneyBank(this.depositValue,this.bank.id);
  }

  withdraw(){

  }

  cancel(){
    this.navCtrl.pop();
  }

}
