import {Component, Input} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ConnectionService} from "../../providers/connection-service";
import {MapPage} from "../map/map";

/*
  Generated class for the ServerList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-server-list',
  templateUrl: 'server-list.html',
  providers:[ConnectionService]
})
export class ServerListPage {

  private listedGames:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public connectionService:ConnectionService,
              public alertCtrl: AlertController
  ) {
    this.connectionService.getStagedGames().subscribe((data) => {
      console.log(data);
      this.listedGames = data;
      //this.listedGames = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerListPage');
    console.log(this.navParams);
  }

  entergame(id:string){
    console.log("tried to enter game: " + id);
    let prompt = this.alertCtrl.create({
      title: "Type in password",
      inputs : [
        {
        name: "Password",
        placeholder: "Password"
      }
      ],
      buttons: [
        {
          text: 'cancel',
          handler: data => {
            console.log("cancel clicked")
          }
        },
        {
          text: "Ok",
          handler: data => {
            console.log("Ok clicked");
            console.log(data);
            this.connectionService.registerToGame(id, this.navParams.data.playerName, data.Password).subscribe(data => {
                this.navCtrl.push(MapPage,data); //todo lobby page
            });
          }
        }
      ]
    });
    prompt.present();
    //this.connectionService.registerToGame(id, this.navParams.data.playerName,this.password);
  }

}
