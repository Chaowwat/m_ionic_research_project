import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams , AlertController} from 'ionic-angular';


@Component({
  selector: 'page-Gridlayout',
  templateUrl: 'Gridlayout.html'
})

export class Gridlayout {

    rowArray:Array<string>;

    constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController) { 

        this.rowArray = [];
        for (var index = 0; index < 3; index++) {
          this.rowArray.push("row number : "+String(index));
        }


    }


    ionViewDidLoad(){
     
    }

    itemTapped(strInput) {
      let alert = this.alertCtrl.create({

          title: 'Column Tapped!',
          message: strInput,
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
    }
}