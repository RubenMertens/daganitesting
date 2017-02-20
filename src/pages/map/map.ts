import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {
  GoogleMap, GoogleMapsLatLng, GoogleMapsEvent, Geolocation, CameraPosition
} from "ionic-native";

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap;


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform ) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }


  loadMap() {

    Geolocation.getCurrentPosition().then((resp) => {
      let position : CameraPosition = {
        target: new GoogleMapsLatLng(resp.coords.latitude,resp.coords.longitude),
        zoom:18,
        tilt:30
      }

      this.map.moveCamera(position);
    })

    let location = new GoogleMapsLatLng(-34.9290, 138.6010);

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
