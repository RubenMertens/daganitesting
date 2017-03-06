import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {LocationMessage} from "../domain/LocationMessage";
import {MessageWrapper} from "../domain/MessageWrapper";
import {assetUrl} from "@angular/compiler/src/identifiers";

@Injectable()
export class ConnectionService {

  ws :any;
  token:string; //todo clean this up
  private clientID:number;
  private gameId:string;

  private baseAdress :string = "https://stniklaas-stadsspel.herokuapp.com/api/";
  //private baseAdress:string = "http://192.168.0.250:8090/api/";
  //private backEndAdress:string= "http://localhost:8090/api/";

  constructor(public http: Http) {
    this.clientID = Math.floor(Math.random() * 1000000) + 1;
  }

  connectToGame(gameId : string) : Observable<any> {
    let url : string = this.baseAdress + "games/" + gameId;
    return this.http.get(url).map(this.extractData);

  }

  registerToGame(gameId: string, playerName:string, password:string) : Observable<any> {
    let url : string = this.baseAdress+"games/" + gameId + "/register";
    //return this.http.post(url,{clientID:1,name: "boooooooooooooobs",password:""}).map(this.extractData);
    return this.http.post(url,{clientID:this.clientID,name: playerName,password:password}).map(this.extractData);
  }


/*
  Request body
  private String clientID;
  private String name;
  private String password;*/

  findSocketGate() {
    let url : string = this.baseAdress + "games"
  }

  sendLocationData(lat:number, lon:number){
    if(this.ws != null && this.ws.readyState === this.ws.OPEN ){

      let message: LocationMessage = new LocationMessage(lat, lon);
      let messageString = JSON.stringify(message);

      let messageWrapper: MessageWrapper = new MessageWrapper("LOCATION",this.token, messageString , this.gameId,this.clientID +"");
      let messageWrapperString = JSON.stringify(messageWrapper);

      this.ws.send(messageWrapperString);
      console.log("message send : ");
      console.log(messageWrapperString);

    }else{
      console.log("tried to send location : connection is not open")
    }
  }

  getStagedGames(){
    let url :string = this.baseAdress+"games/staged";
    console.log("url for staged games : " + url);
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  setupTCPSocket(url:string, token:string, gameId:string){
    this.token =token;
    this.gameId = gameId;
    console.log("trying to connect to websocket url " + url);
    this.ws = new WebSocket(url);
    this.ws.onopen = function () {
      console.log("connection made");
     /* let json : string = JSON.stringify({message : "kakaka"});
      this.send(json);*/

    };

    this.ws.onmessage = function (event) {
      console.log("received : " + event.data)
    }
  }

  getAreaLocations() : Observable<any>{
    let url:string = this.baseAdress + "locations/arealocations";
    return this.http.get(url).map(this.extractData);
  }



  private extractData(res : Response){
    let body = res.json();
    console.log(res.status);
    console.log("body : ");
    console.log(body);
    return body;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.text() || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  stopConnection(){
    this.ws.close();
  }




}
