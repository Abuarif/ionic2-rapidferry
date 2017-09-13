import { FerryRoute } from './../../models/ferryroute';
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

  constructor(
    public _loadingController: LoadingController,
    private api: Api,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public NavParams: NavParams,
    private dataApi: DataApi
  ) {
  }

  ngOnInit() {
    this.timetable = this.NavParams.get('trip');
    this.location = this.NavParams.get('location');
    this.route_id = this.timetable.FerryRoute.id;
    this.route_timetable_id = this.timetable.FerryRoute.route_timetable_id;
    this.location_id = this.timetable.FerryRoute.location_id;
    this.isFull = this.timetable.FerryRoute.isFull;
    this.isOnTime = this.timetable.FerryRoute.isOnTime;
    this.color_isFull = this.timetable.FerryRoute.color_isFull;
    this.color_isOnTime = this.timetable.FerryRoute.color_isOnTime;
    if (this.location_id == '1') {
      this.arrival = this.timetable.FerryRoute.boarding_a;
    } else {
      this.arrival = this.timetable.FerryRoute.boarding_a;
    }
    console.log(this.timetable);
  }
}
