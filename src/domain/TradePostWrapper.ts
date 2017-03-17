import {GoogleMapsCircle} from "ionic-native";
/**
 * Created by Ravanys on 17/03/2017.
 */


export class TradePostWrapper{
  constructor(
    public tradePost:any,
    public circle:GoogleMapsCircle,
    public used:boolean
  ){}
}
