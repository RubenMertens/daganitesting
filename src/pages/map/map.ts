import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {
  GoogleMap, GoogleMapsLatLng, GoogleMapsEvent, Geolocation, CameraPosition, GoogleMapsPolygon, GoogleMapsLatLngBounds
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

  private safeZoneColor: string = "#0000FF";
  private teamColor: string[] = ["#d3d3d3","#4CAF50","#FFC107", "#E91E63"];


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

      let isInGroteMarkt =  groteMarktBounds.contains(new GoogleMapsLatLng(data.coords.latitude,data.coords.longitude));
/*
      console.log(isInGroteMarkt);
*/

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


      this.map.addPolygon({
        'points': groteMarktPoly,
        'strokeColor': this.safeZoneColor,
        'strokeWidth': 5,
        'fillColor': this.safeZoneColor,
        'visible' :true
      }).catch((error) => {
        console.log(error);
      });

      this.map.addPolygon({
        'points': a1Poly,
        'strokeColor': this.teamColor[0],
        'strokeWidth': 5,
        'fillColor': this.teamColor[0],
        'visible' :true
      }).catch((error) => {
        console.log(error);
      });

      this.map.addPolygon({
        'points': a2Poly,
        'strokeColor': this.teamColor[0],
        'strokeWidth': 5,
        'fillColor': this.teamColor[0],
        'visible' :true
      }).catch((error) => {
        console.log(error);
      });

      this.map.addPolygon({
        'points': a3Poly,
        'strokeColor': this.teamColor[0],
        'strokeWidth': 5,
        'fillColor': this.teamColor[0],
        'visible' :true
      }).catch((error) => {
        console.log(error);
      });

      this.map.addPolygon({
        'points': a4Poly,
        'strokeColor': this.teamColor[0],
        'strokeWidth': 5,
        'fillColor': this.teamColor[0],
        'visible' :true
      }).catch((error) => {
        console.log(error);
      });

      this.map.addPolygon({
        'points': a5Poly,
        'strokeColor': this.teamColor[0],
        'strokeWidth': 5,
        'fillColor': this.teamColor[0],
        'visible' :true
      }).catch((error) => {
        console.log(error);
      });

      this.map.addCircle({
        center: a1Schatkist,
        radius: 10,
        strokeColor : "#000000",
        strokeWidth : 1,
        fillColor : this.teamColor[1]
      });

      this.map.addCircle({
        center: a2Schatkist,
        radius: 10,
        strokeColor : "#000000",
        strokeWidth : 1,
        fillColor : this.teamColor[1]
      });

      this.map.addCircle({
        center: a3Schatkist,
        radius: 10,
        strokeColor : "#000000",
        strokeWidth : 1,
        fillColor : this.teamColor[1]
      });

      this.map.addCircle({
        center: a4Schatkist,
        radius: 10,
        strokeColor : "#000000",
        strokeWidth : 1,
        fillColor : this.teamColor[1]
      });

      this.map.addCircle({
        center: a5Schatkist,
        radius: 10,
        strokeColor : "#000000",
        strokeWidth : 1,
        fillColor : this.teamColor[1]
      });

    });


    let groteMarktPoly = [
      new GoogleMapsLatLng(51.164404, 4.138955),
      new GoogleMapsLatLng(51.165199, 4.139859),
      new GoogleMapsLatLng(51.164937, 4.141007),
      new GoogleMapsLatLng(51.163301, 4.141691),
      new GoogleMapsLatLng(51.163087, 4.141356)
    ];


     let a1Poly = [
              new GoogleMapsLatLng(51.163204, 4.141742),
       new GoogleMapsLatLng(51.164348, 4.145379),
       new GoogleMapsLatLng(51.163655, 4.147578),
       new GoogleMapsLatLng(51.162868, 4.148769),
       new GoogleMapsLatLng(51.161791, 4.148029),
       new GoogleMapsLatLng(51.160486, 4.150218),
       new GoogleMapsLatLng(51.160076, 4.148844),
       new GoogleMapsLatLng(51.161637, 4.145636),
    ];

     let a1Schatkist = new GoogleMapsLatLng(51.162747, 4.146580);

    let a2Poly = [
      new GoogleMapsLatLng(51.164903, 4.141451),
      new GoogleMapsLatLng(51.168743, 4.142419),
      new GoogleMapsLatLng(51.168470, 4.144602),
      new GoogleMapsLatLng(51.168615, 4.144844),
      new GoogleMapsLatLng(51.168605, 4.145192),
      new GoogleMapsLatLng(51.168447, 4.145450),
      new GoogleMapsLatLng(51.168353, 4.145461),
      new GoogleMapsLatLng(51.167979, 4.148234),
      new GoogleMapsLatLng(51.166062, 4.147134),
      ];

      let a2Schatkist = new GoogleMapsLatLng(51.168370, 4.145031);

    let a3Poly = [
      new GoogleMapsLatLng(51.163919, 4.139593),
      new GoogleMapsLatLng(51.161489, 4.135498),
      new GoogleMapsLatLng(51.161220, 4.132111),
      new GoogleMapsLatLng(51.162270, 4.131950),
      new GoogleMapsLatLng(51.163985, 4.133817),
      new GoogleMapsLatLng(51.165122, 4.131253),
      new GoogleMapsLatLng(51.166448, 4.133055),
      new GoogleMapsLatLng(51.165257, 4.135415),
      new GoogleMapsLatLng(51.165889, 4.136145),
      ];


      let a3Schatkist = new GoogleMapsLatLng(51.163743, 4.135104);

    let a4Poly = [
      new GoogleMapsLatLng(51.163919, 4.139593),
      new GoogleMapsLatLng(51.163041, 4.141444),
      new GoogleMapsLatLng(51.161477, 4.142002),
      new GoogleMapsLatLng(51.160930, 4.138223),
      new GoogleMapsLatLng(51.161489, 4.135498),
      ];


      let a4Schatkist = new GoogleMapsLatLng( 51.161966, 4.138899);

    let a5Poly = [
      new GoogleMapsLatLng( 51.169287, 4.138398),
      new GoogleMapsLatLng( 51.169065, 4.140297),
      new GoogleMapsLatLng( 51.168587, 4.142089),
      new GoogleMapsLatLng( 51.165089, 4.141123),
      new GoogleMapsLatLng( 51.165506, 4.138312),
      new GoogleMapsLatLng( 51.166017, 4.137486),
      new GoogleMapsLatLng( 51.166044, 4.136885),
      new GoogleMapsLatLng( 51.167315, 4.136993),
      ];

     let a5Schatkist = new GoogleMapsLatLng( 51.169068, 4.139418);


    let groteMarktBounds = new GoogleMapsLatLngBounds(groteMarktPoly);


  }

}
