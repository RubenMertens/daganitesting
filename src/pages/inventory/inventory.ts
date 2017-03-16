import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListItem} from "../../domain/ListItem";
import {Player} from "../../providers/Player";
import {PlayerItem} from "../../domain/PlayerItem";

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
  private legalItems:PlayerItem[] = [];
  private illegalitems:PlayerItem[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public player:Player) {
    console.log(this.player);


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.player.items.forEach((value,key) => {
      if(value.legal){
        this.legalItems.push(value);
      }else{
        this.illegalitems.push(value);
      }
    })
  }

}
