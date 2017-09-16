// import { RouteTimetable } from './../../models/bustrips';
import { Trip } from './../trip/trip';
import { DatePipe } from '@angular/common';
import { General } from './../general/general';
import { Api } from './../../providers/api';
import { Promotions } from './../../models/promotions';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, Platform, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-information-page',
  templateUrl: 'information-page.html',
})
export class InformationPage {
  slides: Promotions[] = new Array();
  prtu: any = new Array();
  psah: any = new Array();
  service_date: string = new Date().toISOString();

  constructor(
    public _loadingController: LoadingController,
    private api: Api,
    private alertCtrl: AlertController,
    private platform: Platform,
    private navCtrl: NavController,
    private datePipe: DatePipe
  ) { }

  ionViewWillEnter() {
    this.getFerryTimetable();
  }

  ngOnInit() {

    this.getFerryTimetable();
    setInterval(
      () => {
        this.getFerryTimetable();
      }, 1000 * 60 // refresh to check new data for every 1 minute.
    )
  }

  private getFerryTimetable() {

    if (this.datePipe.transform(this.service_date, 'dd-MM-yyyy') !=
      this.datePipe.transform(new Date().toISOString(), 'dd-MM-yyyy')) {
    }

    this.api.get_terminal('PRTU')
      .then((result) => {
        // loading.dismiss();
        this.prtu = result;
        // this.timetables = <Ferrytrips[]>result;
        // console.log(this.timetables);
        this.parseTrip(this.prtu);
        console.log(this.prtu);
      }, (err) => {
        // loading.dismiss();
        this.presentConfirm();
      });

    this.api.get_terminal('PSAH')
      .then((result) => {
        // loading.dismiss();
        this.psah = result;
        // this.timetables = <Ferrytrips[]>result;
        // console.log(this.timetables);
        this.parseTrip(this.psah);
        console.log(this.psah);
      }, (err) => {
        // loading.dismiss();
        this.presentConfirm();
      });
  }

  private parseTrip(terminal) {
    terminal.forEach(element => {
      let service_date = this.datePipe.transform(this.service_date, 'yyyy-MM-dd');

      element.FerryRoute.boarding_a = service_date + 'T' + element.FerryRoute.boarding_a + ':00.000+08:00'
      element.FerryRoute.boarding_b = service_date + 'T' + element.FerryRoute.boarding_b + ':00.000+08:00'
      element.FerryRoute.departure_a = service_date + 'T' + element.FerryRoute.departure_a + ':00.000+08:00'
      element.FerryRoute.departure_b = service_date + 'T' + element.FerryRoute.departure_b + ':00.000+08:00'

      if (element.FerryRoute.time_depart != '') {
        element.FerryRoute.time_depart = new Date(element.FerryRoute.time_depart).toUTCString();
      }
    });
  }
  // private getPromotions() {
  //   let loading = this._loadingController.create({
  //     content: "Please wait...",
  //     duration: 3000
  //   });

  //   loading.present();

  //   this.api.get_promotions()
  //     .then((result) => {
  //       loading.dismiss();
  //       this.slides = <Promotions[]>result;
  //       console.log(this.slides);
  //     }, (err) => {
  //       loading.dismiss();
  //       this.presentConfirm();
  //     });
  // }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'No Internet Connection!',
      message: 'Please ensure your mobile is connected to internet. See you soon.',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            this.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  private exitApp() {
    this.platform.exitApp();
  }

  public skip() {
    this.navCtrl.push(General);
  }

  public getDetail(timetable) {
    console.log('in getdetail')
    console.log(timetable)
    let nextLocation: string;
    if (timetable.FerryRoute.location_id == '1') {
      nextLocation = 'PSAH';
    } else {
      nextLocation = 'PRTU';
    }
    this.navCtrl.push(Trip, { trip: timetable, location: nextLocation });
  }
}
