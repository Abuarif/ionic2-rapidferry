import { Api } from './../../providers/api';
import { Promotions } from './../../models/promotions';
import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-information-page',
  templateUrl: 'information-page.html',
})
export class InformationPage {
  slides: Promotions[] = new Array();

  constructor(public _loadingController: LoadingController, private api: Api) { }

  ionViewWillEnter() {
    this.getPromotions();
  }

  private getPromotions() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    this.api.get_promotions()
      .then((result) => {
        loading.dismiss();
        this.slides = <Promotions[]>result;
        console.log(this.slides);
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }
}
