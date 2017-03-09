import {Component, Input} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ConnectionService} from "../../providers/connection-service";
import {MapPage} from "../map/map";
import {LobbyPage} from "../lobby/lobby";

/*
  Generated class for the ServerList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-server-list',
  templateUrl: 'server-list.html',
})
export class ServerListPage {

  //todo refeshknop!
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

  ionViewWillLeave(){
    console.log("about to leave the server list page");

  }

  refreshList(){

    this.connectionService.getStagedGames().subscribe(data => {
      console.log("page refreshed");
      this.listedGames = data;
    })
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
                this.navCtrl.push(LobbyPage,[data,id]); //todo lobby page
            }, error => {
              let errorprompt = this.alertCtrl.create();
              errorprompt.setTitle("Something went wrong!");
              errorprompt.setMessage(error);

              errorprompt.present();
            });
          }
        }
      ]
    });
    prompt.present();
    //this.connectionService.registerToGame(id, this.navParams.data.playerName,this.password);
  }

}
