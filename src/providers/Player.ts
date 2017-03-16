import {Injectable} from "@angular/core";
import {ListItem} from "../domain/ListItem";
import {PlayerItem} from "../domain/PlayerItem";
/**
 * Created by Ravanys on 05/03/2017.
 */

@Injectable()
export class Player{
  public carriedMoney:number = 0;
  public team:any;
  public items:Map<string,PlayerItem>;

  public legalItems:Map<string,number>;
  public illegalItems:Map<string,number>;

  constructor(){
    this.items = new Map<string, PlayerItem>();
  }

  public reset(){
    this.carriedMoney = 0;
    this.team = null;
    this.items = new Map<string,PlayerItem>();
  }

}
