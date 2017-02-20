import {Injectable, NgZone} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BackgroundGeolocation, Geoposition} from "ionic-native";

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTracker {



  constructor(public http: Http , public zone: NgZone) {
    console.log('Hello LocationTracker Provider');
  }

  startTracking(){

  }

  stopTracking(){

  }

}
