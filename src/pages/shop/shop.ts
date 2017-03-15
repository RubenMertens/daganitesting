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
  private amount:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public player:Player,
              public connectionService:ConnectionService
  ) {
      this.options = "Sell";
      this.shop = this.navParams.data;
      this.amount = 1; //todo make this the max the player can buy with his money
      console.log(this.shop);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  handleSell(clickedItem:any, legal:boolean) {
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
              this.player.carriedMoney -= totPrice;

              if(legal){
                if(this.player.items.has(clickedItem.name)){
                  let item = this.player.items.get(clickedItem.name);
                  item.amount += this.amount;
                  //todo check if this works with the reference?
                }else{
                  this.player.items.set(clickedItem.name,new PlayerItem(clickedItem.legalPurchase,clickedItem.legalSales,true,this.amount,clickedItem.name));
                }
                this.connectionService.sendTradePostLegalPurchase(totPrice,itemMap,this.shop.id);
              }else{

                if(this.player.items.has(clickedItem.name)){
                  let item = this.player.items.get(clickedItem.name);
                  item.amount += this.amount;
                  //todo check if this works with the reference?
                }else{
                  this.player.items.set(clickedItem.name,new PlayerItem(clickedItem.illegalPurchase,clickedItem.illegalSales,false,this.amount,clickedItem.name));
                }
                this.connectionService.sendTradePostIllegalPurchase(totPrice,itemMap,this.shop.id);
              }
              console.log(this.player);
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
  }

  cancel(){
    this.navCtrl.pop();
  }

}
