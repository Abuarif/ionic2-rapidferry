import { InformationPage } from './../information-page/information-page';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InformationPage;
  tab2Root = HomePage;

  constructor() {

  }
}
