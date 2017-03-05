import {Injectable} from "@angular/core";
import {ListItem} from "../domain/ListItem";
/**
 * Created by Ravanys on 05/03/2017.
 */

@Injectable()
export class Player{
  public carriedMoney:number;
  public inventory:ListItem[];
  constructor(){
    this.loadDummyData();
  }

  loadDummyData(){
    this.carriedMoney = 15000;
    this.inventory = [
      new ListItem("pizza",60,10),
      new ListItem("laptop",80,1500),
      new ListItem("aandeel",1300,5),
      new ListItem("ijs",150,30)
    ];
  }
}
