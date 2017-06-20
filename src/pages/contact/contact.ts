import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  timetables: any = [];

  constructor(public navCtrl: NavController) {
    this.timetables = [
      {
        bus: '8.10 am',
      }, 
      {
        bus: '10.20 am',
      }, 
      {
        bus: '2.10 am',
      }, 
      {
        bus: '4.30 am',
      }, 
      {
        bus: '6.10 am',
      }, 
    ];
  }

}
