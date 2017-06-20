import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformationPage } from './information-page';

@NgModule({
  declarations: [
    InformationPage,
  ],
  imports: [
    IonicPageModule.forChild(InformationPage),
  ],
  exports: [
    InformationPage
  ]
})
export class InformationPageModule {}
