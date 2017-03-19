import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {
  GoogleMap, GoogleMapsLatLng, GoogleMapsEvent, Geolocation, CameraPosition, GoogleMapsPolygon, GoogleMapsLatLngBounds,
  GoogleMapsGroundOverlay, GoogleMapsCircle, Toast, GoogleMapsMarkerOptions, GoogleMapsMarkerIcon
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
import {DistrictWrapper} from "../../domain/DistrictWrapper";
import {GameOverPage} from "../game-over/game-over";
import {TradePostWrapper} from "../../domain/TradePostWrapper";
import {CapitalWrapper} from "../../domain/CapitalWrapper";

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

  private marketColor: string = "#0000FF88";
  private neutralColor: string = "#FFFFFF88";
  private districtCapitalColor:string = "#00FF00";
  private circleColor: string = "#00ffff";
  private bankColor: string = "#ffff00";
  private tradePostColor: string = "#5200f2";
  private usedTradePostColor:string="#ff0000";
  private enemyTreasuryColor: string = "#FF00FF";
  private cantUseColor:string="#888888";
  private strokeWidth: number = 5;
  private circleRadius: number = 20;
  private cirlceStrokeWidth: number = 1;
  private geoWatch: any;
  private boundsArray: Array<AreaBounds> = [];
  private circles: Array<any> = [];
  private districts : Array<DistrictWrapper> = [];
  private tradePosts:Array<TradePostWrapper> = [];
  private districtCapitals:Array<CapitalWrapper> = [];
  private taggedByTeams:Array<string>= [];
  private currentDistrict:any;

  private game: Game;
  private bank: any;
  private myTeam: any;
  private demoShop: any;
  private demoEnemyTreasury: any;
  private testDistrict:any;
  private market:any;
  private teams:Array<any>;
  private winningTeam:string;
  private taggable:Array<string>;
  private currentLocation:GoogleMapsLatLng;

  private inMarket: boolean;
  private inDistrictCapital: boolean;
  private inShop: boolean;
  private inBank: boolean;
  private inTreasury: boolean;
  private inEnemyTreasury:boolean;
  private taggingAllowed:boolean;
  private canTag:boolean;
  private taggableTargets:boolean;

  private currentLocationObject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform, public  connectionService: ConnectionService
    , public alertCtrl: AlertController, public player: Player,) {
    platform.ready().then(() => {
      this.loadMap();
    });
    platform.registerBackButtonAction(() => {console.log("hardware backbutton pressed")});
    this.connectionService.addMessageHandler(message => this.handleSocketMessage(message, this));
    console.log(navParams);
    this.game = navParams.data;
    console.log(this.game);
    this.player.reset();
    this.districts = [];
    this.teams = [];
    this.boundsArray = [];
    this.tradePosts = [];
    this.taggedByTeams = [];
  }

  reColorTaggedDistricts(){
    for (let wrapper of this.districts) {
      for (let team of this.game.teams) {
        if (this.taggedByTeams.indexOf(team.teamName) != -1) {
          for (let district of team.districts) {
            if (district.id == wrapper.district.id) {
              wrapper.poly.setFillColor(this.cantUseColor);
            }
          }
        }
      }
    }
  }

  handleSocketMessage(message, self) {
    let messageWrapper: MessageWrapper = JSON.parse(message.data);
    console.log("message received");
    console.log(messageWrapper);
    let notification:any;

    switch(messageWrapper.messageType){
      case "BULK_LOCATION":
        let bulklocations: any = JSON.parse(messageWrapper.message);
        for (let obj of self.circles) {
          obj.remove();
        }
        self.circles = [];
        this.taggable = [];
        for (let obj of bulklocations.locations) {
          console.log(obj);

          let point = new GoogleMapsLatLng(obj.location.lat, obj.location.lng);

          let isOnOurTeam:boolean;
          for (let player of this.player.team.players) { //todo needed?
            if(player.id === obj.key){
              isOnOurTeam = true;
            }
          }

          if(!isOnOurTeam && obj.taggable == true){
            this.taggable.push(obj.key);
          }

          self.map.addCircle({
            center: point ,
            radius: 2,
            strokeColor: "#000000",
            strokeWidth: 1,
            fillColor: self.player.team.customColor
          }).then((data) => {
            self.circles.push(data);
          });
        }
        if(this.taggable.length > 0){
          this.canTag = true;
        }else{
          this.canTag= false;
      }

        break;
      case "TEAM_NOTIFICATION" :
        notification = JSON.parse(messageWrapper.message);
        console.log(notification);
        console.log(this.player.team);
        self.player.team.districts = notification.districts;
        self.player.team.treasury = notification.treasury;
        self.player.team.bankAccount = notification.bankAccount;
        self.player.team.tradePosts = notification.tradeposts;
        console.log(self.player);
        console.log(this.tradePosts);

        for (let tradePostWrapper of this.tradePosts) {
          for (let usedTradePostId of self.player.team.tradePosts) {
            if(tradePostWrapper.tradePost.id === usedTradePostId){
              tradePostWrapper.used =true;
              tradePostWrapper.circle.setFillColor(this.usedTradePostColor);
              tradePostWrapper.circle.setStrokeColor(this.usedTradePostColor);
            }
          }
        }
        break;

      case "PLAYER_NOTIFICATION":
        notification = JSON.parse(messageWrapper.message);
        console.log(notification);
        self.player.carriedMoney = notification.money;
        self.player.legalItems =  notification.legalItems;
        self.player.illegalItems = notification.illegalItems;
        console.log(this.player.team);
        break;

      case "TAG_NOTIFICATION":
        notification = JSON.parse(messageWrapper.message);
        console.log(notification);

        if(notification.taggedTeamName != this.player.team.teamName){
          this.taggedByTeams.push(notification.taggedTeamName);
        }

        this.reColorTaggedDistricts();

        for (let team of this.game.teams) {
          if(this.taggedByTeams.indexOf(team.teamName) !=-1){
            for (let district of team.districts) {
              for (let capital of this.districtCapitals) {
                if(district.id == capital.district.id){
                  capital.canCapture = false;
              }
            }
          }
        }
        }
        console.log(this.taggedByTeams);
        console.log(this.districtCapitals);

        Toast.show("You got tagged by " + notification.taggedBy,"3000","center");

        break;

      case "DISTRICT_NOTIFICATION":
        notification = JSON.parse(messageWrapper.message);
        let color :string;
        console.log(notification);
        if(this.taggedByTeams.indexOf(notification.teamName) != -1){
          color = this.cantUseColor;
        }else{
          for (let team of this.game.teams) {
            if(team.teamName === notification.teamName){
              color = team.customColor+"88";
              team.districts.push({id:notification.districtId}); //todo zou bugs kunnen veroorzaken?
            }
          }
        }

        for (let wrapper of this.districts) {
          if(wrapper.district.id === notification.districtId){
            wrapper.poly.setFillColor(color);
            console.log("color changed")
          }

        }
        break;

      case "INFO_NOTIFICATION" :
        notification = JSON.parse(messageWrapper.message);
        console.log(notification);
        if(notification.gameEventType === "TREASURY_ROBBERY"){
          console.log("You're team got robbed!");
          let toastString:string;
          if(notification.by == this.player.team.teamName){
            toastString= "You're treasury got robbed!";
          }else{
            toastString= notification.by + "'s treasury got robbed!";
          }
          Toast.show(toastString,'5000','center').subscribe(toast => {
            console.log(toast);
          });

        }
        break;

      case "GAME_STOP":
        this.stopServices();
        this.navCtrl.push(GameOverPage,this.winningTeam);
        break;

      case "WINNING_TEAM":
        this.winningTeam = messageWrapper.message;
        break;

      case "TAG_PERMITTED":
        this.taggingAllowed =true;
        break;

      case "ERROR_EXCEPTION":
        console.error(messageWrapper.message);
        break;
    }

  }

  private rad(x) {
  return x * Math.PI / 180;
};

  private getDistance(p1:GoogleMapsLatLng, p2:GoogleMapsLatLng) {
  let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.rad(p2.lat - p1.lat);
    let dLong = this.rad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
  return d; // returns the distance in meter
};

  gotoInventory() {
    this.navCtrl.push(InventoryPage);
  }

  ionViewWillLeave() {

  }

  private stopServices(){
    console.log("will leave map.");
    this.connectionService.stopConnection();
    this.geoWatch.unsubscribe();
  }

  exitMap() {
   this.stopServices();
    this.navCtrl.pop();
    for (let obj of this.circles) {
      obj.remove();
    }
  }



  loadMap() {

    this.geoWatch = Geolocation.watchPosition({enableHighAccuracy:true,timeout: 5*1000,maximumAge:0}).subscribe((data) => {
      let position: CameraPosition = {
        target: new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude),
        zoom: 18,
        tilt: 67,
        bearing: 314
      };
      //this.map.moveCamera(position); //todo turn this back on for camera locking
      this.currentLocation = new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude); //todo refactor

      this.connectionService.sendLocationData(data.coords.latitude, data.coords.longitude);

      this.inMarket = false;
      this.inShop = false;
      this.inBank = false;
      this.inDistrictCapital = false;
      this.inTreasury = false;
      this.inEnemyTreasury =false;

      for (let wrapper of this.districts) {
          if(wrapper.bounds.contains(this.currentLocation)){
            this.currentDistrict = wrapper.district;
          }
      }

      for (let areaBound of this.boundsArray) {
        if (areaBound.bounds.contains(new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude))) {
          this.currentLocationObject = areaBound.object;
          switch (areaBound.type) {
            case "BANK":
              this.inBank = true;
              // console.log("is in bank");
              break;
            case "TRADE_POST" :
              this.inShop = !this.currentLocationObject.used; //todo untested?
              // console.log("is in tradepost " + this.currentLocationObject.used);
              break;
            case "MARKET" :
              this.inMarket = true;
              // console.log("is in market")
              break;
            case "TREASURY" :
              // console.log("inside a treasury");
              this.inTreasury = true;
              break;
            case "ENEMY_TREASURY":
              // console.log("inside enemy treasury");
              this.inEnemyTreasury = this.taggedByTeams.indexOf(this.currentLocationObject.teamName) == -1;
              break;
            case "DISTRICTCAPITAL":
              // console.log("in capital");
              this.inDistrictCapital = this.currentLocationObject.canCapture;
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

      let capitalDistrictId : Array<string> = [];

      for (let team of this.game.teams) {
        capitalDistrictId.push(team.districts[0].id);
        console.log("team");
        console.log(team);
        let inThisTeam:boolean = false;

        for (let key in team.players) {
          if (team.players.hasOwnProperty(key)) { //hacking for maps in typescript
            inThisTeam=true;
            if (team.players[key].clientID === this.connectionService.clientID) {
              this.player.team = team;
              if(this.player.team.tradePosts == null){ //prevent null from happening , this happened sometimes due to unknown reasons
                this.player.team.tradePosts = [];
              }
              let point = team.districts[0].points[team.districts[0].points.length - 1]; //get treasury of capital district
              let treasureLoc = new GoogleMapsLatLng(point.latitude, point.longitude);
              this.myTeam = this.player.team;
              console.log("your team found!")
              this.boundsArray.push(new AreaBounds(this.player.team, this.circletoBounds(treasureLoc, this.circleRadius), "TREASURY"));
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
        if(!inThisTeam){
          let point = team.districts[0].points[team.districts[0].points.length -1 ];
          let treasureLoc = new GoogleMapsLatLng(point.latitude,point.longitude);
          this.boundsArray.push(new AreaBounds(team,this.circletoBounds(treasureLoc,this.circleRadius),"ENEMY_TREASURY"));
          this.demoEnemyTreasury = team;
          console.log("enemytreasury found");
          this.map.addCircle({
            center:treasureLoc,
            radius:this.circleRadius,
            strokeColor:this.enemyTreasuryColor,
            strokeWidth:0,
            fillColor:this.enemyTreasuryColor
          })
        }
      }

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
          'strokeColor': this.neutralColor,
          'strokeWidth': this.strokeWidth,
          'fillColor': this.neutralColor,
          'visible': true
        }).then(data => {
          this.districts.push(new DistrictWrapper(district,data,true,new GoogleMapsLatLngBounds(poly)));
          for (let team of this.game.teams) { //todo refactor?
            for (let teamDistrict of team.districts) {
              if(teamDistrict.id === district.id){
                data.setFillColor(team.customColor + "88");
              }
            }
          }
        })
          .catch((error) => {
          console.log(error);
        });

        if(capitalDistrictId.indexOf(district.id) == -1){ //this district is not a capital district.
          let wrapper = new CapitalWrapper(district,true);
          this.testDistrict = wrapper;
          this.boundsArray.push(new AreaBounds(wrapper,this.circletoBounds(treasureLoc,this.circleRadius),"DISTRICTCAPITAL"));
          this.districtCapitals.push(wrapper);
          this.map.addCircle({
            center: treasureLoc,
            radius: this.circleRadius,
            strokeColor: this.districtCapitalColor,
            strokeWidth: this.cirlceStrokeWidth,
            fillColor: this.districtCapitalColor
          });
        }

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
          'strokeColor': this.marketColor,
          'strokeWidth': this.strokeWidth,
          'fillColor': this.marketColor,
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

        let customMarker = "img/BankMarker.png";

        let markerOptions : GoogleMapsMarkerOptions = {
            position: point,
            title: "Test",
            icon: customMarker
          };
        this.map.addMarker(markerOptions).then(data => {
          console.log(data);
        })
      }

      for (let tradePost of this.game.tradePosts) {
        let point = new GoogleMapsLatLng(tradePost.point.latitude, tradePost.point.longitude);

        this.map.addCircle({
          center: point,
          radius: this.circleRadius,
          strokeColor: this.tradePostColor,
          strokeWidth: 5,
          fillColor: this.tradePostColor
        }).then(data => {
          let tradePostWrapper = new TradePostWrapper(tradePost,data,false);
          this.tradePosts.push(tradePostWrapper);
          this.boundsArray.push(new AreaBounds(tradePostWrapper, this.circletoBounds(point, this.circleRadius), "TRADE_POST"));
          this.demoShop = tradePostWrapper;
        })
        ;
      }

    });
  }


  public circletoBounds(center: GoogleMapsLatLng, radius: number) {
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
    // this.navCtrl.push(BankPage, this.currentLocationObject);
  }


  public sellAll(){
    this.connectionService.sendTradePostAllSale(this.market.id);
  }


  public collectMoney() {
    this.navCtrl.push(CollectMoneyPage);
  }

  public gotoShop() {
    if(!this.demoShop.used) { //todo veranderen naar currenLocationObject
      //this.navCtrl.push(ShopPage,this.currentLocationObject.tradePost);
      this.navCtrl.push(ShopPage, this.demoShop.tradePost);
    }else{
      console.log("Can't use shop twice!")
    }
/*    console.log(this.currentLocationObject);
    if(!this.currentLocationObject.used){
      this.navCtrl.push(ShopPage,this.currentLocationObject.tradePost);
    }else{
      console.log("can't use shop twice!")
    }*/
  }

  public captureDistrict(){
    console.log(this.currentLocationObject);
    // this.connectionService.sendDistrictCaptured(this.currentLocationObject.district.id); //todo veranderen naar currentlocation
    this.connectionService.sendDistrictCaptured(this.testDistrict.district.id);
  }

  public robEnemyTreasury(){
    console.log(this.currentLocationObject);
    // this.connectionService.sendTreasuryRobbery(this.currentLocationObject.districts[0].id);
    console.log(this.demoEnemyTreasury);
    this.connectionService.sendTreasuryRobbery(this.demoEnemyTreasury.districts[0].id);
  }

  public tagPlayers(){
    console.log("tagging people!");
    console.log(this.taggable);
    this.connectionService.sendTagPlayers(this.taggable,this.player.team.districts[0].id);
    // this.connectionService.sendTagPlayers(this.taggable,this.currentDistrict.id);
  }


}

