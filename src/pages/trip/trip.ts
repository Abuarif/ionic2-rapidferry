import { DatePipe } from '@angular/common';
import { Api } from './../../providers/api';
import { DataApi } from './../../providers/data-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class Trip {
  timetable: any;
  location: string;
  timetables: any = new Array();
  etsTrips: any = new Array();
  service_date: string = new Date().toISOString();
  isOnTime: boolean = true;
  isFull: boolean = false;
  color_isFull: string;
  color_isOnTime: string;
  time_depart: string;
  route_id: string;
  route_timetable_id: string;
  location_id: string;
  arrival: string;
  service: string;

  constructor(
    public _loadingController: LoadingController,
    private api: Api,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public NavParams: NavParams,
    private dataApi: DataApi,
    private datePipe: DatePipe
  ) {
  }

  ionViewWillEnter() {
    this.timetable = this.NavParams.get('trip');
    this.location = this.NavParams.get('location');
    this.route_id = this.timetable.FerryRoute.id;
    this.route_timetable_id = this.timetable.FerryRoute.route_timetable_id;
    this.location_id = this.timetable.FerryRoute.location_id;
    this.isFull = this.timetable.FerryRoute.isFull;
    this.isOnTime = this.timetable.FerryRoute.isOnTime;
    this.color_isFull = this.timetable.FerryRoute.color_isFull;
    this.color_isOnTime = this.timetable.FerryRoute.color_isOnTime;
    this.time_depart = this.timetable.FerryRoute.time_depart;

    if (this.location_id == '1') {
      this.arrival = this.timetable.FerryRoute.boarding_a;
    } else {
      this.arrival = this.timetable.FerryRoute.boarding_a;
    }
    console.log(this.timetable);
    this.getBusTimetables();
    this.getETSTimetables();
  }

  private getBusTimetables() {
    let nextLocation: string;

    if (this.datePipe.transform(this.service_date, 'dd-MM-yyyy') !=
      this.datePipe.transform(new Date().toISOString(), 'dd-MM-yyyy')) {
    }
    if (this.location == 'PRTU') {
      nextLocation = 'PSAH'
    } else {
      nextLocation = 'PRTU'
    }
    this.api.get_bustrips(nextLocation)
      .then((result) => {
        this.timetables = result;
        this.parseTrip();
        console.log(this.timetables);
      }, (err) => {
      });
  }

  private getETSTimetables() {
    let nextLocation: string;

    if (this.datePipe.transform(this.service_date, 'dd-MM-yyyy') !=
      this.datePipe.transform(new Date().toISOString(), 'dd-MM-yyyy')) {
    }
    if (this.location == 'PRTU') {
      nextLocation = 'PSAH'
    } else {
      nextLocation = 'PRTU'
    }
    this.api.get_etstrips(nextLocation)
      .then((result) => {
        this.etsTrips = result;
        this.parseETSTrip();
        console.log(this.etsTrips);
      }, (err) => {
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
          this.timetables = result;
          this.parseTrip();
        }, (err) => {
        });
      refresher.complete();
    }, 2000);
  }

  private parseTrip() {
    this.timetables.forEach(element => {
      let service_date = this.datePipe.transform(this.service_date, 'yyyy-MM-dd');

      element.RouteTimetable.departure_a = service_date + 'T' + element.RouteTimetable.departure_a + ':00.000+08:00'
      element.RouteTimetable.boarding_b = service_date + 'T' + element.RouteTimetable.boarding_b + ':00.000+08:00'

    });
  }

  private parseETSTrip() {
    this.etsTrips.forEach(element => {
      let service_date = this.datePipe.transform(this.service_date, 'yyyy-MM-dd');

      element.RouteTimetable.departure_a = service_date + 'T' + element.RouteTimetable.departure_a + ':00.000+08:00'
      element.RouteTimetable.boarding_b = service_date + 'T' + element.RouteTimetable.boarding_b + ':00.000+08:00'

    });
  }
}
