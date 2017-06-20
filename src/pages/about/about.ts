import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  timetables: any = [];
  constructor(public navCtrl: NavController) {
    this.timetables = [
      {
        ets: '8.10 am',
      }, 
      {
        ets: '10.20 am',
      }, 
      {
        ets: '2.10 am',
      }, 
      {
        ets: '4.30 am',
      }, 
      {
        ets: '6.10 am',
      }, 
    ];
  }

}
