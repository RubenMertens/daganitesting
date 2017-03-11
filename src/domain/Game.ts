
import {TradePost} from "./TradePost";
/**
 * Created by Ravanys on 11/03/2017.
 */


export class Game{
  constructor(
    public id:string,
    public roomName:string,
    public districts:Array<any>,
    public markets:Array<any>,
    public tradePosts:Array<any>,
    public teams:any,
    public maxPlayersPerTeam:number,
    public maxTeams:number,
  ){}
}
