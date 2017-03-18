import {GoogleMapsPolygon, GoogleMapsLatLngBounds} from "ionic-native";
/**
 * Created by Ravanys on 17/03/2017.
 */


export class DistrictWrapper{

  constructor(
    public district:any,
    public poly:GoogleMapsPolygon,
    public canCapture:boolean,
    public bounds:GoogleMapsLatLngBounds
  ){}
}
