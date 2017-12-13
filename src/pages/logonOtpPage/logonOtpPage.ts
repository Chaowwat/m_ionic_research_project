import { Http, Headers,RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { AlertController , LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppMenu } from '../../pages/AppMenu/AppMenu';

import { HttpProviderTestProvider } from './../../providers/http-provider-test/http-provider-test';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-logonOtpPage',
  templateUrl: 'logonOtpPage.html'
})
export class LogonOtpPage {


  loginOtpFormInput : FormGroup;
  public userValLogin:String;
  public passValLogin:String;
  public ServiceTokenLogin:String;
  private loading : any;

  constructor(public navCtrl: NavController,
                public params:NavParams,
                  private alertCtrl: AlertController, 
                    formBuilder: FormBuilder,
                      public loadingCtrl: LoadingController,
                        public http:Http,
                          public HttpProviderTestProvider:HttpProviderTestProvider,
                           public storage : Storage) {

    this.userValLogin = params.get('userVal');
    this.passValLogin = params.get('passwordVal');
    this.ServiceTokenLogin =  params.get('dataServiceToken');

    this.loginOtpFormInput = formBuilder.group({
       OTP: ['', Validators.compose([Validators.maxLength(4), Validators.pattern('^[0-9]{4}$'), Validators.required])]
    });

    

  }


   logOtpForm(){

    

      this.loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Please wait...'
      });

      this.loading.present();

      let bodyJson : string = JSON.stringify({
        type : "confirmotp",
        ServiceToken : this.ServiceTokenLogin,
        username: this.userValLogin,
        password: this.loginOtpFormInput.value.OTP });

      //       this.HttpProviderTestProvider.postHttp("session",bodyJson).subscribe(data => {

      //             console.log(data);

      //             this.loading.dismiss();

      //             let alert = this.alertCtrl.create({

      //             title: 'Go Next logOtpForm ',
      //             message: 'logOtpForm logOtpForm : '+  JSON.stringify(data),
      //             buttons: [ {
      //                 text: 'Ok',
      //                 handler: () => {
      //                   console.log('Ok clicked');               

      //                   this.storage.set('apple', '3.995654544');
      //                   this.storage.set('banana', '4.505564565');

                                                    
      //                   this.storage.set('X-Token', JSON.stringify(data));
      //                   this.storage.set('Username', this.userValLogin);

      //                   this.navCtrl.setRoot(AppMenu, {animate: true, direction: 'forward'});
      //                 }
      //               },{
      //                 text: 'Cancel',
      //                 handler: () => {
      //                   console.log('Cancel clicked');               
                    
      //                 }
      //               }
                    
      //               ]
      //           });

      //           alert.present();


      //   },
      //       err => {
      //         console.log("ERROR!: ", err);
      //         this.presentAlert(err);
              
      //       }
      // ); 
  
    //this.presentLoadingDefault()

    //this.navCtrl.setRoot(AppMenu, {}, {animate: true, direction: 'forward'});
    //this.navCtrl.setRoot(Page1);

  }

   presentAlert(dataParam) {

    this.loading.dismiss();
    let dataParamString : string = JSON.stringify(dataParam);

        let alert = this.alertCtrl.create({

          title: 'Alert ',
          message: dataParamString,
          buttons: [ {
              text: 'Ok',
              handler: () => {
                console.log('Ok clicked');               
                //Splashscreen.hide();
                //this.openPageSetRoot(LogonPage)
                
                //this.nav.setRoot(AppMenu);
              }
            },{
              text: 'Cancel',
              handler: () => {
                console.log('Cancel clicked');      
                
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


}
