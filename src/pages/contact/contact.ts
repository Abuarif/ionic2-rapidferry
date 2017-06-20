import { Api } from './../../providers/api';
import { Bustrips } from './../../models/bustrips';
import { Busroutes } from './../../models/busroutes';
import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  busroutes_island: Busroutes[] = new Array();
  busroutes_mainland: Busroutes[] = new Array();
  bustrips_island: Bustrips[] = new Array();
  bustrips_mainland: Bustrips[] = new Array();
  route_island: number;
  route_mainland: number;
  location: string;

  constructor(private _loadingController: LoadingController, private api: Api) { }

  private getRoutes() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    this.api.get_routes(this.location)
      .then((result) => {
        loading.dismiss();
        switch (this.location) {
          case '1':
            this.busroutes_mainland = <Busroutes[]>result;
            break;
          case '2':
            this.busroutes_island = <Busroutes[]>result;
            break;
        }
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }

  public getBusTrips(route) {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    this.api.get_bustrips(route)
      .then((result) => {
        loading.dismiss();
        switch (this.location) {
          case '1':
            this.bustrips_mainland = <Bustrips[]>result;
            break;
          case '2':
            this.bustrips_island = <Bustrips[]>result;
            break;
        }
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }

  public setLocation(location) {
    console.log(location.value);
    this.location = location.value;
    this.getRoutes();
  }

}
