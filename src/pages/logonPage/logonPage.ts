
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController , LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { AppMenu } from '../../pages/AppMenu/AppMenu';
import { LogonOtpPage } from '../../pages/logonOtpPage/logonOtpPage';

import { HttpProviderTestProvider } from './../../providers/http-provider-test/http-provider-test';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-logonPage',
  templateUrl: 'logonPage.html'
})


export class LogonPage {

  private loginFormInput : FormGroup;
  private loading : any;

  constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                  public formBuilder: FormBuilder,
                    public loadingCtrl: LoadingController,
                      public http:Http,public HttpProviderTestProvider:HttpProviderTestProvider) {

    this.loginFormInput = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
    });

  }

   logForm(){
    console.log(this.loginFormInput.value);

    console.log(this.HttpProviderTestProvider.getHeadersString());
    console.log(this.HttpProviderTestProvider.getHeaders().get("ApiKey"));

    this.presentLoadingDefault(this.loginFormInput.value.username,this.loginFormInput.value.password);

    
    //this.navCtrl.setRoot(AppMenu, {}, {animate: true, direction: 'forward'});
    //this.navCtrl.setRoot(Page1);

   }

   presentLoadingDefault(usernameInput:string,passwordInput:string) {

       this.loading = this.loadingCtrl.create({
          spinner: 'crescent',
          content: 'Please wait...'
        });

      this.loading.present();

      let bodyJson : string = JSON.stringify({
        type : "authentication",
        username: usernameInput,
        password: passwordInput });

      //   this.HttpProviderTestProvider.postHttp("session",bodyJson).subscribe(data => {

      //           console.log(data);
      //           this.HttpProviderTestProvider.setHeaders({key : "ServiceToken",value: data.ServiceToken});            
      //           this.gotoOtp(JSON.parse(bodyJson),data.ServiceToken);


      //   },
      //       err => {
      //         console.log("ERROR!: ", err);
      //         this.presentAlert(err);
      //       }
      // );  


      // let headers = new Headers();
      //   headers.append("ApiKey","a00049ba79152D03380c34652f2cb6121324AF");
      //   headers.append("Content-Type","application/json");
      //   //headers.append("Access-Control-Allow-Origin","*");
        
      // let options = new RequestOptions({ headers: headers });

      // //let urlApi = "/session";
      // //http://staging-emmobile.ais.co.th/api/session
      // //https://emmobile.ais.co.th/api/session

      // //let urlApi = "https://emmobile.ais.co.th/api/session";
      // let urlApi = "http://staging-emmobile.ais.co.th/api/session";

      // this.http.post(urlApi,bodyJson,options).map(res => res.json())
      //   .subscribe(
      //       data => {
      //         console.log(data);
      //         this.gotoOtp(JSON.parse(bodyJson),data.ServiceToken);
      //       },
      //       err => {
      //         console.log("ERROR!: ", err);
      //         this.presentAlert(err);
      //       }
      //   );


     
      
      
      
    }


    gotoOtp(ObjJson,dataParam){
      
      setTimeout(() => {
        this.loading.dismiss();
        
        this.navCtrl.setRoot(LogonOtpPage, {userVal:ObjJson.username,passwordVal:ObjJson.password,dataServiceToken:dataParam} , {animate: true, direction: 'forward'});
      }, 2500);
    }

    presentAlert(dataParam) {

    this.loading.dismiss();
    let dataParamString : string = JSON.stringify(dataParam);

        let alert = this.alertCtrl.create({

          title: 'Alert Error',
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
