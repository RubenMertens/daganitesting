import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListItem} from "../../domain/ListItem";

/*
  Generated class for the Inventory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {

  private carriedMoney:number;
  private totalMoney:number;
  private legalItems:ListItem[];
  private illegalitems:ListItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadDummyData();
  }

  loadDummyData(){
    this.totalMoney = 681462152
    this.carriedMoney = 15000;
    this.legalItems = [
      new ListItem("pizza",60,10),
      new ListItem("laptop",80,1000),
      new ListItem("aandeel",1300,5),
      new ListItem("ijs",150,30),
      new ListItem("pizza",60,10),
      new ListItem("pizza",60,10),
      new ListItem("pizza",60,10),
      new ListItem("pizza",60,10),
    ];
    this.illegalitems = [
      new ListItem("cocaine",12,50),
      new ListItem("diploma",5456,1000),
      new ListItem("vals geld",98765,1),
      new ListItem("cocaine",12,50),
      new ListItem("cocaine",12,50),
      new ListItem("cocaine",12,50),
      new ListItem("cocaine",12,50),
      new ListItem("cocaine",12,50),
      new ListItem("cocaine",12,50),
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

}
