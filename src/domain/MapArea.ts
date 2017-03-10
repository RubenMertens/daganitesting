import {GoogleMapsLatLngBounds} from "ionic-native";
/**
 * Created by RubenMertens on 10/03/2017.
 */


export class MapArea{

  constructor(public areaType:string,public mapBound: GoogleMapsLatLngBounds){}
}
