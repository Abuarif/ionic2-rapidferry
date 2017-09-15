import { PricingPage } from './../pages/pricing/pricing';
import { Trip } from './../pages/trip/trip';
import { DataApi } from './../providers/data-api';
import { DatePipe } from '@angular/common';
import { General } from './../pages/general/general';
import { Api } from './../providers/api';
import { InformationPage } from './../pages/information-page/information-page';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    InformationPage,
    General,
    Trip,
    PricingPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    InformationPage,
    Trip,
    PricingPage,
    General,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    DataApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe
  ]
})
export class AppModule {}
