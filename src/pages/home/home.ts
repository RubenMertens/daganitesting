import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from "ionic-angular";
import {ServerListPage} from "../server-list/server-list";
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from "ionic-native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams , public platform : Platform) {
    platform.ready().then(() => {
      this.loadMap();
    })
  }


  goToServerList(){
    this.navCtrl.push(ServerListPage);
    console.log("test");
  }

  loadMap(){

    let location = new GoogleMapsLatLng(-34.9290,138.6010);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

  }


}
