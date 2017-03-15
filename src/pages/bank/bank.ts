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

  private depositValue:number;
  private bank:any;
  private options:string;
  private withdrawalValue:number;

  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl:AlertController, public player:Player, public connectionService:ConnectionService) {
    console.log("bank param");
    console.log(this.navParams.data);
    this.bank = this.navParams.data;

    this.depositValue= this.player.carriedMoney;
    this.withdrawalValue = this.player.team.bankAccount;
    this.options= "deposit";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPage');
  }

  deposit(){
    console.log("depositing to bank");
    //todo if statement
    if(this.player.carriedMoney - this.depositValue >=0){
      this.player.carriedMoney -= this.depositValue;
      this.player.team.bankAccount += this.depositValue;
      this.connectionService.sendBankDeposit(this.depositValue,this.bank.id);
      this.depositValue = this.player.carriedMoney;
    }else{
      console.error("failed to deposit to bank");
    }
  }

  withdraw(){
    if(this.player.team.bankAccount - this.withdrawalValue >= 0){
      this.player.team.bankAccount -=  this.withdrawalValue;
      this.player.carriedMoney += this.withdrawalValue;
      this.connectionService.sendBankWithdrawal(this.withdrawalValue,this.bank.id);
      this.withdrawalValue = this.player.team.bankAccount;

    }else{
      console.error("failed to withdrawal from bank");
    }
  }

  cancel(){
    this.navCtrl.pop();
  }

}
