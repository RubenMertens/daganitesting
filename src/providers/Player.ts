import {Injectable} from "@angular/core";
/**
 * Created by Ravanys on 05/03/2017.
 */

@Injectable()
export class Player{
  public carriedMoney:number = 0;
  public team:any;

  public legalItems:Map<string,number>;
  public illegalItems:Map<string,number>;

  constructor(){
    this.legalItems = new Map<string,number>();
    this.illegalItems = new Map<string,number>();
  }

  public reset(){
    this.carriedMoney = 0;
    this.team = null;
    this.legalItems = new Map<string,number>();
    this.illegalItems = new Map<string,number>();
  }

}
