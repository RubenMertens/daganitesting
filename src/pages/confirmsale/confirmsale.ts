import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListItem} from "../../domain/ListItem";
import {Player} from "../../providers/Player";

/*
  Generated class for the Confirmsale page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirmsale',
  templateUrl: 'confirmsale.html',
})
export class ConfirmsalePage {

  private clickedItem:ListItem;
  private value:number;
  private errorMessage:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public player:Player) {
    this.clickedItem = navParams.data;
    this.value = this.clickedItem.amount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmsalePage');
  }

  handleSell(){
    console.log("SOLD "+this.value + " of " + this.clickedItem.name);

    if(this.value <= this.clickedItem.amount && this.value > 0){
      this.clickedItem.amount -= this.value;
      this.player.carriedMoney += this.clickedItem.value * this.value;
      this.navCtrl.pop();
    }else{
      console.log("error handling goes here?")
      if(this.value > 0){
        this.errorMessage = "Cannot sell more " + this.clickedItem.name + " than you have!"
      }else{
        this.errorMessage = "You can't sell a negative amount of " + this.clickedItem.name +"!";
      }
    }


  }

  handleCancel(){
    console.log("Sale cancelled");
    this.navCtrl.pop();
  }

}
