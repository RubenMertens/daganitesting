import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {LocationMessage} from "../domain/LocationMessage";
@Injectable()
export class ConnectionService {

  ws :any;

  private backEndAdress :string = "https://stniklaas-stadsspel.herokuapp.com/api/";
  //private backEndAdress:string ="https://localhost:8090/api/";

  constructor(public http: Http) {

  }

  connectToGame(gameId : string) : Observable<any> {
    let url : string = this.backEndAdress + "games/" + gameId;
    return this.http.get(url).map(this.extractData);

  }

  registerToGame(gameId: string) : Observable<any> {
    let url : string = this.backEndAdress+"games/" + gameId + "/register";
    return this.http.post(url,{clientID:1,name: "boooooooooooooobs",password:""});
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
    let message:LocationMessage = new LocationMessage("1","1",lat,lon);
    let test = JSON.stringify(message);
    this.ws.send(test);
  }

  getStagedGames(){
    let url :string = this.backEndAdress+"games/staged";
    return this.http.get(url).map(this.extractData);
  }

  setupTCPSocket(url:string){

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


}
