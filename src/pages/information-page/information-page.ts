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

  constructor(public _loadingController: LoadingController, private api: Api, private alertCtrl: AlertController, private platform: Platform, private navCtrl: NavController) { }

  ionViewWillEnter() {
    // this.getPromotions();
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
}
