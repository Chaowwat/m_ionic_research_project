import { HttpProviderTestProvider } from './../providers/http-provider-test/http-provider-test';
import { Component , ViewChild } from '@angular/core';
// import { Platform , Nav } from 'ionic-angular';
import { Platform , NavController  } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LogonPage } from '../pages/logonPage/logonPage';
import { AppMenu } from '../pages/AppMenu/AppMenu';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  //@ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') nav: NavController;
  //rootPage: any = LogonPage;
  rootPage: any;
  arrayProvince = [];

  constructor(public platform: Platform,public alertCtrl: AlertController,public statusBar: StatusBar,public splashScreen: SplashScreen,public http:Http,public HttpProviderTestProvider:HttpProviderTestProvider) {
    this.initializeApp();
  }

  initializeApp() {
    
    console.log("this is initializeApp");

    this.platform.ready().then(() => {
      console.log("this.platform.ready.then");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      if ( this.platform.is('ios') || this.platform.is('android') || this.platform.is('windows') ) {
        //  console.log("version check");
        //this.checkVersion();
        //this.nav.setRoot(LogonPage);
        
        this.nav.setRoot(AppMenu);
      }else{
        console.log("skip the version check");
        //this.nav.setRoot(LogonPage);
        //this.getProvince();
        this.nav.setRoot(AppMenu);
      }
      

      
    });
  }

  getProvince(){
    this.HttpProviderTestProvider.getHttp("getProvince").subscribe(data => {

      // this.arrayProvince = data;
      // console.log(this.arrayProvince);

      
      this.arrayProvince = data.responseData;
      this.arrayProvince.sort((a, b) => a.p.localeCompare(b.p));
      console.log("this.arrayProvince sorted : "+this.arrayProvince);
    
      },
    err => {
      console.log("ERROR!: ", err);
      this.presentAlert(err);
    });

  }
  // checkVersion(){

  //   console.log("this.checkVersion");
  //   this.splashScreen.show();

  //    this.HttpProviderTestProvider.getHttp("version").subscribe(data => {
              
  //             console.log(data.version);
  //             console.log(data.package);

  //             let alert = this.alertCtrl.create({

  //               title: 'Alert Complete',
  //               message: JSON.stringify(data),
  //               buttons: [ {
  //                   text: 'Ok',
  //                   handler: () => {
  //                     console.log('Ok clicked');   
                      
  //                     this.HttpProviderTestProvider.setHeaders({key : "mymathheader",value: "headerAddfromCheckVersion"});            
                      
  //                     this.nav.setRoot(LogonPage);
  //                   }
  //                 },{
  //                   text: 'Cancel',
  //                   handler: () => {
  //                     console.log('Cancel clicked');      
  //                     this.nav.setRoot(LogonPage);
  //                   }
  //                 }
                  
  //                 ]
  //             });

  //             alert.present();
              
  //           },
  //           err => {
  //             console.log("ERROR!: ", err);
  //             this.presentAlert(err);
  //           }
  //     );      
  
  // }

  presentAlert(dataParam) {
   
    let dataParamString : string = JSON.stringify(dataParam);

        let alert = this.alertCtrl.create({

          title: 'Alert Failed',
          message: dataParamString,
          buttons: [ {
              text: 'Ok',
              handler: () => {
                console.log('Ok clicked');               
                //Splashscreen.hide();
                //this.openPageSetRoot(LogonPage)
                this.nav.setRoot(LogonPage);
                //this.nav.setRoot(AppMenu);
              }
            },{
              text: 'Cancel',
              handler: () => {
                console.log('Cancel clicked');      
                this.nav.setRoot(LogonPage);
                //Splashscreen.hide();
                //this.openPageSetRoot(LogonPage)
                //this.nav.setRoot(LogonPage);
                //this.nav.setRoot(AppMenu);
              }
            }
            
            ]
        });

        alert.present();
  }

  // openPageSetRoot(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page);
  // }

}
