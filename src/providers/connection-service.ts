import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {LocationMessage} from "../domain/LocationMessage";
@Injectable()
export class ConnectionService {

  ws :any;

  private backEndAdress :string = "https://stniklaas-stadsspel.herokuapp.com/api/";

  constructor(public http: Http) {

  }

  connectToGame(gameId : string) : Observable<any> {
    let url : string = this.backEndAdress + "games/" + gameId;
    return this.http.get(url).map(this.extractData);

  }

  findSocketGate() {
    let url : string = this.backEndAdress + "games"
  }

  sendLocationData(lat:number, lon:number){
    let message:LocationMessage = new LocationMessage("1","1",lat,lon);
    let test = JSON.stringify(message);
    this.ws.send(test);
  }

  setupTCPSocket(){

    this.ws = new WebSocket("ws://echo.websocket.org");
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
    return body;
  }


}
