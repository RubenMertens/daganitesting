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
    console.log("Purchasing legal");
    console.log(clickedItem);
    let totPrice = +clickedItem.legalPurchase*+this.legalAmount;
    if(totPrice <= this.player.carriedMoney){
      let prompt = this.alertCtrl.create({
        title:"Confirm",
        message: "Bent u zeker dat u " + this.legalAmount +" " + clickedItem.name +" wilt kopen voor " +totPrice + "?",
        buttons: [
          {
            text: "Terug",
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
    console.log("purchasing illegal");
    console.log(clickedItem);
    let totPrice = +clickedItem.illegalPurchase*+this.illegalAmount;
    if(totPrice <= this.player.carriedMoney){
      let prompt = this.alertCtrl.create({
        title:"Confirm",
        message: "Bent u zeker dat u  " + this.illegalAmount + " " + clickedItem.name +" wilt kopen voor " +totPrice + "?",
        buttons: [
          {
            text: "Terug",
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

  cancel(){
    this.navCtrl.pop();
  }

}
