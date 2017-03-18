import {Component, Input} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
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

  private listedGames:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public connectionService:ConnectionService,
              public alertCtrl: AlertController,
              public loadingCtrl:LoadingController
  ) {
    this.connectionService.getStagedGames().subscribe((data) => {
      console.log(data);
      this.listedGames = data;
      this.listedGames.sort((g1,g2) => {
        console.log("sorting");
        if(g1.name < g2.name){
          return 1;
        }else{
          return -1;
        }
      })
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
    let loading = this.loadingCtrl.create({});
    loading.setContent("Even geduld a.u.b. ..");
    loading.present();
    console.log("trying to refresh page!");
    this.connectionService.getStagedGames().subscribe(data => {
      console.log("page refreshed");
      this.listedGames = data;
      loading.dismiss();
    })
  }

  entergame(id:string){
    console.log("tried to enter game: " + id);
    let prompt = this.alertCtrl.create({
      title: "Geef het passwoord in.",
      inputs : [
        {
        name: "Password",
        placeholder: "Passwoord"
      }
      ],
      buttons: [
        {
          text: 'Terug',
          handler: data => {
            console.log("cancel clicked")
          }
        },
        {
          text: "Ok",
          handler: data => {

            console.log("Ok clicked");
            this.connectionService.registerToGame(id, this.navParams.data.playerName, data.Password).subscribe(data => {
              console.log(data);
                this.navCtrl.push(LobbyPage,data);
            }, error => {
              let errorprompt = this.alertCtrl.create();
              console.log(error);
              switch (error.status){
                case 401: //wrong password
                  errorprompt.setTitle("Verkeerd passwoord!")
                  errorprompt.setMessage("Je hebt een verkeerd passwoord ingegeven, probeer opnieuw");
                  break;
                case 409: //already registered (shouldn't be able to happen? so unregister call when it does? idk)
                  errorprompt.setTitle("Al geregistreerd!");
                errorprompt.setMessage("Je bent al geregistreerd en je kan geen twee keer in hetzelfde spel geregistreerd worden!");
                  break;
                case 422: //can't process json
                  errorprompt.setTitle("Er ging iets mis.")
                  errorprompt.setMessage("Er ging iets mis, probeer nog eens");
                  break;
                case 500: //
                  errorprompt.setTitle("Er ging iets mis.");
                errorprompt.setMessage("Er ging iets mis, probeer nog eens");
                  break;
              }
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
