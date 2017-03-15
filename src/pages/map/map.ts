import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {
  GoogleMap, GoogleMapsLatLng, GoogleMapsEvent, Geolocation, CameraPosition, GoogleMapsPolygon, GoogleMapsLatLngBounds,
  GoogleMapsGroundOverlay, GoogleMapsCircle
} from "ionic-native";
import {ConnectionService} from "../../providers/connection-service";
import {InventoryPage} from "../inventory/inventory";
import {MessageWrapper} from "../../domain/MessageWrapper";
import {BulkLocation} from "../../domain/BulkLocation";
import {MapArea} from "../../domain/MapArea";
import {AreaBounds} from "../../domain/AreaBounds";
import {TradePost} from "../../domain/TradePost";
import {BankPage} from "../bank/bank";
import {Game} from "../../domain/Game";
import {CollectMoneyPage} from "../collect-money/collect-money";
import {Player} from "../../providers/Player";

/*
 Generated class for the Map page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  private MapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];


  map: GoogleMap;

  private safeZoneColor: string = "#0000FF88";
  private districtAColor: string = "#FFFFFF88";
  private districtBColor: string = "#FFF";
  private teamColor: Array<string> = ["#d3d3d3", "#4CAF50", "#FFC107", "#E91E63"];
  private circleColor: string = "#0ff";
  private bankColor:string ="#F00";
  private tradePostColor:string="#00F";
  private strokeWidth: number = 5;
  private circleRadius: number = 20;
  private cirlceStrokeWidth: number = 1;
  private geoWatch:any;
  private mapAreaArray:Array<MapArea> = [];
  private boundsArray:Array<AreaBounds> =[];

  private game:Game;

  private inMarket:boolean;
  private inDistrict:boolean;
  private inShop:boolean;
  private inBank:boolean;
  private inTreasury:boolean;

  private currentLocationObject:any;

  private token: string;
  private gameId: string; //todo MA echt refactor dit


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform, public  connectionService: ConnectionService
              , public alertCtrl:AlertController, public player:Player,
  ) {
    platform.ready().then(() => {
      this.loadMap();
    });
/*
    let self = this;
*/

    this.connectionService.addMessageHandler(message => this.handleSocketMessage(message,this));

/*    this.connectionService.addMessageHandler(function (message) {
      self.handleSocketMessage(message,self) //todo refactor
    });*/
    console.log(navParams);
    this.game= navParams.data;
    console.log(this.game);


  }

  handleSocketMessage(message, self) {
    let messageWrapper:MessageWrapper = JSON.parse(message.data);
    console.log("message received");
    console.log(messageWrapper);
    if(messageWrapper.messageType == "BULK_LOCATION"){
      let bulklocations:any = JSON.parse(messageWrapper.message);
      console.log(bulklocations);
      /*for (let obj of bulklocations.locations) {
        console.log(obj);
         //todo finish this? needs testing ofc
        /!*this.map.addCircle({
          center: obj.value,
          radius: 2,
          strokeColor : "#000000",
          strokeWidth : 1,
          fillColor : this.teamColor[1]
        });*!/
      }*/
    }else if(messageWrapper.messageType == "TEAM_NOTIFICATION"){
      let notification = JSON.parse(messageWrapper.message);
      console.log(notification);
      console.log(this.player.team);
      self.player.team.districts = notification.districts;
      self.player.team.treasury = notification.treasury;
      self.player.team.bankAccount = notification.bankAccount;
    }

  }

  gotoInventory() {
    this.navCtrl.push(InventoryPage);
  }

  ionViewWillLeave(){
  }

  exitMap(){
    console.log("will leave map.");
    this.connectionService.stopConnection();
    this.geoWatch.unsubscribe();
    this.navCtrl.pop();
  }


  loadMap() {

    this.geoWatch= Geolocation.watchPosition()/*.timeout(5000, console.log("timed out"))*/.subscribe((data) => {
      let position: CameraPosition = {
        target: new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude),
        zoom: 18,
        tilt: 30
      };
      //this.map.moveCamera(position); //todo turn this back on for camera locking

      //let isInGroteMarkt =  groteMarktBounds.contains(new GoogleMapsLatLng(data.coords.latitude,data.coords.longitude));
      this.connectionService.sendLocationData(data.coords.latitude, data.coords.longitude);

      this.inMarket = false;
      this.inShop = false;
      this.inBank = false;
      this.inDistrict = false;
      this.inTreasury = false;

      for (let areaBound of this.boundsArray) {
        if(areaBound.bounds.contains(new GoogleMapsLatLng(data.coords.latitude,data.coords.longitude))){
          this.currentLocationObject = areaBound.object;
          switch(areaBound.type){
            case "BANK":
              this.inBank = true;
              console.log("is in bank");
              break;
            case "TRADE_POST" :
              this.inShop = true;
              break;
            case "MARKET" :
              this.inMarket = true;
              break;
            case "TREASURY" :
              console.log("inside a treasury");
              this.inTreasury = true;
              break;
          }
        }

      }
    });

    this.map = new GoogleMap('map', {
      'styles': this.MapStyles,
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

      for (let district of this.game.districts) {
        let poly = [];
        let treasureLoc: GoogleMapsLatLng;
        for (let point of district.points) {
          if (point.type === "COORDINATE") {
            poly.push(new GoogleMapsLatLng(point.latitude, point.longitude));
          } else if (point.type === "TREASURE") {
            treasureLoc = new GoogleMapsLatLng(point.latitude, point.longitude);
          }
        }
        this.map.addPolygon({
          'points': poly,
          'strokeColor': this.districtAColor,
          'strokeWidth': this.strokeWidth,
          'fillColor': this.districtAColor,
          'visible': true
        }).catch((error) => {
          console.log(error);
        });
        /*
        this.boundsArray.push(new AreaBounds(district,this.circletoBounds(treasureLoc,this.circleRadius),"DISTRICTCAPITAL")); //todo pleinen voor veroveren
         this.map.addCircle({
         center: treasureLoc,
         radius: this.circleRadius,
         strokeColor: this.circleColor,
         strokeWidth: this.cirlceStrokeWidth,
         fillColor: this.circleColor
         });*/
      }

      for (let market of this.game.markets) {
        let poly = [];
        for (let point of market.points) {
          poly.push(new GoogleMapsLatLng(point.latitude, point.longitude));
        }
        this.boundsArray.push(new AreaBounds(market, new GoogleMapsLatLngBounds(poly), "TREASURY"));
        this.map.addPolygon({
          'points': poly,
          'strokeColor': this.safeZoneColor,
          'strokeWidth': this.strokeWidth,
          'fillColor': this.safeZoneColor,
          'visible': true
        }).catch((error) => {
          console.log(error);
        });
      }
      console.log(this.game);
      for (let bank of this.game.banks) {
        let point = new GoogleMapsLatLng(bank.point.latitude,bank.point.longitude);
        this.boundsArray.push(new AreaBounds(bank,this.circletoBounds(point,this.circleRadius),"BANK"));
        this.map.addCircle({
          center: point,
          radius: this.circleRadius,
          strokeColor: this.tradePostColor,
          strokeWidth: 5,
          fillColor: this.tradePostColor
        });
      }

      for (let tradePost of this.game.tradePosts) {
        let point = new GoogleMapsLatLng(tradePost.point.latitude, tradePost.point.longitude);
        this.boundsArray.push(new AreaBounds(tradePost, this.circletoBounds(point, this.circleRadius), "TRADE_POST"));
        this.map.addCircle({
          center: point,
          radius: this.circleRadius,
          strokeColor: this.tradePostColor,
          strokeWidth: 5,
          fillColor: this.tradePostColor
        });
      }

      for (let team of this.game.teams) {
        console.log("team")
        console.log(team);
        for (let key in team.players) {
          if (team.players.hasOwnProperty(key)) {

            if(team.players[key].clientID === this.connectionService.clientID){
            this.player.team = team;
            let point = team.districts[0].points[team.districts[0].points.length - 1];
            let treasureLoc = new GoogleMapsLatLng(point.latitude, point.longitude);
            this.currentLocationObject = this.player.team; //todo remove this is for testing
            this.boundsArray.push(new AreaBounds(this.player.team, this.circletoBounds(treasureLoc, this.circleRadius), "TREASURY")); //todo pleinen voor veroveren
            this.map.addCircle({
              center: treasureLoc,
              radius: this.circleRadius,
              strokeColor: this.circleColor,
              strokeWidth: 0,
              fillColor: this.circleColor
            })
            }
          }
        }
      }


    });
  }

  restartConnection() {
    this.connectionService.stopConnection();
    this.connectionService.setupTCPSocket(this.token, this.gameId);
  }

  public circletoBounds(center:GoogleMapsLatLng, radius:number) { //todo collapse to no variables
    let radiusEarth = 6378000;
    let SWlat = center.lat + (-radius / radiusEarth) * (180 / Math.PI);
    let SWlng = center.lng + (-radius / radiusEarth) * (180 / Math.PI) / Math.cos(center.lat * Math.PI/180);
    let SWpoint = new GoogleMapsLatLng(SWlat,SWlng);
    let NElat = center.lat + (radius / radiusEarth) * (180 / Math.PI);
    let NElng = center.lng + (radius / radiusEarth) * (180 / Math.PI) / Math.cos(center.lat * Math.PI/180);
    let NEpoint = new GoogleMapsLatLng(NElat,NElng);
    return new GoogleMapsLatLngBounds( [SWpoint,NEpoint]);
  }

  public gotoBank(){
    this.navCtrl.push(BankPage,this.currentLocationObject);
  }


  public collectMoney(){ //todo werkt voor gene zak
    this.navCtrl.push(CollectMoneyPage,this.currentLocationObject);
  }



}

/*  this.map.addPolygon({
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

 let a5Schatkist = new GoogleMapsLatLng( 51.169068, 4.139418);*/


//let groteMarktBounds = new GoogleMapsLatLngBounds(groteMarktPoly);
