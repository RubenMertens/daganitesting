import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl:AlertController) {
    this.fillWithDummyData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPage');
  }

  fillWithDummyData(){
    this.moneyInBank = 3000000;
    this.playerMoney = 1000;
  }

  deposit(){
    let prompt = this.alertCtrl.create({
      title: "Deposit how much?",
      inputs : [
        {
          name: "amount",
          placeholder: "amount",
          type: "number"
        }
      ],
      buttons: [
        {
          text: 'cancel',
          handler: data => {
            console.log("cancel clicked")
          }
        },
        {
          text: "Deposit",
          handler: data => {
            console.log("Ok clicked");
            console.log(+data);
            if(+data.amount > 0 && this.playerMoney - data.amount > 0){
              this.playerMoney -= +data.amount;
              this.moneyInBank += +data.amount;
              //todo send message to backend
            }else{
              let errorprompt = this.alertCtrl.create();
              errorprompt.setTitle("There's not enough money!");
              errorprompt.present();
            }
          }
          }
      ]
    });

    prompt.present();
  }

  withdraw(){
    let prompt = this.alertCtrl.create({
      title: "Withdraw how much?",
      inputs : [
        {
          name: "amount",
          placeholder: "amount",
          type: "number"
        }
      ],
      buttons: [
        {
          text: 'cancel',
          handler: data => {
            console.log("cancel clicked")
          }
        },
        {
          text: "Withdraw",
          handler: data => {
            console.log("Ok clicked");
            console.log(data);
            if(data.amount > 0 && this.moneyInBank - data.amount > 0){
              this.playerMoney += +data.amount;
              this.moneyInBank -= +data.amount;
              //todo send message to backend
            }else{
              let errorprompt = this.alertCtrl.create();
              errorprompt.setTitle("There's not enough money!");
              errorprompt.present();
            }
          }
        }
      ]
    });

    prompt.present();
  }

}
