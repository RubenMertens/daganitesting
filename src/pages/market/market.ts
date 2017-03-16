import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ConnectionService} from "../../providers/connection-service";
import {Player} from "../../providers/Player";

/*
  Generated class for the Market page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class MarketPage {

  private market : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public connectionService:ConnectionService,
              public player:Player,
              public alertCtrl:AlertController

  ) {
    this.market = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketPage');
  }

  handleSellAll(){
    this.connectionService.sendTradePostAllSale(this.market.id);
    this.navCtrl.pop()
  }

  cancel(){
    this.navCtrl.pop();
  }

}
