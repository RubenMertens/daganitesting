import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {LocationMessage} from "../domain/LocationMessage";
import {MessageWrapper} from "../domain/MessageWrapper";

@Injectable()
export class ConnectionService {

  ws :any;

  //private backEndAdress :string = "https://stniklaas-stadsspel.herokuapp.com/api/";

  private backEndAdress:string ="http://192.168.0.247:8090/api/";
  //private backEndAdress:string= "http://localhost:8090/api/";

  constructor(public http: Http) {

  }

  connectToGame(gameId : string) : Observable<any> {
    let url : string = this.backEndAdress + "games/" + gameId;
    return this.http.get(url).map(this.extractData);

  }

  registerToGame(gameId: string) : Observable<any> {
    let url : string = this.backEndAdress+"games/" + gameId + "/register";
    return this.http.post(url,{clientID:1,name: "boooooooooooooobs",password:""}).map(this.extractData);
  }
/*
  Request body
  private String clientID;
  private String name;
  private String password;*/

  findSocketGate() {
    let url : string = this.backEndAdress + "games"
  }

  sendLocationData(lat:number, lon:number){
    if(this.ws != null && this.ws.readyState === this.ws.OPEN ){

      let message: LocationMessage = new LocationMessage("1", "1", lat, lon);
      let messageString = JSON.stringify(message);

      let messageWrapper: MessageWrapper = new MessageWrapper("LOCATION", messageString);
      let messageWrapperString = JSON.stringify(messageWrapper);

      this.ws.send(messageWrapperString);
      console.log("message send : ");
      console.log(messageWrapperString);

    }else{
      console.log("tried to send location : connection is not open")
    }
  }

  getStagedGames(){
    let url :string = this.backEndAdress+"games/staged";
    console.log("url for staged games : " + url);
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  setupTCPSocket(url:string){
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


}
