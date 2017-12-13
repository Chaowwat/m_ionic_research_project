
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { AppList } from '../../pages/AppList/AppList';
import { HomePage } from '../../pages/Home/Home';
import { LocationCheck } from '../../pages/locationCheck/locationCheck';
import { Gridlayout } from '../../pages/Gridlayout/Gridlayout';
import {AboutPage} from "../../pages/about/about";

@Component({
  selector: 'page-AppMenu',
  templateUrl: 'AppMenu.html'
})
export class AppMenu {
  //'myNav'
  @ViewChild(Nav) nav: Nav;

  rootPageHome: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    
     this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'AppList', component: AppList },
      { title: 'LocationCheck', component: LocationCheck },
      { title: 'Gridlayout', component: Gridlayout },
      {title : 'AboutPage',component:AboutPage}
    ];

  }


  openPage(page) {
    console.log('OpenPage : '+page.component);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 

}
