/**
 * Created by Ravanys on 11/03/2017.
 */


export class GameEventMessage{
  constructor(public type:string,public players:Array<string>,public moneyTransferred:number,public items:any, public tradePostId:string){}
}
