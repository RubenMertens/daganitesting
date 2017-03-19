import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Player} from "../../providers/Player";

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
  private legalItems = [];
  private illegalitems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public player:Player) {
    console.log(this.player);


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    console.log(this.player);
    for(let key in this.player.legalItems){
      console.log(key);
      if(this.player.legalItems.hasOwnProperty(key)){
        this.legalItems.push(new Item(key,this.player.legalItems[key]));
        console.log("pushed stuff");
      }
    }
    for(let key in this.player.illegalItems){
      if(this.player.illegalItems.hasOwnProperty(key)){
        this.illegalitems.push(new Item(key,this.player.illegalItems[key]));
      }
    }

    console.log(this.legalItems)

  }



}

class Item{
  constructor(
    public name:string,public amount:number
  ){

  }
}
