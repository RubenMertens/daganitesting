import {GoogleMapsCircle, GoogleMapsMarker} from "ionic-native";
/**
 * Created by Ravanys on 17/03/2017.
 */


export class TradePostWrapper{
  constructor(
    public tradePost:any,
    public marker:GoogleMapsMarker,
    public used:boolean
  ){}
}
