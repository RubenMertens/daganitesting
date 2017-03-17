import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {LocationMessage} from "../domain/LocationMessage";
import {MessageWrapper} from "../domain/MessageWrapper";
import {assetUrl} from "@angular/compiler/src/identifiers";
import {Device} from "ionic-native";
import {GameEventMessage} from "../domain/GameEventMessage";

@Injectable()
export class ConnectionService {

  ws :any;
  token:string;
  public clientID:string;
  public gameId:string;

  //private baseAdress :string = "https://stniklaas-stadsspel.herokuapp.com/api/";
  //private webSocketUrl:string = "ws://stniklaas-stadsspel.herokuapp.com/user";
  private webSocketUrl:string = "ws://10.134.229.38:8090/user";
  private baseAdress:string = "http://10.134.229.38:8090/api/";

  constructor(public http: Http) {
    this.clientID = Device.uuid;
    //this.clientID = Math.floor(Math.random()*1000000) +1 +"";
  }

  sendEventMessage(object:any){
    console.log("message send");
    console.log(object);
    let wrapper = new MessageWrapper("EVENT",this.token,JSON.stringify(object),this.gameId,this.clientID);
    this.ws.send(JSON.stringify(wrapper));
  }

  sendTreasuryCollect(moneyTransferred:number, tradePostId:string){
    let message = new GameEventMessage("TREASURY_WITHDRAWAL",[this.clientID],moneyTransferred,new Map(),tradePostId);
    this.sendEventMessage(message);
  }

  sendBankDeposit(moneyTrasferred:number, tradePostId:string){
    let message= new GameEventMessage("BANK_DEPOSIT",[this.clientID],moneyTrasferred,new Map(),tradePostId);
    this.sendEventMessage(message);
  }
  sendBankWithdrawal(moneyTransferred:number, tradePostId:string){
    let message = new GameEventMessage("BANK_WITHDRAWAL",[this.clientID],moneyTransferred,new Map(),tradePostId);
    this.sendEventMessage(message);
  }

  mapToObject(map:Map<any,any>){
    let object = {};
    map.forEach((value,key) => {
      object[key] = value;
    });

    return object;
  }

  sendTagPlayers(targets:Array<string>){
    let message = new GameEventMessage("PLAYER_TAGGED",targets,0,{},"");
    this.sendEventMessage(message);
  }

  sendTreasuryRobbery(id:string){
    let message = new GameEventMessage("TREASURY_ROBBERY",[this.clientID],0,{},id);
    this.sendEventMessage(message);
  }

  sendDistrictCaptured(districtId:string){
    let message = new GameEventMessage("DISTRICT_CONQUERED",[this.clientID],0,{},districtId);
    this.sendEventMessage(message);
  }

  sendTradePostLegalPurchase(moneyTransferred:number, items:Map<string,number>, tradePostId:string){
    let message = new GameEventMessage("TRADEPOST_LEGAL_PURCHASE",[this.clientID],moneyTransferred,this.mapToObject(items),tradePostId);
    this.sendEventMessage(message);
  }

  sendTradePostIllegalPurchase(moneyTransferred:number, items:Map<string,number>,tradePostId:string){
    let message= new GameEventMessage("TRADEPOST_ILLEGAL_PURCHASE",[this.clientID],moneyTransferred,this.mapToObject(items),tradePostId);
    this.sendEventMessage(message);
  }

  sendTradePostAllSale(tradePostId:string){
    let message = new GameEventMessage("TRADEPOST_ALL_SALE",[this.clientID],0,{},tradePostId);
    this.sendEventMessage(message);
  }


  registerToGame(gameId: string, playerName:string, password:string) : Observable<any> {
    let url : string = this.baseAdress+"games/" + gameId + "/register";
    this.gameId = gameId;
    console.log("registering cliend id : " + this.clientID + "to " + gameId);
    return this.http.post(url,{clientID:this.clientID,name: playerName,password:password}).map(this.extractData);
  }

  unregisterFromGame(){
    let url:string = this.baseAdress+"games/" + this.gameId + "/unregister/" + this.clientID;
    console.log("unregistering "  + this.clientID+ " from game " + this.gameId);
    return this.http.post(url,{}).map(this.extractData);
  }

  sendLocationData(lat:number, lon:number){
    if(this.ws != null && this.ws.readyState === this.ws.OPEN ){
      let message: LocationMessage = new LocationMessage(lat, lon);
      let messageString = JSON.stringify(message);
      let messageWrapper: MessageWrapper = new MessageWrapper("LOCATION",this.token, messageString , this.gameId,this.clientID +"");
      let messageWrapperString = JSON.stringify(messageWrapper);
      this.ws.send(messageWrapperString);

    }else{
      console.log("tried to send location : connection is not open")
    }
  }

  sendHeartBeat(){
    if(this.ws != null && this.ws.readyState === this.ws.OPEN){
      let message : MessageWrapper = new MessageWrapper("HEARTBEAT",this.token,"",this.gameId,this.clientID);
      console.log("heartbeat message");
      console.log(message);
      this.ws.send(JSON.stringify(message));
    }else{
      console.error("Tried to send location but connection didn't exist or was not open!")
    }
  }

  getStagedGames(){
    let url :string = this.baseAdress+"games/staged";
    console.log("url for staged games : " + url);
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  setupTCPSocket(token:string){
    this.token =token;
    console.log("trying to connect to websocket url " + this.webSocketUrl);
    this.ws = new WebSocket(this.webSocketUrl);
    this.ws.onopen = function () {
      console.log("connection made");
     /* let json : string = JSON.stringify({message : "kakaka"});
      this.send(json);*/

    };

    this.ws.onmessage = function (event) {
      console.log("received : " + event.data)

         }

    this.ws.onclose = function(event){
      console.log("websocket closed");
      console.error(event);
    }

    this.ws.onerror = function(error){
      console.error(error);
    }
  }

  addMessageHandler(handler:any){
    console.log("Handler changed");
    this.ws.onmessage = handler;
}

  getAreaLocations() : Observable<any>{
    let url:string = this.baseAdress + "locations/arealocations";
    return this.http.get(url).map(this.extractData);
  }

  getPointLocations() : Observable<any>{
    let url: string = this.baseAdress + "locations/pointlocations";
    return this.http.get(url).map(this.extractData)
  }

  getGame() : Observable<any>{
    let url:string = this.baseAdress + "games/" + this.gameId;
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
