import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController,public plt: Platform,private alertCtrl: AlertController) {
    
  }

  checkPlat(){
   if (this.plt.is('ios')) {
      this.presentAlert('ios');
   }else if(this.plt.is('android')){
      this.presentAlert('android');
   }else if(this.plt.is('windows')){ 
      this.presentAlert('windows');
   }else{
     this.presentAlert('other');
   }

  }

  presentAlert(str) {
    let alert = this.alertCtrl.create({
      title: 'PlatForm is',
      subTitle: str,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
