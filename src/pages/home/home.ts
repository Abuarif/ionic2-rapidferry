import { Trip } from './../trip/trip';
import { Ferrytrips } from './../../models/ferrytrips';
import { DatePipe } from '@angular/common';
import { DataApi } from './../../providers/data-api';
import { Api } from './../../providers/api';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  color_boarding: string = 'dark';
  color_departure: string = 'dark';
  timetables: any = new Array();
  // timetables: Ferrytrips[] = new Array();
  location: string = 'PRTU';
  service_date: string = new Date().toISOString();
  time_depart: string;
  submission_color: string;
  submission_label: string;
  is_ontime: boolean;
  is_full: boolean;
  public whatTime;

  constructor(
    public _loadingController: LoadingController,
    private api: Api,
    private alertCtrl: AlertController,
    private platform: Platform,
    private navCtrl: NavController,
    private dataApi: DataApi,
    private datePipe: DatePipe
  ) { }

  ionViewWillEnter() {
    this.getFerryTimetables();
  }

  ngOnInit() {

    this.getFerryTimetables();
    setInterval(
      () => {
        this.getFerryTimetables();
      }, 1000 * 20 // refresh to check new data for every 1 minute.
    )
    this.whatTime = Observable.interval(1000).map(x => new Date()).share();  // get current realtime

  }

  private getFerryTimetables() {

    if (this.datePipe.transform(this.service_date, 'dd-MM-yyyy') !=
      this.datePipe.transform(new Date().toISOString(), 'dd-MM-yyyy')) {
    }

    this.api.get_ferryroutes(this.location)
      .then((result) => {
        // loading.dismiss();
        this.timetables = result;
        // this.timetables = <Ferrytrips[]>result;
        // console.log(this.timetables);
        this.parseTrip();
        // console.log(this.timetables);
      }, (err) => {
        // loading.dismiss();
        this.presentConfirm();
      });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    if (this.datePipe.transform(this.service_date, 'dd-MM-yyyy') !=
      this.datePipe.transform(new Date().toISOString(), 'dd-MM-yyyy')) {
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      this.api.get_ferryroutes(this.location)
        .then((result) => {
          this.timetables = <Ferrytrips[]>result;
          // console.log(this.timetables);
          this.parseTrip();
        }, (err) => {
        });
      refresher.complete();
    }, 2000);
  }

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

  public allowSubmission(timetable) {

    if (timetable.RouteTrip.length == 0) {
      console.log('new');
      this.submission_color = 'secondary';
      this.submission_label = 'Submit Now';
      return true;
    } else if (timetable.RouteTrip.length > 0) {
      // check for location
      for (let trip of timetable.RouteTrip) {
        if (trip.location_id == 1 && this.location == 'PSAH' && trip.status == true) {
          console.log('submitted PSAH');
          this.submission_color = 'light';
          this.submission_label = 'Submitted';
          return true;
        } else if (trip.location_id == 2 && this.location == 'PRTU' && trip.status == true) {
          console.log('submitted PRTU');
          this.submission_color = 'light';
          this.submission_label = 'Submitted';
          return true;
        } else {
          console.log('new');
          this.submission_color = 'secondary';
          this.submission_label = 'Submit Now';
          return false;
        }
      }
    }
  }

  public getDetail(timetable) {
    this.navCtrl.push(Trip, { trip: timetable, location: this.location });
  }

  private parseTrip() {
    this.timetables.forEach(element => {
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

  public setLocation(location) {
    console.log(location.value);
    this.location = location.value;
    this.getFerryTimetables();
  }
}