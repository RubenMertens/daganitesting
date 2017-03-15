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
  constructor(){
    this.items = new Map<string, PlayerItem>();
  }

}
