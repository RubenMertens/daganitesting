import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ListItem} from "../../domain/ListItem";
import {Player} from "../../providers/Player";
import {ConfirmsalePage} from "../confirmsale/confirmsale";

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
  private shopType:string;

  private shopInventory:ListItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public player:Player) {
      this.options = "Sell"
    this.loadDummyData();
  }

  loadDummyData(){
    this.shopInventory = [
      new ListItem("pizza",1000,10),
      new ListItem("laptop",1000,1500),
      new ListItem("aandeel",1000,5),
      new ListItem("ij",1000,30),
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  handleSell(clickedItem: ListItem) {

    this.navCtrl.push(ConfirmsalePage, clickedItem);
  }

  //todo remove item when amount < 0

}
