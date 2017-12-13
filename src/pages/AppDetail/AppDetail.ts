import { Component } from '@angular/core';


import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-AppDetail',
  templateUrl: 'AppDetail.html'
})
export class AppDetail {
  selectedItem: any;
  elementArray:Array<Number>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.elementArray = [1,2,3,4,5,6,7,8,9,10];
 
  }

  callAppLink(){

    //var car = new Car(new Engine(),new Tires());

    window.open("https://emmobile.ais.co.th/Download/Android");
  }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(Page2, {
  //     item: item
  //   });
  // }
}
