import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, NavController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import {ServerListPage} from "../pages/server-list/server-list";
import {ShopPage} from "../pages/shop/shop";
import {Player} from "../providers/Player";


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Server List', component: ServerListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onServerListClicked(){
    console.log("serverlistclicked");
    this.openPage(this.pages[1]);
    this.rootPage.title = "Server List";
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(this.nav);
    this.nav.setRoot(page.component);
  }

}
