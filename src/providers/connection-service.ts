import {Injectable, NgZone} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectionService {

  ws :any;

  private backEndAdress :string = "https://stniklaas-stadsspel.herokuapp.com/api/"

  constructor(public http: Http) {

  }

  connectToGame(gameId : string) : Observable<any> {
    let url : string = this.backEndAdress + "games/" + gameId;
    return this.http.get(url).map(this.extractData);

  }

  findSocketGate() {
    let url : string = this.backEndAdress + "games"
  }

  setupTCPSocket(){
    this.ws = new WebSocket("ws://hostname:port/websocket/path");
    this.ws.send()
  }



  private extractData(res : Response){
    let body = res.json();
    return body;
  }


}
