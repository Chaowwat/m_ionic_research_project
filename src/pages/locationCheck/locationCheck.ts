import { Component } from '@angular/core';
import { NavController, Platform ,AlertController , LoadingController , Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-locationCheck',
  templateUrl: 'locationCheck.html'
})
export class LocationCheck {
  
  private loading:Loading;
  private currentLat:number;
  private currentLong:number;

  //private resultKM:number;

  // public AIS2Latlong : {latitude:13.786382,longitude:100.546593};
  // public BTSMochitLatlong : {latitude:13.802437,longitude:100.553736};

  //currentLatLongObj:any;
  //LatLongArray: Array<{attempt: number, responseObj: Geolocation}>;

  constructor(public navCtrl: NavController,
                private alertCtrl: AlertController,
                    private platform: Platform,
                        private geolocation: Geolocation,
                            private loadingCtrl: LoadingController) {
    this.currentLat = 0.0;
    this.currentLong = 0.0;

    // this.AIS2Latlong.latitude = 13.786382;
    // this.AIS2Latlong.longitude = 100.546593;

    // this.BTSMochitLatlong.latitude = 13.802437;
    // this.BTSMochitLatlong.longitude = 100.553736;

    

  }


  checkinBtnLick(){
      console.log("checkinBtnLick");

      this.presentLoadingDefault();

      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.DispresentLoadingDefault();
        console.log('response Object Lat Long', resp);

        this.currentLat = resp.coords.latitude;
        this.currentLong = resp.coords.longitude;

        this.displayAlert("your location Checkin is","Lat : "+this.currentLat+"\n Long : "+this.currentLong);

        // this.resultKM = this.getDistanceFromLatLonInKm(this.currentLat, this.currentLong ,13.786382, 100.546593);

        // if(this.resultKM > 0.50){
        //     this.displayAlert("Sorry your transaction is failed","Your too far from checkpoint");
        // }else{
        //     this.displayAlert("Transaction Completed","Your already checked distance is "+this.resultKM.toFixed(2)+" Km");
        // }

        // console.log("Test Calculator KM Distance");
        // console.log(this.resultKM.toFixed(2));
        

      }).catch((error) => {

        this.DispresentLoadingDefault();
        console.log('Error getting location', error);
      });
  }


  checkoutBtnClick(){
      console.log("checkoutBtnClick");

      this.presentLoadingDefault();

      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.DispresentLoadingDefault();
        console.log('response Object Lat Long', resp);

        this.currentLat = resp.coords.latitude;
        this.currentLong = resp.coords.longitude;

        this.displayAlert("your location Checkin Out","Lat : "+this.currentLat+"\n Long : "+this.currentLong);

        

      }).catch((error) => {

        this.DispresentLoadingDefault();
        console.log('Error getting location', error);
      });
  }



  
  presentLoadingDefault() {

    this.loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Please wait...'
    });

    this.loading.present();
  }

  DispresentLoadingDefault() {
     this.loading.dismiss();
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) : number {

        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;

  };

  deg2rad(deg) : number {
    return deg * (Math.PI/180)
  };   

  displayAlert(titleInput:string,msgInput:string){

    let alert = this.alertCtrl.create({

          title: titleInput,
          message: msgInput,
          buttons: [ {
              text: 'Ok',
              handler: () => {
                console.log('Ok clicked');
              }
            },{
              text: 'Cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }]
        });

    alert.present();
  }



    // let alert = this.alertCtrl.create({

    //       title: 'checkVersion SplashScreen',
    //       message: 'SplashScreen Timeout',
    //       buttons: [ {
    //           text: 'Dismiss',
    //           role: 'dismiss',
    //           handler: () => {
    //             console.log('Dismiss clicked');
                
    //             //Splashscreen.hide();
    //             //this.openPageSetRoot(LogonPage)
    //             //this.nav.setRoot(LogonPage);

    //           }
    //         }]
    //     });

    // alert.present();



}
