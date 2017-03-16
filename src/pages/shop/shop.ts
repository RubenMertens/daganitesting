import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ListItem} from "../../domain/ListItem";
import {Player} from "../../providers/Player";
import {ConfirmsalePage} from "../confirmsale/confirmsale";
import {ConnectionService} from "../../providers/connection-service";
import {PlayerItem} from "../../domain/PlayerItem";

/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  private options:string;
  private shop:any;
  private legalAmount:number;
  private illegalAmount:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public player:Player,
              public connectionService:ConnectionService
  ) {
      this.options = "Sell";
      this.shop = this.navParams.data;
      this.legalAmount = Math.floor(this.player.carriedMoney / this.shop.items[0].legalPurchase);
      this.illegalAmount = Math.floor(this.player.carriedMoney / this.shop.items[0].illegalPurchase);
      this.options="legal";

      console.log(this.shop);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  handleLegalSell(clickedItem:any){
    console.log("Selling legal");
    console.log(clickedItem);
    let totPrice = +clickedItem.legalPurchase*+this.legalAmount;
    if(totPrice <= this.player.carriedMoney){
      let prompt = this.alertCtrl.create({
        title:"Confirm",
        message: "Are you sure you want to buy " + this.legalAmount + " of " + clickedItem.name +" for " +totPrice + "?",
        buttons: [
          {
            text: "cancel",
            role: "cancel",
            handler : data => {
              console.log("purchase cancelled");
              this.navCtrl.pop();
            }
          },
          {
            text : "Ok",
            handler: data => {
              console.log(data);
              console.log("handling sell");
              //todo backend link
              let itemMap = new Map<string,number>();
              itemMap.set(clickedItem.name,this.legalAmount);
                this.connectionService.sendTradePostLegalPurchase(totPrice,itemMap,this.shop.id);
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    }
  }

  handleIllegalSell(clickedItem:any){
    console.log("Selling illegal");
    console.log(clickedItem);
    let totPrice = +clickedItem.legalPurchase*+this.illegalAmount;
    if(totPrice <= this.player.carriedMoney){
      let prompt = this.alertCtrl.create({
        title:"Confirm",
        message: "Are you sure you want to buy " + this.illegalAmount + " of " + clickedItem.name +" for " +totPrice + "?",
        buttons: [
          {
            text: "cancel",
            role: "cancel",
            handler : data => {
              console.log("purchase cancelled");
              this.navCtrl.pop();
            }
          },
          {
            text : "Ok",
            handler: data => {
              console.log(data);
              console.log("handling sell");
              //todo backend link
              let itemMap = new Map<string,number>();
              itemMap.set(clickedItem.name,this.illegalAmount);
              this.connectionService.sendTradePostIllegalPurchase(totPrice,itemMap,this.shop.id);
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    }
  }

 /* handleSell(clickedItem:any, legal:boolean) {
    console.log("selling");
    console.log(clickedItem);
    let totPrice = legal?+clickedItem.legalPurchase*+this.amount:+clickedItem.illegalPurchase*+this.amount;
    if(totPrice < this.player.carriedMoney){
      let prompt = this.alertCtrl.create({
        title:"Confirm",
        message: "Are you sure you want to buy " + this.amount + " of " + clickedItem.name +" for " +totPrice + "?",
        buttons: [
          {
            text: "cancel",
            role: "cancel",
            handler : data => {
              console.log("purchase cancelled");
              this.navCtrl.pop();
            }
          },
          {
            text : "Ok",
            handler: data => {
              console.log(data);
              console.log("handling sell");
              //todo backend link
              let itemMap = new Map<string,number>();
              itemMap.set(clickedItem.name,this.amount);
              //this.player.carriedMoney -= totPrice; //done by backend in handler

              if(legal){
                this.connectionService.sendTradePostLegalPurchase(totPrice,itemMap,this.shop.id);
              }else{
                this.connectionService.sendTradePostIllegalPurchase(totPrice,itemMap,this.shop.id);
              }
              console.log(this.player);
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    }else{
      let prompt = this.alertCtrl.create({
        title:"Problem",
        message:"You don't have enough money",
        buttons: [
          {
            text: "ok",
            handler:data => {
              console.error("player did not have enough money")
            }
          }
        ]
      });
      prompt.present();
    }
  }*/

  cancel(){
    this.navCtrl.pop();
  }

}
