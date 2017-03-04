import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {BuytabPage} from "../buytab/buytab";
import {SelltabPage} from "../selltab/selltab";
import {ListItem} from "../../domain/ListItem";

/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  private options = ["Sell","Buy"];

  private sellTab:any;
  private buyTab:any  ;

  private inventory:ListItem[];

  private carriedMoney:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController) {
    this.sellTab = SelltabPage;
    this.buyTab = BuytabPage;
    this.loadDummyData();
  }


  loadDummyData(){
    this.carriedMoney = 1500000;
    this.inventory = [
      new ListItem("pizza",60,10),
      new ListItem("laptop",80,1500),
      new ListItem("aandeel",1300,5),
      new ListItem("ijs",150,30)
    ];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  handleSell(clickedItem: ListItem){

    let alert = this.alertCtrl.create();
    alert.setTitle("Sell");
    alert.setMessage("How much " + clickedItem.name + " would you like to sell");
    alert.addInput({
      type: 'number',
      label: 'Amount',
      value: clickedItem.amount+"",
    });
    alert.addButton("cancel");
    alert.addButton({
      text:"Sell",
      handler : data => {
        console.log("Ok clicked");
        console.log(data)
      }
    });

    alert.present();
  }



}
