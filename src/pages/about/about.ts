import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  numberArrysDisplay:Array<string>;
  dotArrysDisplay:Array<Number>;
  input = "";
  correct = "123456";

  dots;numbers;
  dotsArray;numbersArray;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

        this.numberArrysDisplay = ["0","1","2","3","4","5","6","7","8","9"];  
        this.dotArrysDisplay = [0,1,2,3,4,5];
     

  }


  ionViewDidLoad(){
    this.dots = document.getElementsByClassName("dot");
    this.dotsArray = Array.from(this.dots);

    this.numbers = document.getElementsByClassName("number");
    this.numbersArray = Array.from(this.numbers);
  }
  itemTapped(numStr,event){

    console.log("number : "+numStr+ " Clicked !!");
    this.input += numStr;
    event.target.classList.add('grow');
    this.dotsArray[this.input.length -1].classList.add('active');

    if(this.input.length >= this.dotsArray.length){
      
       let alert = this.alertCtrl.create({

          title: 'Input Value 6 digits is ',
          message: this.input,
          buttons: [ {
              text: 'Ok',
              handler: () => {
                console.log('Ok clicked');
                //this.navCtrl.push(AppList,null);
                //this.navCtrl.push(AppList,null);   
                this.resetDotandNum();              
              }
            },{
              text: 'Cancel',
              handler: () => {
                //console.log('Cancel clicked');     
                this.resetDotandNum(); 
              }
            }
            
            ]
        });

        alert.present();
      
    }else{
      setTimeout(function () {
        console.log('event.target.classList.remove');
        event.target.classList.remove('grow');
      }, 500);
    }
    //this.dotsArray[this.input.length -1].target.classList.add('active');

    //$(dots[input.length - 1]).addClass("active");
    //this.dotsArray[this.input.length -1].addClass("active");

    console.log(this.input);

    
  }


  resetDotandNum(){
       for (var index = 0; index < this.numbersArray.length; index++) {
            this.numbersArray[index].classList.remove('grow');
        }

        for (var index = 0; index < this.dotsArray.length; index++) {
            this.dotsArray[index].classList.remove('active');
        }
        this.input = "";
  } 
  

   

}
