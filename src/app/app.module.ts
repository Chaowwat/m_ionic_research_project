
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import {} from "string-similarity"

import { MyApp } from './app.component';
import { LogonPage } from '../pages/logonPage/logonPage';
import { LogonOtpPage } from '../pages/logonOtpPage/logonOtpPage';
import { AppMenu } from '../pages/AppMenu/AppMenu';
import { AppList } from '../pages/AppList/AppList';
import { AppDetail } from '../pages/AppDetail/AppDetail';
import { HomePage } from '../pages/Home/Home';
import { LocationCheck } from '../pages/locationCheck/locationCheck';
import { Gridlayout } from '../pages/Gridlayout/Gridlayout';
import { HttpProviderTestProvider } from '../providers/http-provider-test/http-provider-test';
import { AboutPage } from "../pages/about/about";



@NgModule({
  declarations: [
    MyApp,
    LogonPage,
    LogonOtpPage,
    AppMenu,
    HomePage,
    AppList,
    AppDetail,
    LocationCheck,
    Gridlayout,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp) , BrowserModule , HttpModule , IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LogonPage,
    LogonOtpPage,
    AppMenu,
    HomePage,
    AppList,
    AppDetail,
    LocationCheck,
    Gridlayout,
    AboutPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Geolocation,StatusBar,SplashScreen,
    HttpProviderTestProvider,Storage,FingerprintAIO,SpeechRecognition]
})
export class AppModule {}
