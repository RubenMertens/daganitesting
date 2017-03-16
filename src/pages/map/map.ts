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
import {ShopPage} from "../shop/shop";
import {MarketPage} from "../market/market";

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

  /*private mapStyles = [
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
  ]*/

  private mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];


  map: GoogleMap;

  private safeZoneColor: string = "#0000FF88";
  private districtAColor: string = "#FFFFFF88";
  private districtBColor: string = "#FFF";
  private teamColor: Array<string> = [];
  private circleColor: string = "#0ff";
  private bankColor: string = "#F00";
  private tradePostColor: string = "#00F";
  private strokeWidth: number = 5;
  private circleRadius: number = 20;
  private cirlceStrokeWidth: number = 1;
  private geoWatch: any;
  private mapAreaArray: Array<MapArea> = [];
  private boundsArray: Array<AreaBounds> = [];
  private circles: Array<any> = [];

  private game: Game;
  private bank: any;
  private myTeam: any;
  private demoShop: any;
  private market:any;

  private inMarket: boolean;
  private inDistrict: boolean;
  private inShop: boolean;
  private inBank: boolean;
  private inTreasury: boolean;

  private currentLocationObject: any;

  private token: string;
  private gameId: string; //todo MA echt refactor dit


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform, public  connectionService: ConnectionService
    , public alertCtrl: AlertController, public player: Player,) {
    platform.ready().then(() => {
      this.loadMap();
    });
    /*
     let self = this;
     */

    this.connectionService.addMessageHandler(message => this.handleSocketMessage(message, this));

    /*    this.connectionService.addMessageHandler(function (message) {
     self.handleSocketMessage(message,self) //todo refactor
     });*/
    console.log(navParams);
    this.game = navParams.data;
    console.log(this.game);


  }

  handleSocketMessage(message, self) {
    let messageWrapper: MessageWrapper = JSON.parse(message.data);
    console.log("message received");
    console.log(messageWrapper);
    if (messageWrapper.messageType == "BULK_LOCATION") {
      let bulklocations: any = JSON.parse(messageWrapper.message);
      console.log("circles");
      console.log(self.circles);
      for (let obj of self.circles) {
        obj.remove();
      }
      self.circles = [];
      for (let obj of bulklocations.locations) {
        console.log(obj);
        self.map.addCircle({
          center: new GoogleMapsLatLng(obj.location.lat, obj.location.lng),
          radius: 2,
          strokeColor: "#000000",
          strokeWidth: 1,
          fillColor: self.teamColor[1]
        }).then((data) => {
          self.circles.push(data);
        });
      }
    } else if (messageWrapper.messageType == "TEAM_NOTIFICATION") {
      let notification = JSON.parse(messageWrapper.message);
      console.log(notification);
      console.log(this.player.team);
      self.player.team.districts = notification.districts;
      self.player.team.treasury = notification.treasury;
      self.player.team.bankAccount = notification.bankAccount;
    } else if (messageWrapper.messageType == "PLAYER_NOTIFICATION") {
      let notification = JSON.parse(messageWrapper.message);
      console.log(notification);
      self.player.carriedMoney = notification.money;
      self.player.legalItems = notification.legalItems;
      self.player.illegalItems = notification.illegalItems;
      console.log(this.player.team);
    }


    else if (messageWrapper.messageType == "ERROR_EXCEPTION") {
      console.error(messageWrapper.message);

    }

  }

  gotoInventory() {
    this.navCtrl.push(InventoryPage);
  }

  ionViewWillLeave() {

  }

  exitMap() {
    console.log("will leave map.");
    this.connectionService.stopConnection();
    this.geoWatch.unsubscribe();
    this.navCtrl.pop();
    for (let obj of this.circles) {
      obj.remove();
    }
  }



  loadMap() {

    this.geoWatch = Geolocation.watchPosition()/*.timeout(5000, console.log("timed out"))*/.subscribe((data) => {
      let position: CameraPosition = {
        target: new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude),
        zoom: 18,
        tilt: 67,
        bearing: 314
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
        if (areaBound.bounds.contains(new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude))) {
          this.currentLocationObject = areaBound.object;
          switch (areaBound.type) {
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
      'styles': this.mapStyles,
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
        this.market = market;
        this.boundsArray.push(new AreaBounds(market, new GoogleMapsLatLngBounds(poly), "MARKET"));
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
        let point = new GoogleMapsLatLng(bank.point.latitude, bank.point.longitude);
        this.boundsArray.push(new AreaBounds(bank, this.circletoBounds(point, this.circleRadius), "BANK"));
        this.bank = bank; //todo remove?
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
        this.demoShop = tradePost;
        this.map.addCircle({
          center: point,
          radius: this.circleRadius,
          strokeColor: this.tradePostColor,
          strokeWidth: 5,
          fillColor: this.tradePostColor
        });
      }

      for (let team of this.game.teams) {
        console.log("team");
        console.log(team);
        this.teamColor.push(team.customColor);
        for (let key in team.players) {
          if (team.players.hasOwnProperty(key)) {

            if (team.players[key].clientID === this.connectionService.clientID) {
              this.player.team = team;
              let point = team.districts[0].points[team.districts[0].points.length - 1];
              let treasureLoc = new GoogleMapsLatLng(point.latitude, point.longitude);
              this.currentLocationObject = this.player.team; //todo remove this is for testing
              this.myTeam = this.player.team;
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

  public circletoBounds(center: GoogleMapsLatLng, radius: number) { //todo collapse to no variables
    let radiusEarth = 6378000;
    let SWlat = center.lat + (-radius / radiusEarth) * (180 / Math.PI);
    let SWlng = center.lng + (-radius / radiusEarth) * (180 / Math.PI) / Math.cos(center.lat * Math.PI / 180);
    let SWpoint = new GoogleMapsLatLng(SWlat, SWlng);
    let NElat = center.lat + (radius / radiusEarth) * (180 / Math.PI);
    let NElng = center.lng + (radius / radiusEarth) * (180 / Math.PI) / Math.cos(center.lat * Math.PI / 180);
    let NEpoint = new GoogleMapsLatLng(NElat, NElng);
    return new GoogleMapsLatLngBounds([SWpoint, NEpoint]);
  }

  public gotoBank() {
    this.navCtrl.push(BankPage, this.bank);
  }

  public gotoMarket(){
    this.navCtrl.push(MarketPage,this.market);
  }


  public collectMoney() {
    this.navCtrl.push(CollectMoneyPage, this.myTeam); //todo verander naar currentlocation
  }

  public gotoShop() {
    //this.navCtrl.push(ShopPage,this.currentLocationObject);
    this.navCtrl.push(ShopPage, this.demoShop);
  }


}

