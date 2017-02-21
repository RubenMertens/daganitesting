import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {
  GoogleMap, GoogleMapsLatLng, GoogleMapsEvent, Geolocation, CameraPosition, GoogleMapsPolygon
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }



  loadMap() {

    let watch = Geolocation.watchPosition();

    watch.subscribe((data) => {
      let position: CameraPosition = {
        target: new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude),
        zoom: 18,
        tilt: 30
      };
      //this.map.moveCamera(position);
    });

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': false,
        'zoom': false
      },
      'gestures': {
        'scroll': true, //todo : turn all these function off, only true for debugging
        'tilt': true,
        'rotate': true,
        'zoom': true
      }
    });



    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');


      let test = new GoogleMapsPolygon({
        'points': poly,
        'strokeColor': "#FF0000",
        'strokeWidth': 5,
        'fillColor': "#FF0000",
        'visible' :true
      });

      console.log(test);

      this.map.addPolygon({
        'points': poly,
        'strokeColor': "#FF0000",
        'strokeWidth': 5,
        'fillColor': "#FF0000",
        'visible' :true
      }).then((polygon: GoogleMapsPolygon) => {
        console.log("polygon added");
        console.log(polygon);
      }).catch((error) => {
        console.log(error);
      });

    });


    let poly = [
      new GoogleMapsLatLng(51.164404, 4.138955),
      new GoogleMapsLatLng(51.165199, 4.139859),
      new GoogleMapsLatLng(51.164937, 4.141007),
      new GoogleMapsLatLng(51.163301, 4.141691),
      new GoogleMapsLatLng(51.163087, 4.141356)
    ];

     let groteMarkt = new GoogleMapsPolygon({
     points: poly,
     strokeColor: "#FF0000",
     strokeWeight: 2,
     fillColor: "#FF0000",
     });



  }

}
