import { Component } from '@angular/core';
import { NavController, ActionSheetController , Platform , AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FingerprintAIO , FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { SpeechRecognition , SpeechRecognitionListeningOptionsAndroid , SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';
import { HttpProviderTestProvider } from './../../providers/http-provider-test/http-provider-test';
import {Http, Headers, RequestOptions}  from '@angular/http';
import * as StringSimilarity from 'string-similarity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {
  

    apple: any;
    banana: any;
    username: any;
    xtoken: any;
    elementArray:Array<Number>;
    fingerprintOption : FingerprintOptions;
    speechOptionAndroid : SpeechRecognitionListeningOptionsAndroid;
    speechOptioniOS : SpeechRecognitionListeningOptionsIOS;
    resultFinger : any;
    wfingerPrint : any;
    isenabled : any;
    resultAvailable : any;
    resultPermission : any;
    arrayProvince = [];
    speechList : Array<string> = [];
    exampleString : any;
    resultString : any;
    resultSimilar : number;
    
  constructor(public navCtrl: NavController,
                public actionSheetCtrl : ActionSheetController , 
                    public storage: Storage,
                    private fingerprint : FingerprintAIO,
                    private speechRecognition : SpeechRecognition,
                    private platform : Platform,
                    private alertCtrl: AlertController,
                    public HttpProviderTestProvider:HttpProviderTestProvider,
                    public http:Http) {

      this.elementArray = [1,2,3,4,5];

      this.fingerprintOption = {
        clientId : 'fingerprint-demo',
        clientSecret : 'password',
        disableBackup : true
      }

      this.speechOptionAndroid = {
        language : 'th-TH',
        matches : 10
      }

      this.speechOptioniOS = {
        language : 'th-TH',
        matches : 10
      }

      this.isenabled = true;
      this.exampleString = "สวัสดีครับ";
      //this.getProvince();

  }

  ionViewDidLoad(){
        
        this.banana = this.storage.get('banana');
        this.apple = this.storage.get('apple');

        this.username = this.storage.get('Username');
        this.xtoken = this.storage.get('X-Token');

        
        

  }

  setInStorage(){
       
  }
 

   presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          icon: 'md-trash',
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          icon: 'md-archive',
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          icon: 'create',
          text: 'Display',
          role: 'display',
          handler: () => {
            console.log('Display clicked');
          }
        },{
          icon: 'md-close',
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  

  listenForSpeech(){

    if (this.platform.is('android')){
      this.speechRecognition.startListening(this.speechOptionAndroid).subscribe(data => this.speechList = data, err => this.speechList = err);
    }else if(this.platform.is('ios')){
      this.speechRecognition.startListening(this.speechOptioniOS).subscribe(data => this.speechList = data, err => this.speechList = err);
    }else{
      this.speechRecognition.startListening().subscribe(data => this.speechList = data, err => this.speechList = err);
    }

    
  }

  checkCorrection(){
    console.log(this.speechList[0]+"  "+this.exampleString);

    const firstString = this.exampleString.trim();
    const secondString = this.speechList[0].trim();

    // const firstString = "สวัสดีครับ";
    // const secondString = "สวัสดีคับ";

    this.resultSimilar = StringSimilarity.compareTwoStrings(firstString,secondString);
    console.log("checkCorrection result is : "+this.resultSimilar);
    

  }


  async recognitionAvailable () : Promise<boolean> {
      const result = await this.speechRecognition.isRecognitionAvailable()
      this.resultAvailable = result.toString();
      return result;
  }

  async recognitionPermission () : Promise<void> {
    try{
      const result = await this.speechRecognition.requestPermission();
      this.resultPermission = result
    }catch (e) {
      this.resultPermission = e
    }
      
    return this.resultPermission;
  }
  

  getProvince(){
    this.HttpProviderTestProvider.getHttp("getProvince").subscribe(data => {
      
      this.arrayProvince = data.responseData;
      this.arrayProvince.sort((a, b) => a.p.localeCompare(b.p));
      console.log("this.arrayProvince sorted : "+this.arrayProvince);
    
      },
    err => {
      console.log("ERROR!: ", err);
    });

  }

  async showFingerPrintDiglaog(){
    try{

      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();

      console.log(available);

      if(available === "OK"){

        //this.isenabled = true;
        const result = await this.fingerprint.show(this.fingerprintOption);
        this.resultFinger = JSON.stringify(result)

                   let alert = this.alertCtrl.create({
          
                    title: 'Column Tapped!',
                    message: JSON.stringify(result.withFingerprint),
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
                      }
                      
                      ]
                  });
          
                  alert.present();
      }else{
        //this.isenabled = false;
      }

    }catch(e){
      console.log(e)
    }
    
  }


}
